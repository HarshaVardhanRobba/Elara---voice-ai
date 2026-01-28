import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface ActiveStateProps {
    meetingId: string;
}

export const ActiveState = ({
    meetingId,
}: ActiveStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-12 px-4 sm:px-6 lg:px-8">
            <EmptyState
                image="/upcoming.svg"
                title="Meeting is Active"
                description="You can join the meeting now."
            />

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                    asChild
                    className="flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon className="w-5 h-5" />
                        Join Meeting
                    </Link>
                </Button>
            </div>
        </div>
    );
};
