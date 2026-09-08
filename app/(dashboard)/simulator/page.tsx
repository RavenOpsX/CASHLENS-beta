"use client";
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SimulatorPage() {
  const [balance, setBalance] = useState(0);
  const [dailyAvg, setDailyAvg] = useState(0);
  const [spend, setSpend] = useState(500);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStats() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: t } = await supabase.from('transactions').select('*').eq('user_id', user?.id);
      
      const income = t?.filter(x => x.type === 'income').reduce((s, x) => s + Number(x.amount), 0) || 0;
      const expense = t?.filter(x => x.type === 'expense').reduce((s, x) => s + Number(x.amount), 0) || 0;
      const currentBalance = income - expense;
      
      // Using the same Smart Baseline (₹250/day) as the dashboard
      const actualDailyAvg = expense / 30;
      const smartDailyAvg = actualDailyAvg < 50 ? 250 : actualDailyAvg; 

      setBalance(currentBalance);
      setDailyAvg(smartDailyAvg);
      setLoading(false);
    }
    getStats();
  }, []);

  const currentRunway = dailyAvg > 0 ? Math.floor(balance / dailyAvg) : 0;
  const newRunway = dailyAvg > 0 ? Math.floor((balance - spend) / dailyAvg) : 0;
  const impact = currentRunway - newRunway;

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#020617] text-indigo-500 font-black italic animate-pulse">CALIBRATING...</div>;

  return (
    <div className="max-w-3xl space-y-12 pb-20 animate-in fade-in duration-700">
      <div className="space-y-4">
        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase">
          "What if I spend... ?"
        </h1>
        <p className="text-slate-400 font-medium text-lg">Predict the future of your wallet before you swipe.</p>
      </div>

      <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800 shadow-2xl space-y-12 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-10"></div>

        <div className="space-y-8 relative z-10">
          <div className="flex justify-between items-end">
             <span className="text-slate-500 font-black uppercase tracking-widest text-sm">Potential Purchase</span>
             <span className="text-5xl font-black text-indigo-400 tracking-tighter italic">₹{spend.toLocaleString()}</span>
          </div>
          
          <div className="relative group">
            <input 
              type="range" min="0" max="10000" step="100" value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
            />
            <div className="flex justify-between mt-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                <span>Essential</span>
                <span>Luxury</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 bg-slate-950/50 rounded-[2.5rem] border border-slate-800/50 relative">
          <div className="text-center md:text-left">
            <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Runway Before</p>
            <h4 className="text-5xl font-black text-white italic tracking-tighter">{currentRunway} Days</h4>
          </div>
          
          <div className="flex items-center justify-center w-16 h-16 bg-slate-900 rounded-full border border-slate-800 shadow-xl">
             <ArrowRight className="text-indigo-500" size={32} />
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Runway After</p>
            <h4 className={`text-5xl font-black italic tracking-tighter ${newRunway < currentRunway * 0.5 ? 'text-rose-500' : 'text-emerald-400'}`}>
                {newRunway > 0 ? newRunway : 0} Days
            </h4>
          </div>
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/20 p-8 rounded-[2rem] flex items-start gap-6">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center shrink-0">
            <Zap className="text-indigo-400 fill-current" size={24} />
          </div>
          <div>
            <p className="text-indigo-100 font-bold text-lg leading-snug">
               This purchase will cost you <span className="text-white font-black underline decoration-indigo-500 underline-offset-4">{impact > 0 ? impact : 0} days</span> of financial survival.
            </p>
            <p className="text-indigo-300/60 text-sm font-bold uppercase tracking-tight mt-2">
                Impact Analysis: {impact > 10 ? 'High Burn Risk' : 'Sustainable Outflow'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}