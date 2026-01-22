import z from "zod"

export const AgentSchema = z.object({
    name: z.string().min(1, { message: "Name is required"}).max(100, { message: "Too long"}),
    Instructions: z.string().min(1, { message: "Instructions are required"}),
})