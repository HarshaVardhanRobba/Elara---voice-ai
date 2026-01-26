import {JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";

export const useConfirm = (
    title: string,
    description: string,
): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);

    const confirm = () => {
        return new Promise((resolve) => {
            setPromise({ resolve });
        });
    };

    const handleclose = () => {
            setPromise(null);
    };

    const handleConfirm = () => {
            promise?.resolve(true);
            handleclose();
        };

    const handleCancel = () => {
            promise?.resolve(false);
            handleclose();
    };

    const ConfirmationDialog = () => 
            <ResponsiveDialog
                open={true}
                onOpenChange={handleclose}
                title={title}
                description={description}
            > 
                <div className="flex items-center justify-end gap-x-2 pt-4 pb-2 md:pt-6 md:pb-4">
                    <Button 
                        variant="outline"
                        size="sm"
                        className="w-full lg:w-auto"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="w-full lg:w-auto"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </ResponsiveDialog>

    return [ConfirmationDialog, confirm];
}