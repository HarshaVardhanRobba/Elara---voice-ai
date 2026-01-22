import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "../../hooks/use-agents-filters";

export const AgentsSearchFilter = () => {
    const [filters, setFilter] = useAgentsFilters();

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