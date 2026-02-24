import { auth } from '@/lib/auth';
import { useTRPC } from '@/trpc/client';
import { getQueryClient, trpc } from '@/trpc/server';
import { Fallback } from '@radix-ui/react-avatar';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import {
    UpgradeView,
    UpgradeViewError,
    UpgradeViewLoading,
} from '@/modules/premium/ui/views/upgrade-view';

const page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
      });
    
      if (!session) {
        redirect('/sign-in');
      }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.premium.getCurrentSubscription.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<UpgradeViewLoading />}>
            <ErrorBoundary fallback={<UpgradeViewError />}>
                <UpgradeView />
            </ErrorBoundary>
        </Suspense>
    </HydrationBoundary>
  )
}

export default page
