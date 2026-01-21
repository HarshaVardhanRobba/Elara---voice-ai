import { CommandResponsiveDialog, CommandInput, CommandList, CommandItem,  } from "@/components/ui/command"
import { SetStateAction } from "react";
import { Dispatch } from "react";

interface DashboardCommandProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput 
                placeholder="Search..."
            />
            <CommandList>
                <CommandItem>
                    Test
                </CommandItem>
            </CommandList>
        </CommandResponsiveDialog>
    )
}