"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function SimulatorPage() {
  const [balance, setBalance] = useState(0);
  const [dailyAvg, setDailyAvg] = useState(0);
  const [spend, setSpend] = useState(500);

  useEffect(() => {
    async function getStats() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: t } = await supabase.from('transactions').select('*').eq('user_id', user?.id);
      const income = t?.filter(x => x.type === 'income').reduce((s, x) => s + Number(x.amount), 0) || 0;
      const expense = t?.filter(x => x.type === 'expense').reduce((s, x) => s + Number(x.amount), 0) || 0;
      setBalance(income - expense);
      setDailyAvg((expense / 30) || 1);
    }
    getStats();
  }, []);

  const currentRunway = Math.floor(balance / dailyAvg);
  const newRunway = Math.floor((balance - spend) / dailyAvg);

  return (
    <div className="max-w-2xl space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-slate-900 italic">"What if I spend...?"</h1>
        <p className="text-slate-500">Slide to see how a purchase affects your financial future.</p>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-10">
        <div className="space-y-6">
          <div className="flex justify-between font-bold text-2xl">
             <span className="text-slate-400">Amount</span>
             <span className="text-blue-600">₹{spend}</span>
          </div>
          <input 
            type="range" min="0" max="5000" step="100" value={spend}
            onChange={(e) => setSpend(Number(e.target.value))}
            className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="flex items-center justify-between gap-4 p-8 bg-slate-50 rounded-[2rem]">
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Before</p>
            <h4 className="text-3xl font-black text-slate-900">{currentRunway} Days</h4>
          </div>
          <ArrowRight className="text-slate-300" size={32} />
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2">After</p>
            <h4 className={`text-3xl font-black ${newRunway < currentRunway ? 'text-rose-500' : 'text-slate-900'}`}>{newRunway} Days</h4>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl flex items-start gap-4">
          <Sparkles className="text-blue-600 shrink-0" />
          <p className="text-blue-700 font-medium">This purchase will cost you <span className="font-bold">{currentRunway - newRunway} days</span> of financial survival. Is it worth it?</p>
        </div>
      </div>
    </div>
  );
}