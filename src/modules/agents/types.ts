import { inferRouterOutputs } from "@trpc/server";

import { agentsRouter } from "./server/procedures";
import { createTRPCRouter } from "@/trpc/init";
import { agents } from "@/db/schema";
import { AppRouter } from "@/trpc/routers/_app";

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"];
// export type agentGetMany = inferRouterOutputs<typeof agentsRouter>["getMany"];
// export type agentCreate = inferRouterOutputs<typeof agentsRouter>["create"];
// export type agentUpdate = inferRouterOutputs<typeof agentsRouter>["update"];
// export type agentDelete = inferRouterOutputs<typeof agentsRouter>["delete"];