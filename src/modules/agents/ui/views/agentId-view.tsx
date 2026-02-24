"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AgentIDviewHeader } from "../components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";;
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "../../hooks/use-confirm";
import {UpdateAgentDialog} from "../components/update-agent-dialog";

interface AgentIDviewPops {
    agentId: string
}

export const AgentIdview = ({agentId}: AgentIDviewPops) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClinent = useQueryClient();
    const [isRemoveAgentDialogVisible, setRemoveAgentDialogVisible] = useState(false);

    const [UpdateAgentdialogOpen, setUpdateAgentdialogOpen] = useState(false);

    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

    const removeAgent = useMutation(trpc.agents.remove.mutationOptions({
        onSuccess: async () => {
            await queryClinent.invalidateQueries(trpc.agents.getMany.queryOptions({})); 
            await queryClinent.invalidateQueries(trpc.premium.getFreeUsage.queryOptions()
        );
            router.push("/agents");
        },
        onError: (error) => {
            toast.error(error.message);
        }
        })
    );

    const [RemoveAgentConfirmation, confirmRemove] = useConfirm(
        "Delete Agent",
        `Are you sure you want to delete this agent?. This will remove ${data.meetingsCount} assosiated meetings`,
    );

    const handleRemoveAgent = async () => {
    setRemoveAgentDialogVisible(true);
    const ok = await confirmRemove();

    if (!ok) {
        setRemoveAgentDialogVisible(false);
        return;
    }

    await removeAgent.mutate({ id: agentId });
    setRemoveAgentDialogVisible(false);
};

    return (
        <>
        {isRemoveAgentDialogVisible && <RemoveAgentConfirmation />}
        <UpdateAgentDialog 
            open={UpdateAgentdialogOpen} onOpenChange={setUpdateAgentdialogOpen} initialvalues={data}
        />
        <div className="bg-muted/30 p-4">
            <AgentIDviewHeader 
                agentId={agentId}
                agentname={data.name}
                onEdit={() => setUpdateAgentdialogOpen(true)}
                onremove={handleRemoveAgent}
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
    </>
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
