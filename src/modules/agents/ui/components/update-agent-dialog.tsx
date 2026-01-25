import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialvalues: AgentGetOne
}

export const UpdateAgentDialog = ({ 
    open, 
    onOpenChange, 
    initialvalues 
}: UpdateAgentDialogProps) => {
    return (
        <ResponsiveDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Edit Agent"
            description="Edit the AI agent to assist you."
        >
            <AgentForm 
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)} 
                initialvalues={initialvalues}
            />
        </ResponsiveDialog>
    ) 
}