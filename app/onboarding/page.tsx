"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { ChevronRight, Wallet, Target, Sparkles, Check } from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    income_amount: '',
    income_frequency: 'monthly',
    financial_goal: 'Make money last longer',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleComplete = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Update the profile we created in the SQL step
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.full_name,
          income_frequency: formData.income_frequency,
          financial_goal: formData.financial_goal,
          // We can also store the initial amount as a transaction if we wanted
        });

      if (!error) {
        router.push('/dashboard');
      } else {
        alert("Error saving profile: " + error.message);
        setLoading(false);
      }
    }
  };

  const nextStep = () => setStep(s => s + 1);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-100">
        <motion.div 
          className="h-full bg-blue-600"
          initial={{ width: "0%" }}
          animate={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="max-w-md w-full">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: NAME */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles size={24} />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">First, what should we call you?</h1>
              <p className="text-slate-500">We'll use this to personalize your dashboard.</p>
              <input 
                autoFocus
                className="w-full text-2xl font-bold border-b-2 border-slate-200 focus:border-blue-600 outline-none pb-2 transition-colors text-slate-900 bg-transparent"
                placeholder="Your name"
                value={formData.full_name}
                onChange={(e) => updateField('full_name', e.target.value)}
              />
              <button 
                onClick={nextStep}
                disabled={!formData.full_name}
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all"
              >
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {/* STEP 2: INCOME SOURCE */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <Wallet size={24} />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">How often do you receive money?</h1>
              <p className="text-slate-500">Pocket money, allowance, or job salary.</p>
              
              <div className="grid gap-3">
                {['monthly', 'weekly', 'irregular'].map((freq) => (
                  <button
                    key={freq}
                    onClick={() => { updateField('income_frequency', freq); nextStep(); }}
                    className={`p-4 rounded-2xl border-2 text-left font-bold capitalize transition-all ${
                      formData.income_frequency === freq ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 hover:border-slate-200 text-slate-600'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: FINANCIAL GOAL */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                <Target size={24} />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">What's your main goal?</h1>
              <p className="text-slate-500">We will tailor your insights to help you reach this.</p>
              
              <div className="grid gap-3">
                {[
                  'Make money last longer',
                  'Save for a specific goal',
                  'Control unnecessary spending',
                  'Plan upcoming expenses'
                ].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => { updateField('financial_goal', goal); nextStep(); }}
                    className={`p-4 rounded-2xl border-2 text-left font-bold transition-all ${
                      formData.financial_goal === goal ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 hover:border-slate-200 text-slate-600'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: READY TO GO */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200">
                <Check size={40} strokeWidth={3} />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">You're all set, {formData.full_name.split(' ')[0]}!</h1>
              <p className="text-slate-500 text-lg">Ready to see where your money goes?</p>
              
              <button 
                onClick={handleComplete}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all disabled:opacity-50"
              >
                {loading ? 'Setting up your lens...' : 'Take me to my Dashboard'}
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}