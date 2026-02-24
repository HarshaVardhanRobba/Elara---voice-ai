import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useRouter } from "next/navigation";
import { MeetingsForm } from "./meetings-form";

interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({
  open,
  onOpenChange
}: NewMeetingDialogProps) => {
  const router = useRouter();

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Meeting"
      description="Set up a new meeting session with your selected AI agent."
    >
      <div className="max-h-[80vh] overflow-y-auto px-1 sm:px-2">
        <MeetingsForm
          onSuccess={(id) => {
            onOpenChange(false);
            if (id) {
              router.push(`/meetings/${id}`);
            }
          }}
          onCancel={() => onOpenChange(false)}
        />
      </div>
    </ResponsiveDialog>
  );
};