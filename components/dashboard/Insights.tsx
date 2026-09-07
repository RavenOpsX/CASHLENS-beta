"use client";
import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';

export default function Insights({ transactions, profile }: { transactions: any[], profile: any }) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const total = expenses.reduce((sum, t) => sum + Number(t.amount), 0);
  
  // Logic: Check if Food is more than 40% of spending
  const foodSpending = expenses.filter(t => t.category === 'Food').reduce((sum, t) => sum + Number(t.amount), 0);
  const foodRatio = foodSpending / (total || 1);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900">Personalized Insights</h3>
      
      {foodRatio > 0.4 && (
        <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100 flex gap-4">
          <AlertCircle className="text-orange-500 shrink-0" />
          <div>
            <p className="font-bold text-orange-900 text-sm italic">Food Alert</p>
            <p className="text-orange-700 text-sm">You've spent {(foodRatio * 100).toFixed(0)}% of your money on food. Try checking for student discounts at the canteen!</p>
          </div>
        </div>
      )}

      <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
        <Lightbulb className="text-blue-500 shrink-0" />
        <div>
          <p className="font-bold text-blue-900 text-sm italic">Smart Tip</p>
          <p className="text-blue-700 text-sm">Your goal is "{profile?.financial_goal}". Based on your balance, you're on track!</p>
        </div>
      </div>
    </div>
  );
}