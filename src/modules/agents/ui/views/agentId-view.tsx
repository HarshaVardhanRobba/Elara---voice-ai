"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgentIDviewHeader } from "../components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

interface AgentIDviewPops {
    agentId: string
}

export const AgentIdview = ({agentId}: AgentIDviewPops) => {
    const trpc = useTRPC();

    const { data, isLoading, isError } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

    if (isLoading) return <AgentsIdViewLoading />;
    if (isError) return <AgentsIdViewError />;

    return (
    <div className="bg-muted/30 p-4">
        <AgentIDviewHeader 
            agentId={agentId}
            agentname={data.name}
            onEdit={() => console.log("edit")}
            onremove={() => console.log("remove")}
        />

        <div className="mt-4 bg-white rounded-lg border px-5 py-4">
            <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <GeneratedAvatar
                        seed={data.name}
                        variant="botttsNeutral"
                        className="size-9 shrink-0"
                    />
                    <h2 className="text-sm font-semibold text-foreground">
                        {data.name}
                    </h2>
                </div>

                {/* Meetings meta */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <VideoIcon className="h-4 w-4 text-blue-600" />
                    <span>
                        {data.meetingsCount}{" "}
                        {data.meetingsCount === 1 ? "meeting" : "meetings"}
                    </span>
                </div>

                {/* Instructions */}
                <div className="pt-2 space-y-1">
                    <h3 className="text-sm font-medium text-foreground">
                        Instructions
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {data.instructions}
                    </p>
                </div>
            </div>
        </div>
    </div>
)
}

export const AgentsIdViewLoading = () => {
  return (
    <LoadingState 
      title="Loading Agents" 
      description="Please wait while we load your agents."
    />
  )
}

export const AgentsIdViewError = () => {
  return (
    <ErrorState
      title="Something went wrong bro"
      description="Please try again later."
    />
  )
}
