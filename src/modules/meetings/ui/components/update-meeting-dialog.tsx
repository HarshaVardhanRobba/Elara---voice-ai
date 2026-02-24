import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingsForm } from "./meetings-form";
import { MeetingsGetOne } from "../../types";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialvalues: MeetingsGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialvalues
}: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Meeting"
      description="Update the meeting details and assigned AI agent."
    >
      <div className="max-h-[80vh] overflow-y-auto px-1 sm:px-2">
        <MeetingsForm
          initialvalues={initialvalues}
          onSuccess={() => {
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </div>
    </ResponsiveDialog>
  );
};