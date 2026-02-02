"use client"

import { format } from "date-fns"
import { ColumnDef } from "@tanstack/react-table"
import { MeetingsGetMany } from "../../types"
import { GeneratedAvatar } from "@/components/generated-avatar"
import {
  CornerDownRightIcon,
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  Loader2Icon
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn, formatDuration } from "@/lib/utils"

const StatusIconMap = {
  pending: Loader2Icon,
  active: Loader2Icon,
  completed: CircleCheckIcon,
  upcomming: ClockArrowUpIcon,
  cancelled: CircleXIcon,
}

const StatusStyleMap = {
  pending: "border-gray-300 text-gray-600",
  active: "border-yellow-400 text-yellow-700",
  completed: "border-green-400 text-green-700",
  upcomming: "border-blue-400 text-blue-700",
  cancelled: "border-red-400 text-red-700",
}

export const columns: ColumnDef<MeetingsGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium text-gray-900">
          {row.original.name}
        </span>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CornerDownRightIcon className="w-3 h-3" />

          <div className="flex items-center gap-2 truncate">
            <GeneratedAvatar
              seed={row.original.agent.name}
              variant="botttsNeutral"
              className="w-4 h-4"
            />

            <span className="truncate capitalize">
              {row.original.agent.name}
            </span>
          </div>

          {row.original.startedAt && (
            <span className="text-xs text-gray-400">
              • {format(row.original.startedAt, "MMM d")}
            </span>
          )}
        </div>
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon =
        StatusIconMap[row.original.status as keyof typeof StatusIconMap]

      return (
        <Badge
          variant="outline"
          className={cn(
            "flex items-center gap-1 capitalize",
            StatusStyleMap[row.original.status as keyof typeof StatusStyleMap]
          )}
        >
          <Icon
            className={cn(
              "w-4 h-4",
              row.original.status === "active" && "animate-spin"
            )}
          />
          {row.original.status}
        </Badge>
      )
    },
  },

  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-1 border-gray-300 text-gray-700"
      >
        <ClockFadingIcon className="w-4 h-4 text-gray-500" />
        {row.original.duration
          ? formatDuration(row.original.duration)
          : "Not started"}
      </Badge>
    ),
  },
]
