"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, ArrowUpRight, ArrowDownRight, Timer, Wallet } from 'lucide-react';
import AddTransactionModal from '@/components/dashboard/AddTransactionModal';
import Insights from '@/components/dashboard/Insights'; // Import the Insights component

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // 1. Get Profile Info
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(p);

      // 2. Get Transactions
      const { data: t } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      setTransactions(t || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // MATH ENGINE
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = totalIncome - totalExpenses;
  
  // RUNWAY CALCULATION
  const dailyAvg = totalExpenses / 30; 
  const runway = dailyAvg > 0 ? Math.floor(balance / dailyAvg) : 0;

  if (loading) return <div className="p-10 text-slate-500 font-medium animate-pulse text-center">Focusing your lens...</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight italic">
            Welcome, {profile?.full_name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-slate-500">Your financial awareness dashboard.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
        >
          <Plus size={20} strokeWidth={3} />
          New Entry
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <Wallet className="text-blue-600 mb-4" size={24} />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Balance</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">₹{balance.toLocaleString()}</h3>
        </div>

        <div className="bg-slate-900 p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
          <Timer className="text-white opacity-50 mb-4" size={24} />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Runway</p>
          <h3 className="text-3xl font-black text-white mt-1">{runway > 0 ? `${runway} Days` : 'N/A'}</h3>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-600 rounded-full blur-[50px] opacity-40"></div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <ArrowUpRight className="text-emerald-500 mb-4" size={24} />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Income</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-1">₹{totalIncome.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <ArrowDownRight className="text-rose-500 mb-4" size={24} />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Expenses</p>
          <h3 className="text-3xl font-black text-rose-600 mt-1">₹{totalExpenses.toLocaleString()}</h3>
        </div>
      </div>

      {/* Insights Section */}
      <Insights transactions={transactions} profile={profile} />

      {/* Recent Activity List */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-10 text-slate-400 font-medium">Add a transaction to get started.</div>
          ) : (
            transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {t.category.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{t.description || t.category}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">{t.category}</p>
                  </div>
                </div>
                <p className={`text-lg font-black ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{Number(t.amount).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />
    </div>
  );
}