"use client";
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Bell, Calendar, Plus, Trash2, Loader2 } from 'lucide-react';

export default function RemindersPage() {
  const [reminders, setReminders] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchReminders = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from('reminders').select('*').eq('user_id', user?.id).order('due_date', { ascending: true });
    setReminders(data || []);
  };

  const addReminder = async () => {
    if (!title || !amount) return;
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('reminders').insert({
      user_id: user?.id,
      title,
      amount: parseFloat(amount),
      due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
    });
    setTitle(''); setAmount('');
    await fetchReminders();
    setLoading(false);
  };

  const deleteReminder = async (id: string) => {
    await supabase.from('reminders').delete().eq('id', id);
    fetchReminders();
  };

  useEffect(() => { fetchReminders(); }, []);

  return (
    <div className="max-w-4xl space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Upcoming Bills</h1>
        
        <div className="flex gap-3 w-full md:w-auto">
           <input 
            placeholder="e.g. Hostel Fee" value={title} onChange={e => setTitle(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none flex-1"
           />
           <input 
            placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none w-28"
           />
           <button 
            onClick={addReminder} disabled={loading}
            className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
           >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {reminders.length === 0 ? (
          <div className="p-20 text-center bg-slate-900/30 rounded-[3rem] border-2 border-dashed border-slate-800 text-slate-500">
            <Bell size={48} className="mx-auto mb-4 opacity-10" />
            <p className="font-black italic text-lg uppercase tracking-tight">The radar is clear. No bills detected.</p>
          </div>
        ) : (
          reminders.map(r => (
            <div key={r.id} className="bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800 flex items-center justify-between hover:border-indigo-500/50 transition-all group">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center">
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 className="font-black text-white text-lg italic uppercase">{r.title}</h4>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Due: {new Date(r.due_date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-2xl font-black text-white tracking-tighter">₹{r.amount}</p>
                  <button className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-emerald-300 transition-colors">Mark as Paid</button>
                </div>
                <button onClick={() => deleteReminder(r.id)} className="p-3 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}