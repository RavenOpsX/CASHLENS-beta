"use client";
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Plus, ArrowUpRight, ArrowDownRight, Timer, Wallet, Sparkles } from 'lucide-react';
import AddTransactionModal from '@/components/dashboard/AddTransactionModal';
import Insights from '@/components/dashboard/Insights';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(p);
      const { data: t } = await supabase.from('transactions').select('*').eq('user_id', user.id).order('date', { ascending: false });
      setTransactions(t || []);
    }
    setLoading(false);
  };

  const injectDemoData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    // Create a spread of transactions over the last 10 days to make charts look good
    const demoData = [
      { user_id: user.id, amount: 15000, category: 'Salary', type: 'income', description: 'Monthly Allowance', date: new Date(Date.now() - 10 * 86400000).toISOString() },
      { user_id: user.id, amount: 150, category: 'Food', type: 'expense', description: 'Chai & Maggi', date: new Date(Date.now() - 5 * 86400000).toISOString() },
      { user_id: user.id, amount: 800, category: 'Education', type: 'expense', description: 'Exam Fees', date: new Date(Date.now() - 4 * 86400000).toISOString() },
      { user_id: user.id, amount: 450, category: 'Food', type: 'expense', description: 'Canteen Lunch', date: new Date(Date.now() - 3 * 86400000).toISOString() },
      { user_id: user.id, amount: 1200, category: 'Shopping', type: 'expense', description: 'New Bag', date: new Date(Date.now() - 2 * 86400000).toISOString() },
      { user_id: user.id, amount: 100, category: 'Transport', type: 'expense', description: 'Rickshaw', date: new Date(Date.now() - 1 * 86400000).toISOString() },
    ];

    await supabase.from('transactions').insert(demoData);
    alert("Simulation Active: Demo data injected.");
    window.location.reload(); 
  };

  useEffect(() => { fetchData(); }, []);

  // SMART MATH ENGINE
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = totalIncome - totalExpenses;
  
  // LOGIC: If expenses are too low, assume a minimum burn rate of ₹250/day
  const actualDailyAvg = totalExpenses / 30;
  const smartDailyAvg = actualDailyAvg < 50 ? 250 : actualDailyAvg; 
  const runway = smartDailyAvg > 0 ? Math.floor(balance / smartDailyAvg) : 0;

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#020617] text-indigo-500 font-black italic animate-pulse">CASHLENS...</div>;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic mb-2">
            Hey, {profile?.full_name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-slate-400 font-medium text-lg">Your financial survival kit is ready.</p>
        </div>
        
        <div className="flex gap-4">
          <button onClick={injectDemoData} className="px-6 py-3 bg-slate-900 text-indigo-400 rounded-2xl font-bold hover:bg-slate-800 transition-all border border-indigo-500/20 flex items-center gap-2">
            <Sparkles size={18} /> LOAD DEMO
          </button>
          <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2 tracking-tighter">
            <Plus size={20} strokeWidth={3} /> NEW ENTRY
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800">
          <Wallet className="text-indigo-400 mb-4" size={32} />
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Balance</p>
          <h3 className="text-3xl font-black text-white mt-1">₹{balance.toLocaleString()}</h3>
        </div>

        <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
          <Timer className="text-white mb-4" size={32} />
          <p className="text-xs font-black text-indigo-200 uppercase tracking-widest">Est. Runway</p>
          <h3 className="text-3xl font-black text-white mt-1">{runway} Days</h3>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white rounded-full blur-[50px] opacity-20"></div>
        </div>

        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 text-emerald-400">
          <ArrowUpRight className="mb-4" size={32} />
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Inflow</p>
          <h3 className="text-3xl font-black mt-1">₹{totalIncome.toLocaleString()}</h3>
        </div>

        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 text-rose-400">
          <ArrowDownRight className="mb-4" size={32} />
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Outflow</p>
          <h3 className="text-3xl font-black mt-1">₹{totalExpenses.toLocaleString()}</h3>
        </div>
      </div>

      <Insights transactions={transactions} profile={profile} />

      <div className="p-8 rounded-[3rem] bg-slate-900/50 border border-slate-800">
        <h3 className="text-xl font-black text-white italic mb-8 uppercase tracking-tighter">Recent Movements</h3>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-slate-600 text-center py-10 font-bold italic">No data detected.</p>
          ) : (
            transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-5 bg-slate-800/30 rounded-3xl border border-slate-800/50 hover:border-indigo-500/50 transition-all">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {t.category.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{t.description || t.category}</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className={`text-2xl font-black ${t.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{t.amount}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchData} />
    </div>
  );
}