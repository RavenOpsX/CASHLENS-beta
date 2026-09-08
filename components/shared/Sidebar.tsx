"use client";
import React from 'react';
import { Home, PieChart, CreditCard, Bell, Award, Settings, Zap, LogOut, CheckCircle2, Map, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Map, label: 'Journey', href: '/journey' },
    { icon: PieChart, label: 'Analytics', href: '/analytics' },
    { icon: Zap, label: 'Runway', href: '/runway' },
    { icon: CreditCard, label: 'Simulator', href: '/simulator' },
    { icon: Bell, label: 'Reminders', href: '/reminders' },
    { icon: Award, label: 'Achievements', href: '/achievements' },
    { icon: CheckCircle2, label: 'Tasks', href: '/tasks' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <div className="w-64 bg-[#020617] h-screen border-r border-slate-800 flex flex-col p-6 fixed left-0 top-0 z-50">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Zap size={22} className="text-white fill-current" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-tighter italic">CashLens</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-bold text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold text-sm mt-4"
      >
        <LogOut size={20} />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default Sidebar;