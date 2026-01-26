"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
 
    return ( 
        <div>
            <DataTable 
              data={data.items}
              columns={columns}
            />
            {data.items.length === 0 && (
              <EmptyState
                title="create your first meeting" 
                description="You have not created any meetings yet."/>
            )}
        </div>
    )
}

export const MeetingsViewLoading = () => {
  return (
    <LoadingState 
      title="Loading Agents" 
      description="Please wait while we load your agents."
    />
  )
}

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Something went wrong"
      description="Please try again later."
    />
  )
}