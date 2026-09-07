"use client";
import React from 'react';
import { ShieldCheck, User, Bell, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex gap-4 items-center">
        <ShieldCheck className="text-emerald-600" size={32} />
        <div>
          <h4 className="font-bold text-emerald-900 italic">Military Grade Encryption</h4>
          <p className="text-emerald-700 text-sm">Your financial data is hashed and salted. CashLens cannot see your actual bank secrets.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {[
          { icon: User, label: 'Profile Information', desc: 'Change your name and college email' },
          { icon: Bell, label: 'Notification Preferences', desc: 'When should we alert you about runway?' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-all">
            <div className="flex items-center gap-4">
              <item.icon className="text-slate-400" />
              <div>
                <h4 className="font-bold text-slate-900">{item.label}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          onClick={handleLogout}
          className="w-full p-6 rounded-3xl border border-rose-100 text-rose-500 font-bold flex items-center gap-4 hover:bg-rose-50 transition-all"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </div>
    </div>
  );
}