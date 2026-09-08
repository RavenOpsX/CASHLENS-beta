"use client";
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Timer, AlertTriangle, CheckCircle2, TrendingDown, Info } from 'lucide-react';

export default function RunwayPage() {
  const [stats, setStats] = useState({ balance: 0, dailyAvg: 0, daysLeft: 0, isNew: true });

  useEffect(() => {
    async function calcRunway() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: t } = await supabase.from('transactions').select('*').eq('user_id', user?.id);
      
      const income = t?.filter(x => x.type === 'income').reduce((s, x) => s + Number(x.amount), 0) || 0;
      const expense = t?.filter(x => x.type === 'expense').reduce((s, x) => s + Number(x.amount), 0) || 0;
      const balance = income - expense;
      
      // SMART LOGIC: If user has < 5 expenses, assume a default daily spend of ₹200 
      // so the runway doesn't look like 1000 days.
      const actualDailyAvg = expense / 30;
      const dailyAvg = actualDailyAvg < 50 ? 200 : actualDailyAvg; 
      
      const daysLeft = dailyAvg > 0 ? Math.floor(balance / dailyAvg) : 0;

      setStats({ balance, dailyAvg, daysLeft, isNew: (t?.filter(x => x.type === 'expense').length || 0) < 5 });
    }
    calcRunway();
  }, []);

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Survival Runway</h1>

      <div className="bg-slate-900 p-12 rounded-[3rem] text-white relative overflow-hidden border border-slate-800 shadow-2xl">
        <div className="relative z-10">
          <p className="text-indigo-400 font-black uppercase tracking-[0.2em] text-xs mb-4">Current Estimate</p>
          <h1 className="text-7xl font-black mb-4 tracking-tighter italic">{stats.daysLeft} Days</h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl">
            Based on a {stats.isNew ? 'projected' : 'calculated'} burn rate of <span className="text-white font-black">₹{stats.dailyAvg.toFixed(0)}/day</span>, your funds are expected to last until {new Date(Date.now() + stats.daysLeft * 86400000).toLocaleDateString()}.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600 rounded-full blur-[120px] opacity-20"></div>
      </div>

      {stats.isNew && (
        <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl flex gap-4 items-start">
          <Info className="text-blue-400 shrink-0" size={24} />
          <p className="text-blue-200 text-sm font-bold uppercase tracking-tight">
            Note: You have very few expenses logged. We are using a standard student estimate (₹200/day) until you provide more data for a precise calculation.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-sm">
          <TrendingDown className="text-rose-500 mb-4" size={32} />
          <h3 className="font-black text-white uppercase italic text-xl">Spending Pace</h3>
          <p className="text-slate-500 text-sm font-bold mt-2 uppercase tracking-wide">Calculated burn rate is within the {stats.dailyAvg > 500 ? 'Aggressive' : 'Sustainable'} zone.</p>
        </div>
        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-sm">
          <CheckCircle2 className="text-emerald-500 mb-4" size={32} />
          <h3 className="font-black text-white uppercase italic text-xl">Survival Status</h3>
          <p className="text-slate-500 text-sm font-bold mt-2 uppercase tracking-wide">{stats.daysLeft > 15 ? "Operational Health: Optimal" : "Critical: Immediate spending reduction required."}</p>
        </div>
      </div>
    </div>
  );
}