"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AgentIDviewHeader } from "../components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "../../hooks/use-confirm";
import { UpdateAgentDialog } from "../components/update-agent-dialog";

interface AgentIDviewProps {
  agentId: string;
}

export const AgentIdview = ({ agentId }: AgentIDviewProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions()
        );
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [ConfirmDialog, confirmRemove] = useConfirm(
    "Delete Agent",
    `Are you sure you want to delete this agent? This will remove ${data.meetingsCount} associated meetings.`
  );

  const handleRemoveAgent = async () => {
    setConfirmVisible(true);
    const ok = await confirmRemove();

    if (!ok) {
      setConfirmVisible(false);
      return;
    }

    await removeAgent.mutateAsync({ id: agentId });
    setConfirmVisible(false);
  };

  return (
    <>
      {isConfirmVisible && <ConfirmDialog />}
      <UpdateAgentDialog
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        initialvalues={data}
      />

      <div className="bg-muted/30 min-h-full py-6 px-4 md:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <AgentIDviewHeader
            agentId={agentId}
            agentname={data.name}
            onEdit={() => setUpdateDialogOpen(true)}
            onremove={handleRemoveAgent}
          />

          <div className="rounded-xl border bg-background shadow-sm p-5 sm:p-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <GeneratedAvatar
                  seed={data.name}
                  variant="botttsNeutral"
                  className="size-10 shrink-0"
                />
                <h2 className="text-lg font-semibold">
                  {data.name}
                </h2>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <VideoIcon className="h-4 w-4 text-primary" />
                <span>
                  {data.meetingsCount}{" "}
                  {data.meetingsCount === 1
                    ? "meeting"
                    : "meetings"}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">
                  Instructions
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed break-words whitespace-pre-wrap">
                  {data.instructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentsIdViewLoading = () => (
  <LoadingState
    title="Loading Agent"
    description="Please wait while we load the agent details."
  />
);

export const AgentsIdViewError = () => (
  <ErrorState
    title="Something went wrong"
    description="Please try again later."
  />
);