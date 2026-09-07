"use client";
import React from 'react';
import { Home, PieChart, CreditCard, Bell, Award, Settings, Zap, CheckCircle2, Map } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Map, label: 'Money Journey', href: '/journey' },
    { icon: PieChart, label: 'Analytics', href: '/analytics' },
    { icon: Zap, label: 'Runway', href: '/runway' },
    { icon: CreditCard, label: 'Simulator', href: '/simulator' },
    { icon: Bell, label: 'Reminders', href: '/reminders' },
    { icon: Award, label: 'Achievements', href: '/achievements' },
    { icon: CheckCircle2, label: 'Tasks', href: '/tasks' },
    { icon: Settings, label: 'Settings', href: '/settings' }
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-slate-200 flex flex-col p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 px-2 mb-10">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Zap size={20} className="text-white fill-current" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">CashLens</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 bg-slate-50 rounded-2xl">
        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">My Streak</div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="text-xl font-bold text-slate-900">7 Days</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;