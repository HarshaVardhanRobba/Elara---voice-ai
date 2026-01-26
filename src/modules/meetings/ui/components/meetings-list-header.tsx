"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import { PlusIcon, Search, XCircleIcon } from "lucide-react"
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants"
import { NewMeetingDialog } from "./new-meeting-dialog"
import { MeetingsSearchFilter } from "./meetings-search-filter"
import { StatusFilter } from "./status-filter"
import { AgentIdFilter } from "./agent-id-filter"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export const MeetingsListHeader = () => {
    const [filters, setFilter] = useMeetingsFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isAnyFilterModified = !!filters.search || !!filters.status || !!filters.agentId;

    const onClearFilters = () => {
        setFilter({
            search: "",
            page: DEFAULT_PAGE,
            status: null,
            agentId: "",
        });
    }

    return (
        <>
        <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
        <div className="p-4 md:px-8 flex flex-col gap-y-4 w-full">
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-extrabold">Meetings</h5>
                <Button onClick={() => {setIsDialogOpen(true)}} variant="default">
                    <PlusIcon />
                    New Meeting
                </Button>
            </div>
            <ScrollArea className="w-full">
                <div className="flex items-center gap-x-2 p-1">
                    <MeetingsSearchFilter />
                    <StatusFilter/>
                    <AgentIdFilter/>
                    {isAnyFilterModified && (
                        <Button 
                            variant="outline" size="sm" 
                            onClick={onClearFilters}>
                            <XCircleIcon className="w-4 h-4 mr-2" />
                            Clear filters
                        </Button>
                    )}
                </div>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </div>
    </>
    )
}