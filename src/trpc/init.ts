import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { polarClient } from '@/lib/polar';
import { count, eq } from 'drizzle-orm';
import { agents, meetings } from '@/db/schema';
import { db } from '@/db';
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in to access this resource.' });
  }

  return next({ ctx: { ...ctx, auth: session} });
});

export const premuiumprocedure = (entity: 'agents' | 'meetings') => protectedProcedure.use(async ({ ctx, next}) => {
  const customer = await polarClient.customers.getStateExternal({
    externalId: ctx.auth.user.id,

  });

  const [userMeetings] = await db
    .select({
        count: count(meetings.id),
    })
    .from(meetings)
    .where(eq(meetings.userId, ctx.auth.user.id))
  
  const [userAgents] = await db
    .select({
        count: count(agents.id),
    })
    .from(agents)
    .where(eq(agents.userId, ctx.auth.user.id));

  const isPremuim = customer.activeSubscriptions.length > 0;
  const isFreeAgentLimitReached =  userAgents.count >= 5;
  const isFreeMeetingLimitReached = userMeetings.count >= 5;

  const shouldThrowAgentError = !isPremuim && entity === 'agents' && isFreeAgentLimitReached;

  const shouldThrowMeetingError = !isPremuim && entity === 'meetings' && isFreeMeetingLimitReached;

  if (shouldThrowAgentError) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'You have reached the free limit for ' + entity + '. Please upgrade to premium to create more.' });
  }

  if (shouldThrowMeetingError) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'You have reached the free limit for ' + entity + '. Please upgrade to premium to create more.' });
  }

  return next({ ctx });

})