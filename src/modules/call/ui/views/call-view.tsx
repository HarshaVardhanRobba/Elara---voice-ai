"use client";

import { ErrorState } from "@/components/error-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallProvider } from "../components/call-provider";

interface callViewProps {
    meetingId: string
}

export const CallView = ({ meetingId }: callViewProps) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }));

    if (data.status === "completed") {
        return (
            <div>
                <ErrorState 
                    title="Meeting completed"
                    description="You can no onger join this meeting."
                 />
                Call {data.name} is completed
            </div>
        )
    }

    return <CallProvider meetingId={meetingId} meetingname={data.name} />
}