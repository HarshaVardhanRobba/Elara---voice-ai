import z from "zod"

export const MeetingsSchema = z.object({
  name: z.string().min(1, { message:  "Name is required" }).max(100, { message: "Too long" }),
  agentId: z.string().min(1, { message: "AgentId is required" }),
});

export const MeetingsUpdateSchema = MeetingsSchema.extend({
    id: z.string().min(1, { message: "Id is required"}),
});