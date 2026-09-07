"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Bell, Calendar, Plus } from 'lucide-react';

export default function RemindersPage() {
  const [reminders, setReminders] = useState<any[]>([]);

  useEffect(() => {
    async function fetchReminders() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase.from('reminders').select('*').eq('user_id', user?.id);
      setReminders(data || []);
    }
    fetchReminders();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Upcoming Bills</h1>
        <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all">
          <Plus size={20} />
        </button>
      </div>

      <div className="grid gap-4">
        {reminders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-100 text-slate-400">
            <Bell size={40} className="mx-auto mb-4 opacity-20" />
            <p>No reminders set. Add your hostel or mess fees!</p>
          </div>
        ) : (
          reminders.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{r.title}</h4>
                  <p className="text-sm text-slate-500">Due: {new Date(r.due_date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-slate-900">₹{r.amount}</p>
                <button className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">Mark Paid</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}