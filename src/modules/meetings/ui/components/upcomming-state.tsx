import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface UpcommingStateProps {
    meetingId: string;
    onCancelMeeting: () => void;
    isCancelling: boolean;
}

export const UpcommingState = ({
    meetingId,
    onCancelMeeting,
    isCancelling,
}: UpcommingStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-12 px-4 sm:px-6 lg:px-8">
            <EmptyState
                image="/upcoming.svg"
                title="No Upcoming Meetings"
                description="You have not created any upcoming meetings yet."
            />

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                    variant="destructive"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto"
                    onClick={onCancelMeeting}
                    disabled={isCancelling}
                >
                    <BanIcon className="w-5 h-5" />
                    Cancel Meeting
                </Button>

                <Button
                    asChild
                    className="flex items-center justify-center gap-2 w-full sm:w-auto"
                    disabled={isCancelling}
                >
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon className="w-5 h-5" />
                        Start Meeting
                    </Link>
                </Button>
            </div>
        </div>
    );
};
