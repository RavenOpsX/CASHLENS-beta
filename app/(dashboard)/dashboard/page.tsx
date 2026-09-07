"use client";
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Plus, ArrowUpRight, ArrowDownRight, Timer, Wallet, Sparkles, TrendingUp } from 'lucide-react';
import AddTransactionModal from '@/components/dashboard/AddTransactionModal';
import Insights from '@/components/dashboard/Insights';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

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
    const demoData = [
      { user_id: user.id, amount: 12000, category: 'Pocket Money', type: 'income', description: 'Monthly Allowance' },
      { user_id: user.id, amount: 450, category: 'Food', type: 'expense', description: 'Canteen Feast' },
      { user_id: user.id, amount: 120, category: 'Transport', type: 'expense', description: 'Auto Fare' },
    ];
    await supabase.from('transactions').insert(demoData);
    window.location.reload(); 
  };

  useEffect(() => { fetchData(); }, []);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = totalIncome - totalExpenses;
  const runway = (totalExpenses / 30) > 0 ? Math.floor(balance / (totalExpenses / 30)) : 0;

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#020617] text-indigo-500 font-black text-2xl animate-pulse italic">CASHLENS...</div>;

  return (
    <motion.div 
      variants={container} initial="hidden" animate="show"
      className="space-y-10 pb-20"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div variants={item}>
          <h1 className="text-5xl font-black text-white tracking-tighter italic mb-2">
            Hey, {profile?.full_name?.split(' ')[0] || 'Raven'}!
          </h1>
          <p className="text-slate-400 font-medium text-lg">Your financial survival kit is ready.</p>
        </motion.div>
        
        <motion.div variants={item} className="flex gap-4">
          <button onClick={injectDemoData} className="px-6 py-3 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-all border border-slate-700 flex items-center gap-2">
            <Sparkles size={18} /> Demo
          </button>
          <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2">
            <Plus size={20} strokeWidth={3} /> NEW ENTRY
          </button>
        </motion.div>
      </div>

      {/* Grid Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Balance', val: `₹${balance}`, icon: Wallet, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
          { label: 'Runway', val: `${runway} Days`, icon: Timer, color: 'text-amber-400', bg: 'bg-amber-400/10', highlight: true },
          { label: 'Inflow', val: `₹${totalIncome}`, icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Outflow', val: `₹${totalExpenses}`, icon: ArrowDownRight, color: 'text-rose-400', bg: 'bg-rose-400/10' },
        ].map((card, i) => (
          <motion.div 
            key={i} variants={item}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-8 rounded-[2.5rem] border ${card.highlight ? 'bg-indigo-600 border-indigo-500 shadow-2xl shadow-indigo-500/20' : 'bg-slate-900/50 border-slate-800'} relative overflow-hidden`}
          >
            <card.icon className={`${card.highlight ? 'text-white' : card.color} mb-4`} size={32} />
            <p className={`text-xs font-black uppercase tracking-widest ${card.highlight ? 'text-indigo-200' : 'text-slate-500'}`}>{card.label}</p>
            <h3 className={`text-3xl font-black mt-1 ${card.highlight ? 'text-white' : 'text-white'}`}>{card.val}</h3>
          </motion.div>
        ))}
      </div>

      {/* Analytics & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-2 space-y-8">
          <Insights transactions={transactions} profile={profile} />
          
          <div className="p-8 rounded-[3rem] bg-slate-900/50 border border-slate-800">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-white italic">Recent Movements</h3>
              <TrendingUp className="text-slate-600" />
            </div>
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <p className="text-slate-500 py-10 text-center font-bold">No movements detected yet...</p>
              ) : (
                transactions.map((t) => (
                  <motion.div 
                    key={t.id} whileHover={{ x: 10 }}
                    className="flex items-center justify-between p-5 bg-slate-800/30 rounded-3xl border border-slate-800/50 hover:border-indigo-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {t.category.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg group-hover:text-indigo-400 transition-colors">{t.description || t.category}</p>
                        <p className="text-xs text-slate-500 font-black uppercase tracking-widest">{t.category}</p>
                      </div>
                    </div>
                    <p className={`text-2xl font-black ${t.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                      {t.type === 'income' ? '+' : '-'}₹{t.amount}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="space-y-6">
           <div className="p-8 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-2xl">
              <h3 className="text-2xl font-black italic mb-2">Pro Tip</h3>
              <p className="text-indigo-100 font-medium">Your current runway is healthy. Consider putting ₹1,000 into your "Emergency" stash.</p>
           </div>
           <div className="p-8 rounded-[3rem] bg-slate-900/50 border border-slate-800">
              <h3 className="text-xl font-black text-white italic mb-6">Streaks</h3>
              <div className="flex items-center gap-4">
                 <div className="text-5xl">🔥</div>
                 <div>
                    <h4 className="text-2xl font-black text-white">7 Days</h4>
                    <p className="text-slate-500 text-sm font-bold">AWARENESS STREAK</p>
                 </div>
              </div>
           </div>
        </motion.div>
      </div>

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchData} />
    </motion.div>
  );
}