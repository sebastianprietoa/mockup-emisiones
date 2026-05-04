import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { DashboardFiltersProvider } from "../context/DashboardFiltersContext";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardFiltersProvider>
      <div className="min-h-screen bg-dashboard-radial text-slate-100">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="md:pl-72">
          <Header onMenuClick={() => setSidebarOpen(true)} menuIcon={Menu} />
          <main className="px-4 pb-10 pt-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </DashboardFiltersProvider>
  );
}
