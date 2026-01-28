import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-12 px-4 sm:px-6 lg:px-8">
            <EmptyState
                image="/cancelled.svg"
                title="Meeting is Cancelled"
                description="Your meeting has been cancelled."
            />
        </div>
    );
};
