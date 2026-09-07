"use client";
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F1F5F9]"> {/* Darker background for contrast */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <MobileNav />
      <main className="lg:pl-64 min-h-screen pt-[70px] lg:pt-0">
        <div className="max-w-7xl mx-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}