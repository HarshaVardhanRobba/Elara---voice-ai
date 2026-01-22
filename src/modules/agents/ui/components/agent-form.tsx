import { AgentGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { AgentSchema } from "../../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { GeneratedAvatar } from "@/components/generated-avatar"; 

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField
} from "@/components/ui/form";
import { toast } from "sonner";



interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialvalues?: AgentGetOne;
};

export const AgentForm = ({ onSuccess, onCancel, initialvalues }: AgentFormProps) => {
    const TRPC = useTRPC();
    const queryClient = useQueryClient();

        const createAgent = useMutation(TRPC.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(TRPC.agents.getMany.queryOptions({})
            );

            if (initialvalues?.id) {
                await queryClient.invalidateQueries(TRPC.agents.getOne.queryOptions({ id: initialvalues.id }));
            }

            onSuccess?.();
        },
            onError: (error) => {
                toast.error(error.message);
            },
        }),
    );

    const form  = useForm<z.infer<typeof AgentSchema>>({
        resolver: zodResolver(AgentSchema),
        defaultValues: {
            name: initialvalues?.name ?? "",
            Instructions: initialvalues?.instructions ?? "",
        },
    });

    const isEdit = !!initialvalues?.id;
    const isPending = createAgent.isPending;


    const Onsubmit = (values: z.infer<typeof AgentSchema>) => {
        if(isEdit) {
            console.log("TODO: update Agent");
        }
        else {
        createAgent.mutate(values);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(Onsubmit)} className="space-y-8">
                <GeneratedAvatar 
                    seed={form.watch("name")}
                    variant = "botttsNeutral"
                    className="border size-16" 
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="ex: Physics Lecturer" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Instructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="You are an expert in Physics and can answer any question related to Physics. " />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-between gap-2">
                    {onCancel && (
                        <Button 
                            type="button" variant="ghost" 
                            disabled={isPending} onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" disabled={isPending}>
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
                    );
}