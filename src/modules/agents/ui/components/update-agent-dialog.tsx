"use client"

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialvalues: AgentGetOne;
}

export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialvalues,
}: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Agent"
      description="Update this agent’s configuration and behavior."
    >
      <div className="max-h-[85vh] overflow-y-auto px-1 sm:px-2">
        <AgentForm
          initialvalues={initialvalues}
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </div>
    </ResponsiveDialog>
  );
};