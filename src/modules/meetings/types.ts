import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/routers/_app";

export type MeetingsGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];
export type MeetingsGetMany = inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"];

export enum MeetingStatus {
    pending = "pending", 
    active = "active",
    completed  = "completed",
    upcomming = "upcomming",
    cancelled = "cancelled"
}