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

const firstSectionItems = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSectionItems = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

interface DashboardSidebarProps {
  theme?: string; // Optional theme prop
}

export const DashboardSidebar = ({ theme = "light" }: DashboardSidebarProps) => {
  const pathname: string = usePathname(); // Utilize 'usePathname' to get the current path

  return (
    <Sidebar className={cn(theme === "dark" ? "bg-dark" : "bg-light")}>
      <SidebarHeader className="px-4 py-3">
        <span className="text-lg font-semibold text-foreground">
          Meet.AI
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSectionItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to sidebar/50", pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to sidebar/50")}
                  isActive={pathname === item.href}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium tracking-tight">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSectionItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to sidebar/50", pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to sidebar/50")}
                  isActive={pathname === item.href}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium tracking-tight">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
