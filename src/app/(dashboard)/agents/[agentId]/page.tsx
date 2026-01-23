import { AgentIdview, AgentsIdViewError, AgentsIdViewLoading } from "@/modules/agents/ui/views/agentId-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface AgentIdPageProps {
    params: Promise<{ agentId: string }>
};

const page = async ({params}: AgentIdPageProps) => {
    const { agentId } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({ id: agentId }),
);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsIdViewLoading/>} >
        <ErrorBoundary fallback={<AgentsIdViewError/>}>
            <AgentIdview agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default page
 


