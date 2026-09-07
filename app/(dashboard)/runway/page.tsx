"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Timer, AlertTriangle, CheckCircle2, TrendingDown } from 'lucide-react';

export default function RunwayPage() {
  const [stats, setStats] = useState({ balance: 0, dailyAvg: 0, daysLeft: 0 });

  useEffect(() => {
    async function calcRunway() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: t } = await supabase.from('transactions').select('*').eq('user_id', user?.id);
      
      const income = t?.filter(x => x.type === 'income').reduce((s, x) => s + Number(x.amount), 0) || 0;
      const expense = t?.filter(x => x.type === 'expense').reduce((s, x) => s + Number(x.amount), 0) || 0;
      const balance = income - expense;
      const dailyAvg = (expense / 30) || 0; // Simplified to 30 days
      const daysLeft = dailyAvg > 0 ? Math.floor(balance / dailyAvg) : 0;

      setStats({ balance, dailyAvg, daysLeft });
    }
    calcRunway();
  }, []);

  return (
    <div className="max-w-3xl space-y-8">
      <div className="bg-slate-900 p-12 rounded-[3rem] text-white relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Live Estimate</p>
          <h1 className="text-6xl font-black mb-4">{stats.daysLeft} Days</h1>
          <p className="text-slate-400 text-lg">Based on your spending of <span className="text-white font-bold">₹{stats.dailyAvg.toFixed(0)}/day</span>, your money will last until approximately {new Date(Date.now() + stats.daysLeft * 86400000).toLocaleDateString()}.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <TrendingDown className="text-rose-500 mb-4" />
          <h3 className="font-bold text-slate-900">Spending Pace</h3>
          <p className="text-slate-500 text-sm mt-2">You are spending faster than 60% of students in your category.</p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <CheckCircle2 className="text-emerald-500 mb-4" />
          <h3 className="font-bold text-slate-900">Survival Status</h3>
          <p className="text-slate-500 text-sm mt-2">{stats.daysLeft > 10 ? "Looking healthy! You're on track to finish the month." : "Critical! Consider cutting non-essential costs."}</p>
        </div>
      </div>
    </div>
  );
}