import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { streamVideo } from "@/lib/stream-video";
import OpenAI from "openai";
import {
  CallEndedEvent,
  CallRecordingReadyEvent,
  CallSessionStartedEvent,
  CallTranscriptionReadyEvent,
} from "@stream-io/node-sdk";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    const body = await request.text();
    const isValid = streamVideo.verifyWebhook(body, signature);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    let payload: unknown;
    try {
      payload = JSON.parse(body);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const eventType = (payload as Record<string, unknown>).type;

    // ===============================
    // CALL SESSION STARTED
    // ===============================
    if (eventType === "call.session_started") {
      const event = payload as CallSessionStartedEvent;
      const meetingId = event.call?.custom?.meetingId;

      if (!meetingId) {
        return NextResponse.json(
          { error: "Missing meetingId" },
          { status: 400 }
        );
      }

      const [existingMeeting] = await db
        .select()
        .from(meetings)
        .where(
          and(
            eq(meetings.id, meetingId),
            eq(meetings.status, "upcomming")
          )
        );

      if (!existingMeeting) {
        return NextResponse.json({ status: "ignored" });
      }

      await db
        .update(meetings)
        .set({ status: "active", startedAt: new Date() })
        .where(eq(meetings.id, meetingId));

      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, existingMeeting.agentId));

      if (!existingAgent) {
        return NextResponse.json(
          { error: "Agent not found" },
          { status: 404 }
        );
      }

      try {
        const call = streamVideo.video.call("default", meetingId);
        await call.get();

        const realtimeClient = await streamVideo.video.connectOpenAi({
          call,
          openAiApiKey: process.env.OPENAI_API_KEY!,
          agentUserId: existingAgent.id,
        });

        await realtimeClient.updateSession({
          instructions: existingAgent.instructions,
          model: "gpt-5-nano",
        });
      } catch (error) {
        console.error("Agent connection failed:", error);
        return NextResponse.json(
          { error: "Failed to connect agent" },
          { status: 500 }
        );
      }
    }

    // ===============================
    // CALL TRANSCRIPTION READY
    // ===============================
    else if (eventType === "call.transcription_ready") {
      const event = payload as CallTranscriptionReadyEvent;
      const callCid = event.call_cid;

      if (!callCid) {
        return NextResponse.json(
          { error: "Missing call_cid" },
          { status: 400 }
        );
      }

      const meetingId = callCid.split(":")[1];

      const [existingMeeting] = await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, meetingId));

      if (!existingMeeting) {
        return NextResponse.json(
          { error: "Meeting not found" },
          { status: 404 }
        );
      }

      if (existingMeeting.status !== "completed") {
        return NextResponse.json({ status: "ignored" });
      }

      const [updatedMeeting] = await db
        .update(meetings)
        .set({ transcriptUrl: event.call_transcription?.url })
        .where(eq(meetings.id, meetingId))
        .returning();

      await inngest.send({
        name: "meetings/processing",
        data: {
          meetingId: updatedMeeting.id,
          transcriptUrl: updatedMeeting.transcriptUrl,
        },
      });
    }

    // ===============================
    // CALL SESSION ENDED
    // ===============================
    else if (eventType === "call.session_ended") {
      const event = payload as CallEndedEvent;
      const meetingId = event.call?.custom?.meetingId;

      console.log("Call session ended event received", {
        meetingId,
        callId: event.call_cid,
        customData: event.call?.custom,
      });

      if (!meetingId) {
        console.error("Missing meetingId in call.session_ended event", {
          callCid: event.call_cid,
          custom: event.call?.custom,
        });
        return NextResponse.json(
          { error: "Missing meetingId" },
          { status: 400 }
        );
      }

      await db
        .update(meetings)
        .set({ status: "completed", endedAt: new Date() })
        .where(
          and(
            eq(meetings.id, meetingId),
            eq(meetings.status, "active")
          )
        );

      console.log("Updated meeting status to completed", {
        meetingId,
      });
    }

    // ===============================
    // RECORDING READY
    // ===============================
    else if (eventType === "call.recording_ready") {
      const event = payload as CallRecordingReadyEvent;
      const meetingId = event.call_cid?.split(":")[1];

      await db
        .update(meetings)
        .set({ recordingUrl: event.call_recording?.url })
        .where(eq(meetings.id, meetingId));
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook fatal error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}