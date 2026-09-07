"use client";
import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import Sidebar from './Sidebar';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-100 p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Zap className="text-blue-600 fill-current" size={24} />
        <span className="font-bold text-slate-900">CashLens</span>
      </div>
      
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-[65px] left-0 w-full h-screen bg-white animate-in slide-in-from-top duration-300">
          <Sidebar />
        </div>
      )}
    </div>
  );
}