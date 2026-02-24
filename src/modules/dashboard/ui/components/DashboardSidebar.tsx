"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { VideoIcon, BotIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { DashboardUserButton } from "./DashboardUserButton";
import { DashboardTrial } from "./DashboardTrial";
import Image from "next/image";

const firstSectionItems = [
  { icon: VideoIcon, label: "Meetings", href: "/meetings" },
  { icon: BotIcon, label: "Agents", href: "/agents" },
];

const secondSectionItems = [
  { icon: StarIcon, label: "Upgrade", href: "/upgrade" },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r bg-sidebar
text-sidebar-foreground">
      <SidebarHeader className="px-4 py-6">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" width={28} height={28} alt="logo" />
          <span className="text-lg font-semibold">ELARA</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSectionItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 rounded-lg px-3 transition-colors",
                      "hover:bg-emerald-900/60",
                      pathname === item.href && "bg-emerald-900"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-200">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6 border-t border-emerald-900 pt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSectionItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 rounded-lg px-3 transition-colors",
                      "hover:bg-emerald-900/60",
                      pathname === item.href && "bg-emerald-900"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-200">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto space-y-3 px-3 pb-4">
        <DashboardTrial />
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};