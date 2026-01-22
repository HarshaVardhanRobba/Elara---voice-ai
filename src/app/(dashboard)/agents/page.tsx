import { LoadingState } from '@/components/loading-state';
import { auth } from '@/lib/auth';
import { AgentsListHeader } from '@/modules/agents/ui/components/agent-list-header';
import { AgentsView, AgentsViewError, AgentsViewLoading } from '@/modules/agents/ui/views/agents-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import  { SearchParams } from "nuqs";
import { loadSearchParams } from '@/modules/agents/params';

interface DashboardAgentpageProps {
  searchParams: Promise<SearchParams>; 
}

const Page = async ({ searchParams }: DashboardAgentpageProps) => {
  const filters = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session) {
      redirect('/sign-in');
    }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
    search: filters.search
  }));

  return (
    <>
    <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={<AgentsViewLoading/>}>
          <ErrorBoundary fallback={<AgentsViewError/>}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
};

export default Page;
