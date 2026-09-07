"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, ArrowRight, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      {/* 1. NAV */}
      <nav className="flex items-center justify-between px-8 py-8 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap size={22} className="text-white fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tighter italic">CashLens</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/login" className="font-bold text-slate-400 hover:text-white transition-colors">Login</Link>
          <Link href="/signup" className="px-6 py-3 bg-white text-black rounded-2xl font-black hover:bg-indigo-400 hover:text-white transition-all shadow-xl shadow-white/5">Get Started</Link>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="pt-20 pb-32 px-6 max-w-5xl mx-auto text-center relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black mb-8 tracking-widest"
        >
          V1.0 STEALTH PROTOTYPE
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] italic"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Master your <span className="text-indigo-500">outflow.</span> <br />
          Extend your <span className="text-emerald-400 underline decoration-emerald-400/30">runway.</span>
        </motion.h1>

        <motion.p 
          className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          The financial awareness platform designed for the student hustle. 
          Stop guessing. Start knowing.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/signup" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-500 shadow-2xl shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 group">
            Launch Your Journey <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>

        {/* Decorative Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10"></div>
      </section>

      {/* 3. BENTO FEATURES */}
      <section className="py-32 px-6 relative border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: BarChart3, title: 'Visual Runway', desc: 'Real-time survival estimates based on your daily burn rate.', color: 'text-indigo-400' },
            { icon: MousePointer2, title: 'Impact Simulator', desc: 'See the future impact of a purchase before you tap the card.', color: 'text-emerald-400' },
            { icon: Shield, title: 'Zero Data Mining', desc: 'No bank logins required. Your financial awareness is private.', color: 'text-rose-400' }
          ].map((feat, i) => (
            <motion.div 
              key={i} {...fadeIn} transition={{ delay: i * 0.2 }}
              className="p-10 bg-slate-900/50 border border-slate-800 rounded-[3rem] hover:border-indigo-500/50 transition-all group"
            >
              <feat.icon size={32} className={`${feat.color} mb-6 group-hover:scale-110 transition-transform`} />
              <h3 className="text-2xl font-black mb-4 italic uppercase tracking-tighter">{feat.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}