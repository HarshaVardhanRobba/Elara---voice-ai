import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface UpcommingStateProps {
  meetingId: string;
  isCancelling: boolean;
}

export const UpcommingState = ({
  meetingId,
  isCancelling,
}: UpcommingStateProps) => {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-lg flex-col items-center text-center">

        {/* Empty State */}
        <EmptyState
          image="/upcoming.svg"
          title="No Upcoming Meetings"
          description="You have not created any upcoming meetings yet."
        />

        {/* Actions */}
        <div className="mt-8 w-full">
          <Button
            asChild
            size="lg"
            disabled={isCancelling}
            className="w-full sm:w-auto"
          >
            <Link
              href={`/call/${meetingId}`}
              className="flex items-center justify-center gap-2"
            >
              <VideoIcon className="h-5 w-5" />
              Start Meeting
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};