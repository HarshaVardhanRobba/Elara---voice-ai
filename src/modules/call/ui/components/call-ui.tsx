"use client";

import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [phase, setPhase] = useState<"lobby" | "call" | "ended">("lobby");

  const handleJoin = async () => {
    if (!call) return;

    try {
      await call.join({ create: true });
      setPhase("call");
    } catch (err) {
      console.error("Join failed", err);
    }
  };

  const handleLeave = () => {
    setPhase("ended");
  };

  return (
    <StreamTheme className="min-h-screen w-full bg-background">
      <div className="flex min-h-screen w-full">
        {phase === "lobby" && (
          <CallLobby onJoin={handleJoin} />
        )}

        {phase === "call" && (
          <CallActive
            onLeave={handleLeave}
            meetingName={meetingName}
          />
        )}

        {phase === "ended" && (
          <CallEnded />
        )}
      </div>
    </StreamTheme>
  );
};