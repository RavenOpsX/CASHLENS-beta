"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

export default function AnalyticsPage() {
  const [data, setData] = useState<any[]>([]);

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
    }
    fetchAnalytics();
  }, []);

  const COLORS = ['#2563EB', '#10B981', '#F43F5E', '#F59E0B', '#8B5CF6', '#EC4899'];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Spending Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-[400px]">
          <h3 className="font-bold mb-6 text-slate-500 uppercase text-xs tracking-widest">Expense by Category</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
              <YAxis hide />
              <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
                {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center">
           <h3 className="w-full font-bold mb-6 text-slate-500 uppercase text-xs tracking-widest text-left">Distribution</h3>
           <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} innerRadius={80} outerRadius={100} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}