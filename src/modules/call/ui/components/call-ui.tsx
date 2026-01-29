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
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const handleJoin = async () => {
    if (!call) return;

    // ✅ ensure call exists before joining
    await call.join({ create: true });
    setShow("call");
  };

  const handleLeave = () => {
    // ✅ DO NOT call call.leave() here (CallControls already does it)
    setShow("ended");
  };

  return (
    <StreamTheme className="min-h-screen w-full">
      {show === "lobby" && (
        <CallLobby onJoin={handleJoin} />
      )}

      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}

      {show === "ended" && (
        <CallEnded />
      )}
    </StreamTheme>
  );
};
