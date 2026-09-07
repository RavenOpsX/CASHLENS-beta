"use client";
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // We changed the background to the deep Midnight Slate (#020617)
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30">
      
      {/* This is the Desktop Sidebar (Hidden on mobile) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* This is the Mobile Top Bar */}
      <MobileNav />

      {/* 
          The main content area. 
          The "lg:pl-64" keeps the content from going under the sidebar on big screens.
      */}
      <main className="lg:pl-64 min-h-screen pt-[70px] lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}