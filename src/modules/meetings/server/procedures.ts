import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { AgentSchema, AgentUpdateSchema } from "../../agents/schemas";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, like, sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";
import { agents, meetings } from "@/db/schema";
import { MeetingsSchema, MeetingsUpdateSchema } from "../schemas";
import { MeetingStatus } from "../types";

export const meetingsRouter = createTRPCRouter({
    
    getMany: protectedProcedure
    .input(
        z.object({ 
            search: z.string().nullish(),
            page: z.number().min(MIN_PAGE_SIZE).default(DEFAULT_PAGE),
            pageSize: z.number()
                .min(MIN_PAGE_SIZE)
                .max(MAX_PAGE_SIZE)
                .default(DEFAULT_PAGE_SIZE),
            agentId: z.string().nullish(),
            status: z.enum([
                MeetingStatus.pending,
                MeetingStatus.active,
                MeetingStatus.completed,
                MeetingStatus.upcomming,
                MeetingStatus.cancelled
            ]).nullish(),
        })
    )
    .query(async ({ ctx, input}) => {
        const { search, page, pageSize, status, agentId } = input;

        const data = await db

        .select({
            ...getTableColumns(meetings),
            agent: agents,
            duration: sql<number>`EXTRACT(EPOCH FROM ${meetings.EndedAt} - ${meetings.startedAt})`.as("duration"),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
        .where(
            and(
                eq(meetings.userId, ctx.auth.user.id),
                search ? like(meetings.name, `%${search}%`) : undefined,
                status ? eq(meetings.status, status) : undefined,
                agentId ? eq(meetings.agentId, agentId) : undefined

            )
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

        const total = await db
        .select({
            count: count(),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
        .where(
            and(
                eq(meetings.userId, ctx.auth.user.id),
                search ? like(meetings.name, `%${search}%`) : undefined,
                status ? eq(meetings.status, status) : undefined,
                agentId ? eq(meetings.agentId, agentId) : undefined
            )
        )
        
        const totalPages = Math.ceil(total[0].count / pageSize);

        return { 
            items:data, 
            total: total[0].count, 
            totalPages };
    }),
    getOne: protectedProcedure
    .input(
        z.object({ id: z.string()})
    )
    .query(async ({ input, ctx }) => {
        const [existingmeeting] = await db
        .select({
            ...getTableColumns(meetings),
        })
        .from(meetings)
        .where(
            and(
                eq(meetings.id, input.id),
                eq(meetings.userId, ctx.auth.user.id)
            )
        );

        if (!existingmeeting) {
            throw new TRPCError({ code: "NOT_FOUND", message: "meeting not found"});
        }


        return existingmeeting;
    }),
    create: protectedProcedure
        .input(MeetingsSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdMeeting] = await db
            .insert(meetings)
            .values({
                name: input.name,
                agentId: input.agentId,
                userId: ctx.auth.user.id,
      })
      .returning();

    return createdMeeting;
  }),
  update: protectedProcedure
  .input(MeetingsUpdateSchema)
  .mutation(async ({ input, ctx }) => {
    const { id, ...data } = input;

    const [updatedMeeting] = await db
      .update(meetings)
      .set(data)
      .where(
        and(
          eq(meetings.id, id),
          eq(meetings.userId, ctx.auth.user.id)
        )
    )
    .returning();

    if (!updatedMeeting) {
      throw new TRPCError({ code: "NOT_FOUND", message: "meeting not found"});
    }

    return updatedMeeting;
  }),

});