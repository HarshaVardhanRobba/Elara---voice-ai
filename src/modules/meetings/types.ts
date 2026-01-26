import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/routers/_app";

export type MeetingsGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];
// export type agentGetMany = inferRouterOutputs<typeof agentsRouter>["getMany"];
// export type agentCreate = inferRouterOutputs<typeof agentsRouter>["create"];
// export type agentUpdate = inferRouterOutputs<typeof agentsRouter>["update"];
// export type agentDelete = inferRouterOutputs<typeof agentsRouter>["delete"];