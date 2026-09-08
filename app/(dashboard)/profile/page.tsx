"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Mail, Calendar, Target, Shield } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
      setProfile(p);
    }
    getProfile();
  }, []);

  return (
    <div className="max-w-2xl space-y-10 pb-20">
      <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">My Profile</h1>
      
      <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800 space-y-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-500/20">
            {profile?.full_name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">{profile?.full_name || 'CashLens User'}</h2>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Student Tier</p>
          </div>
        </div>

        <div className="grid gap-6">
          {[
            { icon: Mail, label: 'Email Address', value: user?.email },
            { icon: Calendar, label: 'Income Frequency', value: profile?.income_frequency },
            { icon: Target, label: 'Financial Goal', value: profile?.financial_goal },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-5 bg-slate-950/50 rounded-2xl border border-slate-800/50">
              <item.icon className="text-indigo-400" size={20} />
              <div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.label}</p>
                <p className="text-white font-bold">{item.value || 'Not set'}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-800 flex items-center gap-2 text-emerald-500/50">
          <Shield size={16} />
          <p className="text-xs font-black uppercase tracking-widest">Account Protected by RLS Encryption</p>
        </div>
      </div>
    </div>
  );
}