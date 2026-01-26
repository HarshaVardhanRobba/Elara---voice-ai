"use client"

import { Button } from "@/components/ui/button"
import { NewAgentDialog } from "./new-agent-dialog"
import { useState } from "react"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { useAgentsFilters } from "../../hooks/use-agents-filters"
import { AgentsSearchFilter } from "./agents-search-filter"
import { DEFAULT_PAGE_SIZE } from "@/constants"
import { ScrollBar } from "@/components/ui/scroll-area"
import { ScrollArea } from "@radix-ui/react-scroll-area"

export const AgentsListHeader = () => {
    const [filters, setFilter] = useAgentsFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isAnyFilterModified = !!filters.search;

    const onClearFilters = () => {
        setFilter({
            search: "",
            page: DEFAULT_PAGE_SIZE,
        });
    }

    return (
        <>
        <NewAgentDialog
            open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        <div className="p-4 md:px-8 flex flex-col gap-y-4 w-full">
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-extrabold">Agents</h5>
                <Button onClick={() => setIsDialogOpen(true)} variant="default">
                    <PlusIcon />
                    New Agent
                </Button>
            </div>
            <ScrollArea>
            <div className="flex items-center gap-x-2 p-1">
                <AgentsSearchFilter />
                {isAnyFilterModified && 
                    (
                        <Button 
                            size="sm" variant="default" onClick={onClearFilters}
                        >
                            <XCircleIcon />
                            Clear Filters
                        </Button>
                    )
                }
            </div>
            <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </div>
    </>
    )
}