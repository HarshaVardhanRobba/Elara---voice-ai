import { MeetingsGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { MeetingsSchema } from "../../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { GeneratedAvatar } from "@/components/generated-avatar";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormDescription
} from "@/components/ui/form";

import { toast } from "sonner";
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import { useRouter } from "next/navigation";

interface MeetingsFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialvalues?: MeetingsGetOne;
}

export const MeetingsForm = ({
  onSuccess,
  onCancel,
  initialvalues
}: MeetingsFormProps) => {
  const TRPC = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");

  const agents = useQuery(
    TRPC.agents.getMany.queryOptions({
      search: agentSearch,
      pageSize: 100
    })
  );

  const createMeeting = useMutation(
    TRPC.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          TRPC.meetings.getMany.queryOptions({})
        );

        await queryClient.invalidateQueries(
          TRPC.premium.getFreeUsage.queryOptions()
        );

        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);

        if (error.data?.code === "FORBIDDEN") {
          router.push("/upgrade");
        }
      }
    })
  );

  const UpdateMeeting = useMutation(
    TRPC.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          TRPC.meetings.getMany.queryOptions({})
        );

        if (initialvalues?.id) {
          await queryClient.invalidateQueries(
            TRPC.meetings.getOne.queryOptions({ id: initialvalues.id })
          );
        }

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );

  const form = useForm<z.infer<typeof MeetingsSchema>>({
    resolver: zodResolver(MeetingsSchema),
    defaultValues: {
      name: initialvalues?.name ?? "",
      agentId: initialvalues?.agentId ?? ""
    }
  });

  const isEdit = !!initialvalues?.id;
  const isPending = createMeeting.isPending || UpdateMeeting.isPending;

  const Onsubmit = (values: z.infer<typeof MeetingsSchema>) => {
    if (isEdit) {
      UpdateMeeting.mutate({
        ...values,
        id: initialvalues?.id
      });
    } else {
      createMeeting.mutate(values);
    }
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />

      <div className="w-full max-w-xl mx-auto px-4 sm:px-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(Onsubmit)}
            className="space-y-6 sm:space-y-8"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ex: physics doubts"
                      className="h-10 sm:h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Agent Field */}
            <FormField
              control={form.control}
              name="agentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">
                    Agent
                  </FormLabel>
                  <FormControl>
                    <CommandSelect
                      options={(agents.data?.items ?? []).map((agent) => ({
                        id: agent.id,
                        value: agent.id,
                        children: (
                          <div className="flex items-center gap-2 min-w-0">
                            <GeneratedAvatar
                              seed={agent.name}
                              className="h-6 w-6 shrink-0"
                              variant="botttsNeutral"
                            />
                            <span className="truncate">
                              {agent.name}
                            </span>
                          </div>
                        )
                      }))}
                      onSelect={field.onChange}
                      onSearch={setAgentSearch}
                      value={field.value}
                      placeholder="Select an Agent"
                    />
                  </FormControl>

                  <FormDescription className="text-xs sm:text-sm">
                    Not found what you are looking for?{" "}
                    <button
                      type="button"
                      className="font-medium underline underline-offset-4 hover:opacity-80"
                      onClick={() => setOpenNewAgentDialog(true)}
                    >
                      Create New
                    </button>
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-2">
              {onCancel && (
                <Button
                  type="button"
                  variant="ghost"
                  disabled={isPending}
                  onClick={handleCancel}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto"
              >
                {isEdit ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};