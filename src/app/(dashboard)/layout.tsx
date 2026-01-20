import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/DashboardSidebar";
import React from "react";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/DashboardNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <div className="bg-sidebar min-h-screen w-64">
            <DashboardSidebar theme="dark" />
        </div>
        <main className="flex-1 bg-main min-h-screen">
            <DashboardNavbar />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
