"use client";
import React from 'react';
import { ShieldCheck, User, Bell, LogOut, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const settingsItems = [
    { icon: User, label: 'Profile Information', desc: 'IDENTITY & PREFERENCES' },
    { icon: Bell, label: 'Notification Engine', desc: 'RUNWAY & BILL ALERTS' },
  ];

  return (
    <div className="max-w-2xl space-y-10 pb-20">
      <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Settings</h1>
      
      {/* Security Banner */}
      <div className="bg-emerald-500/5 p-8 rounded-[2.5rem] border border-emerald-500/20 flex gap-6 items-center">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center shrink-0">
          <ShieldCheck className="text-emerald-400" size={32} />
        </div>
        <div>
          <h4 className="font-black text-emerald-400 italic text-xl uppercase tracking-tighter">Encrypted Architecture</h4>
          <p className="text-emerald-700/60 text-sm font-bold uppercase tracking-tight leading-tight mt-1">Your data is hashed and siloed. CashLens operates on zero-knowledge principles.</p>
        </div>
      </div>

      {/* Settings Buttons */}
      <div className="space-y-4">
        {settingsItems.map((item, i) => (
          <button key={i} className="w-full bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800 flex items-center justify-between hover:bg-slate-800/80 hover:border-indigo-500/50 transition-all group">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                <item.icon size={22} />
              </div>
              <div className="text-left">
                <h4 className="font-black text-white text-lg italic uppercase">{item.label}</h4>
                <p className="text-[10px] text-slate-500 font-black tracking-widest">{item.desc}</p>
              </div>
            </div>
            <ChevronRight className="text-slate-700 group-hover:text-white transition-all translate-x-0 group-hover:translate-x-1" />
          </button>
        ))}
        
        {/* Big Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full mt-10 p-8 rounded-[2.5rem] border border-rose-500/30 bg-rose-500/10 text-rose-500 font-black text-2xl italic flex items-center justify-center gap-4 hover:bg-rose-500 hover:text-white transition-all shadow-2xl shadow-rose-500/5 uppercase tracking-tighter"
        >
          <LogOut size={28} /> SIGN OUT
        </button>
      </div>
    </div>
  );
}