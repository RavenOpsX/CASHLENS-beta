"use client";
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { BarChart2, PieChart as PieIcon } from 'lucide-react';

export default function AnalyticsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: t } = await supabase.from('transactions').select('*').eq('user_id', user?.id);
      
      const categoryMap = t?.reduce((acc: any, curr: any) => {
        if (curr.type === 'expense') {
          acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
        }
        return acc;
      }, {});

      const chartData = Object.keys(categoryMap || {}).map(key => ({ name: key, value: categoryMap[key] }));
      setData(chartData);
      setLoading(false);
    }
    fetchAnalytics();
  }, []);

  const COLORS = ['#6366f1', '#10B981', '#F43F5E', '#F59E0B', '#8B5CF6', '#EC4899'];

  if (loading) return <div className="p-10 text-indigo-500 font-black animate-pulse italic">SCANNING PATTERNS...</div>;

  return (
    <div className="space-y-10 pb-20">
      <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Spending Analysis</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart Card */}
        <div className="bg-slate-900/50 p-8 rounded-[3rem] border border-slate-800 shadow-2xl h-[450px] flex flex-col">
          <h3 className="font-black mb-8 text-slate-500 uppercase text-xs tracking-widest">Expense by Category</h3>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} stroke="#94a3b8" />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                  contentStyle={{backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b', color: '#fff'}} 
                />
                <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
                  {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
               <BarChart2 size={48} className="opacity-20 mb-4" />
               <p className="font-black italic uppercase tracking-tighter">Insufficient Data for Mapping</p>
            </div>
          )}
        </div>

        {/* Pie Chart Card */}
        <div className="bg-slate-900/50 p-8 rounded-[3rem] border border-slate-800 shadow-2xl flex flex-col min-h-[450px]">
           <h3 className="w-full font-black mb-8 text-slate-500 uppercase text-xs tracking-widest text-left">Distribution</h3>
           {data.length > 0 ? (
             <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie data={data} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                  {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b'}} />
              </PieChart>
            </ResponsiveContainer>
           ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
               <PieIcon size={48} className="opacity-20 mb-4" />
               <p className="font-black italic uppercase tracking-tighter">No Expense Patterns Found</p>
            </div>
           )}
        </div>
      </div>
    </div>
  );
}