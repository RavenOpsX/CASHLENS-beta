"use client";
import React from 'react';
import { Award, Flame, Star, Target, ShieldCheck } from 'lucide-react';

export default function AchievementsPage() {
  const badges = [
    { title: 'Survivor', desc: 'Maintained a 7-day streak', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50', locked: false },
    { title: 'Budget King', desc: 'Saved 20% of monthly income', icon: Award, color: 'text-blue-500', bg: 'bg-blue-50', locked: false },
    { title: 'Data Explorer', desc: 'Checked analytics 10 times', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50', locked: true },
    { title: 'Consistent', desc: 'Logged 50 expenses', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50', locked: true },
  ];

  return (
    <div className="space-y-10">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-10 rounded-[3rem] text-white">
        <h1 className="text-3xl font-bold">Your Progress</h1>
        <p className="opacity-80 mt-2">Level 3: Awareness Explorer</p>
        <div className="mt-8 bg-white/20 h-3 rounded-full overflow-hidden">
          <div className="bg-white h-full w-2/3 shadow-glow"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((b, i) => (
          <div key={i} className={`p-8 rounded-[2.5rem] border ${b.locked ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 shadow-sm'} flex flex-col items-center text-center`}>
            <div className={`w-16 h-16 ${b.bg} ${b.color} rounded-3xl flex items-center justify-center mb-6`}>
              <b.icon size={32} />
            </div>
            <h4 className="font-black text-slate-900 uppercase tracking-tight">{b.title}</h4>
            <p className="text-sm text-slate-500 mt-2">{b.desc}</p>
            {b.locked && <ShieldCheck size={16} className="mt-4 text-slate-300" />}
          </div>
        ))}
      </div>
    </div>
  );
}