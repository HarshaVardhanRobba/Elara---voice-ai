import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useRouter } from "next/navigation";
import { MeetingsForm } from "./meetings-form";


interface newAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({ 
    open, onOpenChange 
}: newAgentDialogProps) => {
    const router = useRouter();

    return (
        <ResponsiveDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Create New Meeting"
            description="Set up a new AI agent to assist you."
        >
            <MeetingsForm
                onSuccess={(id) =>{
                    onOpenChange(false);
                    router.push(`/meetings/${id}`);
                }}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    )
    
}