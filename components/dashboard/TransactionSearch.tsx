"use client";
import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function TransactionSearch({ onSearch }: { onSearch: (val: string) => void }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search your spending..." 
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-100 focus:ring-2 focus:ring-blue-600 outline-none font-medium shadow-sm"
        />
      </div>
      <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
        <Filter size={20} />
      </button>
    </div>
  );
}