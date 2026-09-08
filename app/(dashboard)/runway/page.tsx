"use client";
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Timer, TrendingDown, CheckCircle2, Info } from 'lucide-react';

export default function RunwayPage() {
  const [stats, setStats] = useState({ balance: 0, dailyAvg: 0, daysLeft: 0, isProjected: true });

  useEffect(() => {
    async function calcRunway() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: t } = await supabase.from('transactions').select('*').eq('user_id', user?.id);
      
      const income = t?.filter(x => x.type === 'income').reduce((s, x) => s + Number(x.amount), 0) || 0;
      const expense = t?.filter(x => x.type === 'expense').reduce((s, x) => s + Number(x.amount), 0) || 0;
      const balance = income - expense;
      
      const actualDailyAvg = expense / 30;
      // If actual spend is too low (new user), we use ₹250 as a "Student Baseline"
      const dailyAvg = actualDailyAvg < 50 ? 250 : actualDailyAvg; 
      const daysLeft = dailyAvg > 0 ? Math.floor(balance / dailyAvg) : 0;

      setStats({ balance, dailyAvg, daysLeft, isProjected: actualDailyAvg < 50 });
    }
    calcRunway();
  }, []);

  return (
    <div className="max-w-4xl space-y-10 pb-20">
      <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Survival Runway</h1>

      <div className="bg-slate-900 p-12 rounded-[3rem] text-white relative overflow-hidden border border-slate-800 shadow-2xl">
        <div className="relative z-10">
          <p className="text-indigo-400 font-black uppercase tracking-[0.2em] text-xs mb-4">Estimated Survival</p>
          <h1 className="text-8xl font-black mb-6 tracking-tighter italic">{stats.daysLeft} Days</h1>
          <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
            Based on a {stats.isProjected ? 'standard' : 'calculated'} burn rate of <span className="text-white font-black underline decoration-indigo-500">₹{stats.dailyAvg.toFixed(0)}/day</span>, your funds will last until {new Date(Date.now() + stats.daysLeft * 86400000).toLocaleDateString()}.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[150px] opacity-20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800">
          <TrendingDown className="text-rose-500 mb-6" size={40} />
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Spending Pace</h3>
          <p className="text-slate-500 font-bold mt-4 leading-tight uppercase text-sm tracking-wide">
            {stats.isProjected ? "Awaiting more data for precise calculation. Currently using regional student baseline." : "Calculating based on your real-world transactional behavior."}
          </p>
        </div>
        <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800">
          <CheckCircle2 className="text-emerald-500 mb-6" size={40} />
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Survival Status</h3>
          <p className="text-slate-500 font-bold mt-4 leading-tight uppercase text-sm tracking-wide">
            {stats.daysLeft > 20 ? "Operational Health: Optimal. Keep maintaining current inflow." : "Warning: Inflow/Outflow ratio is reaching critical threshold."}
          </p>
        </div>
      </div>

      {stats.isProjected && (
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-8 rounded-[2.5rem] flex items-center gap-6">
           <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center shrink-0">
              <Info className="text-indigo-400" />
           </div>
           <p className="text-indigo-200 text-sm font-bold uppercase tracking-wide">
             The engine is using a projected baseline of ₹250/day. Add more expenses to calibrate the lens to your actual habits.
           </p>
        </div>
      )}
    </div>
  );
}