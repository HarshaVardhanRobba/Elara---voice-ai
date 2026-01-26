import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

export const MeetingsSearchFilter = () => {
    const [filters, setFilter] = useMeetingsFilters();

    return (
        <div>
            <Input 
                className="w-full" placeholder="Filter by name" 
                value={filters.search} 
                onChange={(e) => setFilter({ search: e.target.value })} 
            />
            <SearchIcon className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
        </div>
    )
}