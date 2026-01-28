import { EmptyState } from "@/components/empty-state";

export const PendingState = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-12 px-4 sm:px-6 lg:px-8">
            <EmptyState
                image="/processing.svg"
                title="Meeting completed"
                description="Your meeting has been completed."
            />
        </div>
    );
};
