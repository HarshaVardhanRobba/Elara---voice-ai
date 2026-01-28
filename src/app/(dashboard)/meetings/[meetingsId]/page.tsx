import { auth } from '@/lib/auth';
import { 
  MeetingIdView, 
  MeetingsIdViewError, 
  MeetingsIdViewLoading 
} from '@/modules/meetings/ui/views/meeting-id-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

interface MeetingIdsProps {
  params: Promise<{ meetingsId: string }>
}

const Page = async ( {params}: MeetingIdsProps) => {
  const { meetingsId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingsId })
);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div><MeetingsIdViewLoading /></div>}>
        <ErrorBoundary fallback={<div><MeetingsIdViewError/></div>}>
          <MeetingIdView meetingsId={meetingsId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page;
