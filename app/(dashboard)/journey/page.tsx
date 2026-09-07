"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Flag, Coffee, TrendingDown, CheckCircle } from 'lucide-react';

export default function JourneyPage() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    async function getJourney() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase.from('transactions').select('*').eq('user_id', user?.id).order('date', { ascending: true });
      setTransactions(data || []);
    }
    getJourney();
  }, []);

  return (
    <div className="max-w-xl mx-auto py-10 relative">
      <h1 className="text-4xl font-black text-slate-900 mb-12 italic text-center">Your Money Journey</h1>
      
      {/* The Vertical Line */}
      <div className="absolute left-1/2 top-32 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full" />

      <div className="space-y-24 relative">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex justify-center">
          <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg">The Start</div>
        </motion.div>

        {transactions.map((t, i) => (
          <motion.div 
            key={t.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center w-full ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}
          >
            <div className="w-1/2 px-8">
              <div className={`p-6 rounded-[2rem] border shadow-sm ${t.type === 'income' ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100'}`}>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">{new Date(t.date).toLocaleDateString()}</p>
                <h4 className="font-bold text-slate-900">{t.description || t.category}</h4>
                <p className={`font-black text-lg ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{t.amount}
                </p>
              </div>
            </div>
            {/* The Dot on the line */}
            <div className="w-4 h-4 bg-white border-4 border-blue-600 rounded-full z-10 absolute left-1/2 -translate-x-1/2" />
            <div className="w-1/2" />
          </motion.div>
        ))}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex justify-center pb-20">
          <div className="bg-slate-900 text-white p-4 rounded-3xl flex items-center gap-3 shadow-xl">
             <Flag size={20} />
             <span className="font-bold italic">Keep Moving Forward</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}