"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";
import { CallConnect } from "./call-connect";
import { GenerateAvatarUri } from "@/lib/avatar";

interface Props {
  meetingId: string;
  meetingname: string;
}

export const CallProvider = ({ meetingId, meetingname }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-linear-to-br from-emerald-900 via-green-900 to-teal-900">
        <Loader2Icon className="h-6 w-6 animate-spin text-white/80" />
      </div>
    );
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingname={meetingname}
      userId={data.user.id}
      userName={data.user.name}
      userImage={data.user.image ?? GenerateAvatarUri({ 
        seed: data.user.name,
        variant: "initials"
      })}
    />
  );
};
