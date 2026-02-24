import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MAX_FREE_AGENTS,
  MAX_FREE_MEETINGS,
} from "@/modules/premium/constants";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { RocketIcon } from "lucide-react";
import Link from "next/link";

export const DashboardTrial = () => {
  const TRPC = useTRPC();
  const { data } = useQuery(TRPC.premium.getFreeUsage.queryOptions());

  if (!data) return null;

  const agentsPercent =
    (data.agentsCount / MAX_FREE_AGENTS) * 100;

  const meetingsPercent =
    (data.meetingsCount / MAX_FREE_MEETINGS) * 100;

  return (
    <div className="w-56 rounded-xl border border-emerald-700/40 bg-gradient-to-b from-emerald-900 to-emerald-950 p-4 text-sm text-emerald-100 shadow-md">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <RocketIcon className="h-4 w-4 text-emerald-400" />
        <p className="font-medium">Free Trial</p>
      </div>

      {/* Agents */}
      <div className="mb-4">
        <p className="text-xs text-emerald-300 mb-1">
          {data.agentsCount}/{MAX_FREE_AGENTS} Agents
        </p>
        <Progress
          value={agentsPercent}
          className="h-2 bg-emerald-800"
        />
      </div>

      {/* Meetings */}
      <div className="mb-4">
        <p className="text-xs text-emerald-300 mb-1">
          {data.meetingsCount}/{MAX_FREE_MEETINGS} Meetings
        </p>
        <Progress
          value={meetingsPercent}
          className="h-2 bg-emerald-800"
        />
      </div>

      {/* Upgrade Button */}
      <Button
        asChild
        size="sm"
        variant="secondary"
        className="w-full bg-emerald-700 hover:bg-emerald-600 text-white"
      >
        <Link href="/upgrade">
          Upgrade
        </Link>
      </Button>
    </div>
  );
};