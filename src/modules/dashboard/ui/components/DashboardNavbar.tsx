"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./DashboardCommand";
import { useEffect, useState } from "react";


export const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();

    const [commandOpen, setCommandOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
        <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
        <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
            <Button 
                variant="outline" className="size-9 px-3"
                onClick={toggleSidebar}
            >
                {(state === "collapsed" || isMobile)
                 ? <PanelLeftIcon className="size-4"/> 
                 : <PanelLeftCloseIcon className="size-4"/>
                }
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="h-9 w-60 justify-start gap-2 font-normal text-muted-foreground hover:text-muted-foreground"
                onClick={() => setCommandOpen((open) => !open)}
            >
            <SearchIcon className="h-4 w-4" />
                <span className="flex-1 text-left">Search</span>

                <kbd className="pointer-events-none rounded border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    ⌘K
                </kbd>
            </Button>
        </nav>
        </>
    )
}