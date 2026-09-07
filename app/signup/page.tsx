"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Zap, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl mb-6 shadow-2xl shadow-indigo-500/20">
          <Zap className="text-white fill-current" size={28} />
        </div>
        <h2 className="text-4xl font-black text-white tracking-tighter italic">Create Account</h2>
        <p className="mt-3 text-sm text-slate-400 font-medium">
          Already a member?{' '}
          <Link href="/login" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Log in here</Link>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900/50 backdrop-blur-xl py-10 px-6 shadow-2xl sm:rounded-[2.5rem] sm:px-10 border border-slate-800">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">College Email</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
                placeholder="name@university.edu"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Create Password</label>
              <input
                type="password"
                required
                className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
                placeholder="Choose a strong one"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-rose-400 text-xs font-bold bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-5 px-4 rounded-2xl shadow-xl shadow-indigo-500/10 text-lg font-black text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition-all disabled:opacity-50 tracking-tight"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'JOIN CASHLENS'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}