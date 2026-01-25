import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { AgentSchema, AgentUpdateSchema } from "../../agents/schemas";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, like, sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";
import { meetings } from "@/db/schema";

export const meetingsRouter = createTRPCRouter({
    
    getMany: protectedProcedure
    .input(
        z.object({ 
            search: z.string().nullish(),
            page: z.number().min(MIN_PAGE_SIZE).default(DEFAULT_PAGE),
            pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
        })
    )
    .query(async ({ ctx, input}) => {
        const { search, page, pageSize } = input;

        const data = await db
        .select({
            meetingsCount: sql<number>`5`,
            ...getTableColumns(meetings),
        })
        .from(meetings)
        .where(
            and(
                eq(meetings.userId, ctx.auth.user.id),
                search ? like(meetings.name, `%${search}%`) : undefined,
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
        .where(
            and(
                eq(meetings.userId, ctx.auth.user.id),
                search ? like(meetings.name, `%${search}%`) : undefined,
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
});