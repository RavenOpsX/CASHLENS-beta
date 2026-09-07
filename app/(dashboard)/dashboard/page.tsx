"use client";
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
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

      const { data: t } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      setTransactions(t || []);
    }
    setLoading(false);
  };

  // THE DEMO INJECTOR (Fills the empty space for your Jury)
  const injectDemoData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const demoData = [
      { user_id: user.id, amount: 15000, category: 'Salary', type: 'income', description: 'Monthly Allowance' },
      { user_id: user.id, amount: 120, category: 'Food', type: 'expense', description: 'Chai & Samosa' },
      { user_id: user.id, amount: 800, category: 'Food', type: 'expense', description: 'Dinner at Satish Canteen' },
      { user_id: user.id, amount: 500, category: 'Transport', type: 'expense', description: 'Auto Rickshaw fare' },
      { user_id: user.id, amount: 2000, category: 'Shopping', type: 'expense', description: 'New Sneakers' },
      { user_id: user.id, amount: 300, category: 'Entertainment', type: 'expense', description: 'Movie Ticket' },
    ];

    await supabase.from('transactions').insert(demoData);
    alert("Demo data injected! Focusing your lens...");
    window.location.reload(); 
  };

  useEffect(() => { fetchData(); }, []);

  // MATH ENGINE
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = totalIncome - totalExpenses;
  
  // RUNWAY CALCULATION (Based on last 30 days)
  const dailyAvg = totalExpenses / 30; 
  const runway = dailyAvg > 0 ? Math.floor(balance / dailyAvg) : 0;

  if (loading) return <div className="p-10 text-slate-900 font-bold animate-pulse text-center">Focusing your lens...</div>;

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Header with Demo Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">
            Welcome, {profile?.full_name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-slate-600 font-medium">Your financial lens is sharp and focused.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={injectDemoData}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all"
          >
            <Sparkles size={16} /> Load Demo
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-200"
          >
            <Plus size={20} strokeWidth={3} />
            New Entry
          </button>
        </div>
      </div>

      {/* 2. Summary Cards (Higher Contrast) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-7 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <Wallet className="text-blue-600 mb-4" size={28} />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Available Balance</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">₹{balance.toLocaleString()}</h3>
        </div>

        <div className="bg-slate-900 p-7 rounded-[2rem] shadow-2xl relative overflow-hidden border-2 border-slate-800">
          <Timer className="text-blue-400 mb-4" size={28} />
          <p className="text-xs font-black text-blue-300/60 uppercase tracking-widest">Est. Survival Runway</p>
          <h3 className="text-3xl font-black text-white mt-1">{runway > 0 ? `${runway} Days` : 'N/A'}</h3>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-600 rounded-full blur-[50px] opacity-30"></div>
        </div>

        <div className="bg-white p-7 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <ArrowUpRight className="text-emerald-600 mb-4" size={28} />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Inflow</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-1">₹{totalIncome.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-7 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <ArrowDownRight className="text-rose-600 mb-4" size={28} />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Outflow</p>
          <h3 className="text-3xl font-black text-rose-600 mt-1">₹{totalExpenses.toLocaleString()}</h3>
        </div>
      </div>

      {/* 3. Insights (Logic-based suggestions) */}
      <Insights transactions={transactions} profile={profile} />

      {/* 4. Recent Activity (Better List Design) */}
      <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Activity</h3>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Sorted by Latest</span>
        </div>
        
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-[2rem]">
              <p className="text-slate-400 font-bold italic text-lg">The lens is blurry. Add your first entry to see clearly.</p>
            </div>
          ) : (
            transactions.map((t) => (
              <div 
                key={t.id} 
                className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl hover:border-blue-500 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${
                    t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {t.category.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                      {t.description || t.category}
                    </p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-black opacity-70">
                      {t.category} • {new Date(t.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-black ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {t.type === 'income' ? '+' : '-'}₹{Number(t.amount).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />
    </div>
  );
}