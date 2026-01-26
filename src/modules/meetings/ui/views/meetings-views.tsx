"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const router = useRouter();

    const [filters, setFilter] = useMeetingsFilters();

    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
      ...filters
    }));
 
    return ( 
        <div>
            <DataTable 
              data={data.items}
              columns={columns}
              onRowClick={(row) => router.push(`/meetings/${row.id}`)}
            />
            <DataPagination 
              totalPages={data.totalPages}
              page={filters.page}
              onPageChange={(page) => setFilter({page})}
            />
              <EmptyState
                title="create your first meeting" 
                description="You have not created any meetings yet."/>
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