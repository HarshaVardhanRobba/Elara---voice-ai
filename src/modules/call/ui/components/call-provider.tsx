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

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2Icon className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Unable to load user session.
      </div>
    );
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingname={meetingname}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        GenerateAvatarUri({
          seed: data.user.name,
          variant: "initials",
        })
      }
    />
  );
};