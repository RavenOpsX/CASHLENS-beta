"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, IndianRupee, Tag, AlignLeft, PlusCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTransactionModal({ isOpen, onClose, onSuccess }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');

  const categories = type === 'expense' 
    ? ['Food', 'Transport', 'Education', 'Entertainment', 'Shopping', 'Health', 'Other']
    : ['Pocket Money', 'Salary', 'Scholarship', 'Gift', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          amount: parseFloat(amount),
          type: type,
          category: category,
          description: description,
          date: new Date().toISOString(),
        });

      if (!error) {
        onSuccess();
        onClose();
        // Reset form
        setAmount('');
        setDescription('');
      } else {
        alert("Error saving: " + error.message);
      }
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">New Entry</h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Toggle Switch */}
              <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
                <button 
                  onClick={() => setType('expense')}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'}`}
                >
                  Expense
                </button>
                <button 
                  onClick={() => setType('income')}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
                >
                  Income
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount */}
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-2 ml-1">Amount</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="number" required placeholder="0.00"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                      value={amount} onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-2 ml-1">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <select 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none appearance-none"
                      value={category} onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-2 ml-1">Note (Optional)</label>
                  <div className="relative">
                    <AlignLeft className="absolute left-4 top-4 text-slate-400" size={20} />
                    <textarea 
                      placeholder="What was this for?"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-medium text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none min-h-[100px]"
                      value={description} onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  disabled={loading}
                  className={`w-full py-5 rounded-2xl text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                    type === 'expense' ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-100' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100'
                  }`}
                >
                  <PlusCircle size={22} />
                  {loading ? 'Saving...' : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}