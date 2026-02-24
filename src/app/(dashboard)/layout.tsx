import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/DashboardSidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/DashboardNavbar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">

        {/* Sidebar */}
        <DashboardSidebar />

        {/* Content */}
        <div className="flex flex-1 flex-col min-h-screen">
          <DashboardNavbar />

          <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;