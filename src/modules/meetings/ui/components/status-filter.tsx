import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  Loader2Icon,
  VideoIcon,
} from "lucide-react"
import { MeetingStatus } from "../../types"
import { CommandSelect } from "@/components/command-select"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"

const itemClass =
  "flex items-center gap-2 text-sm font-medium capitalize"

const iconClass = "h-4 w-4 text-muted-foreground"

const options = [
  {
    id: MeetingStatus.upcomming,
    value: MeetingStatus.upcomming,
    children: (
      <div className={itemClass}>
        <ClockArrowUpIcon className={iconClass} />
        {MeetingStatus.upcomming}
      </div>
    ),
  },
  {
    id: MeetingStatus.completed,
    value: MeetingStatus.completed,
    children: (
      <div className={itemClass}>
        <CircleCheckIcon className={iconClass} />
        {MeetingStatus.completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.active,
    value: MeetingStatus.active,
    children: (
      <div className={itemClass}>
        <VideoIcon className={iconClass} />
        {MeetingStatus.active}
      </div>
    ),
  },
  {
    id: MeetingStatus.pending,
    value: MeetingStatus.pending,
    children: (
      <div className={itemClass}>
        <Loader2Icon className={`${iconClass} animate-spin`} />
        {MeetingStatus.pending}
      </div>
    ),
  },
  {
    id: MeetingStatus.cancelled,
    value: MeetingStatus.cancelled,
    children: (
      <div className={itemClass}>
        <CircleXIcon className={iconClass} />
        {MeetingStatus.cancelled}
      </div>
    ),
  },
]

export const StatusFilter = () => {
  const [filters, setFilter] = useMeetingsFilters()

  return (
    <CommandSelect
      options={options}
      placeholder="Filter by status"
      className="h-9 w-1/6"
      onSelect={(value) =>
        setFilter({ status: value as MeetingStatus })
      }
      value={filters.status ?? ""}
    />
  )
}
