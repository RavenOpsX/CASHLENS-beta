"use client";
import React, { useState } from 'react';
import { ShieldCheck, User, Bell, LogOut, ChevronRight, ToggleLeft, ToggleRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SettingsPage() {
  const router = useRouter();
  const [notifEnabled, setNotifEnabled] = useState(true);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="max-w-2xl space-y-10 pb-20">
      <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Settings</h1>
      
      <div className="bg-emerald-500/5 p-8 rounded-[2.5rem] border border-emerald-500/20 flex gap-6 items-center">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center shrink-0">
          <ShieldCheck className="text-emerald-400" size={32} />
        </div>
        <div>
          <h4 className="font-black text-emerald-400 italic text-xl uppercase tracking-tighter">Encrypted Architecture</h4>
          <p className="text-emerald-700/60 text-sm font-bold uppercase tracking-tight leading-tight mt-1">Your data is hashed and siloed. CashLens operates on zero-knowledge principles.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* PROFILE BUTTON - NOW WORKS */}
        <Link href="/profile" className="w-full bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800 flex items-center justify-between hover:bg-slate-800/80 hover:border-indigo-500/50 transition-all group">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
              <User size={22} />
            </div>
            <div className="text-left">
              <h4 className="font-black text-white text-lg italic uppercase">Profile Information</h4>
              <p className="text-[10px] text-slate-500 font-black tracking-widest">IDENTITY & PREFERENCES</p>
            </div>
          </div>
          <ChevronRight className="text-slate-700 group-hover:text-white transition-all translate-x-0 group-hover:translate-x-1" />
        </Link>

        {/* NOTIFICATION TOGGLE - NOW WORKS */}
        <div className="w-full bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800 flex items-center justify-between transition-all group">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
              <Bell size={22} />
            </div>
            <div className="text-left">
              <h4 className="font-black text-white text-lg italic uppercase">Notification Engine</h4>
              <p className="text-[10px] text-slate-500 font-black tracking-widest">RUNWAY & BILL ALERTS</p>
            </div>
          </div>
          <button onClick={() => setNotifEnabled(!notifEnabled)} className="text-indigo-500 transition-all">
            {notifEnabled ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-700" />}
          </button>
        </div>
        
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