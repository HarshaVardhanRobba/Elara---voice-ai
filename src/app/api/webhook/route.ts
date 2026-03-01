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
  console.log("🔔 Webhook request received");

  try {
    const signature = request.headers.get("x-signature");

    if (!signature) {
      console.error("❌ Missing webhook signature");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const body = await request.text();

    const isValid = streamVideo.verifyWebhook(body, signature);
    if (!isValid) {
      console.error("❌ Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(body);
    } catch (err) {
      console.error("❌ Invalid JSON payload", err);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const eventType = (payload as Record<string, unknown>).type;
    console.log("📦 Incoming event type:", eventType);

    // ===============================
    // CALL SESSION STARTED
    // ===============================
    if (eventType === "call.session_started") {
      console.log("🚀 Handling call.session_started");

      const event = payload as CallSessionStartedEvent;
      const meetingId = event.call?.custom?.meetingId;

      if (!meetingId) {
        console.error("❌ Missing meetingId in session_started");
        return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
      }

      const [existingMeeting] = await db
        .select()
        .from(meetings)
        .where(and(eq(meetings.id, meetingId), eq(meetings.status, "upcomming")));

      if (!existingMeeting) {
        console.warn("⚠️ Meeting not found or already started:", meetingId);
        return NextResponse.json({ status: "ignored" });
      }

      await db
        .update(meetings)
        .set({ status: "active", startedAt: new Date() })
        .where(eq(meetings.id, meetingId));

      console.log("✅ Meeting marked active:", meetingId);

      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, existingMeeting.agentId));

      if (!existingAgent) {
        console.error("❌ Agent not found:", existingMeeting.agentId);
        return NextResponse.json({ error: "Agent not found" }, { status: 404 });
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
          model: "gpt-4o-mini"
        });

        console.log("🤖 OpenAI realtime agent connected");
      } catch (err) {
        console.error("❌ Failed to connect OpenAI realtime:", err);
      }
    }

    // ===============================
    // CALL TRANSCRIPTION READY
    // ===============================
    else if (eventType === "call.transcription_ready") {
      console.log("📝 Handling call.transcription_ready");

      const event = payload as CallTranscriptionReadyEvent;
      const callCid = event.call_cid;

      if (!callCid) {
        console.error("❌ Missing call_cid");
        return NextResponse.json({ error: "Missing call_cid" }, { status: 400 });
      }

      const meetingId = callCid.split(":")[1];

      const [existingMeeting] = await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, meetingId));

      if (!existingMeeting) {
        console.error("❌ Meeting not found for transcription:", meetingId);
        return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
      }

      const [updatedMeeting] = await db
        .update(meetings)
        .set({ transcriptUrl: event.call_transcription?.url })
        .where(eq(meetings.id, meetingId))
        .returning();

      console.log("📤 Sending event to Inngest:", meetingId);

      try {
        await inngest.send({
          name: "meetings/processing",
          data: {
            meetingId: updatedMeeting.id,
            transcriptUrl: updatedMeeting.transcriptUrl,
          },
        });
        console.log("✅ Inngest event sent successfully");
      } catch (err) {
        console.error("❌ Failed to send event to Inngest:", err);
      }
    }

    // ===============================
    // CALL SESSION ENDED
    // ===============================
    else if (eventType === "call.session_ended") {
      console.log("🔚 Handling call.session_ended");

      const event = payload as CallEndedEvent;
      const meetingId = event.call?.custom?.meetingId;

      if (!meetingId) {
        console.error("❌ Missing meetingId in session_ended", {
          callCid: event.call_cid,
        });
        return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
      }

      await db
        .update(meetings)
        .set({ status: "completed", endedAt: new Date() })
        .where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));

      console.log("✅ Meeting marked completed:", meetingId);
    }

    // ===============================
    // RECORDING READY
    // ===============================
    else if (eventType === "call.recording_ready") {
      console.log("🎥 Handling call.recording_ready");

      const event = payload as CallRecordingReadyEvent;
      const meetingId = event.call_cid?.split(":")[1];

      if (!meetingId) {
        console.warn("⚠️ Missing meetingId for recording_ready");
        return NextResponse.json({ status: "ignored" });
      }

      await db
        .update(meetings)
        .set({ recordingUrl: event.call_recording?.url })
        .where(eq(meetings.id, meetingId));

      console.log("✅ Recording URL saved:", meetingId);
    }

    else {
      console.log("ℹ️ Unhandled event type:", eventType);
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("💥 Fatal webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}