import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingsForm } from "./meetings-form";
import { MeetingsGetOne } from "../../types";


interface UpdateAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialvalues: MeetingsGetOne;
}

export const UpdateMeetingDialog = ({ 
    open, 
    onOpenChange,
    initialvalues 
}: UpdateAgentDialogProps) => {

    return (
        <ResponsiveDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Edit Meeting"
            description="Edit the AI agent."
        >
            <MeetingsForm
                onSuccess={() =>{
                    onOpenChange(false);
                }}
                onCancel={() => onOpenChange(false)}
                initialvalues={initialvalues}
            />
        </ResponsiveDialog>
    )
    
}