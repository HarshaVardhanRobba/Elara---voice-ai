import { useTRPC } from "@/trpc/client"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { CommandSelect } from "@/components/command-select"
import { GeneratedAvatar } from "@/components/generated-avatar"

export const AgentIdFilter = () => {
  const [filters, setFilters] = useMeetingsFilters()
  const trpc = useTRPC()

  const [agentSearch, setAgentSearch] = useState("")

  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      search: agentSearch,
      pageSize: 100,
    })
  )

  return (
    <CommandSelect
      className="h-9 w-1/5"
      placeholder="Agent"
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-3">
            <GeneratedAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="h-8 w-8 shrink-0"
            />
            <span className="text-sm font-medium truncate">
              {agent.name}
            </span>
          </div>
        ),
      }))}
      onSelect={(value) =>
            setFilters({
            agentId: filters.agentId === value ? "" : value,
            })
        }
      onSearch={setAgentSearch}
      value={filters.agentId ?? ""}
    />
  )
}
