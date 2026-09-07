"use client";
import React, { useState } from 'react';
import { CheckCircle2, Circle, Coins, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Log today's expenses", completed: false, reward: 10 },
    { id: 2, text: "Check your financial runway", completed: false, reward: 5 },
    { id: 3, text: "Review weekly analytics", completed: false, reward: 15 },
  ]);
  const [credits, setCredits] = useState(120);

  const completeTask = (id: number, reward: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: true } : t));
    setCredits(prev => prev + reward);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Daily Tasks</h1>
          <p className="text-slate-500">Stay aware to earn credits.</p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-400 px-5 py-3 rounded-2xl font-black text-white shadow-lg shadow-yellow-100">
          <Coins size={20} />
          <span>{credits}</span>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <button 
            key={task.id}
            disabled={task.completed}
            onClick={() => completeTask(task.id, task.reward)}
            className={`w-full p-6 rounded-3xl border flex items-center justify-between transition-all ${task.completed ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 hover:border-blue-200'}`}
          >
            <div className="flex items-center gap-4">
              {task.completed ? <CheckCircle2 className="text-emerald-500" /> : <Circle className="text-slate-300" />}
              <span className={`font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>{task.text}</span>
            </div>
            <span className="font-black text-yellow-500">+{task.reward}</span>
          </button>
        ))}
      </div>

      <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
        <h3 className="font-bold flex items-center gap-2 mb-4">
          <Lock size={18} className="text-blue-400" /> Unlock Advanced AI Suggestion
        </h3>
        <p className="text-slate-400 text-sm mb-6">Spend 200 credits to unlock a deep analysis of your weekend spending habits.</p>
        <button className="w-full py-4 bg-blue-600 rounded-2xl font-bold opacity-50 cursor-not-allowed">Insufficient Credits</button>
      </div>
    </div>
  );
}