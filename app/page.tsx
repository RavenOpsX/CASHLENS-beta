"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, ArrowRight, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

// This is a "Helper" to make animations easier to reuse
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap size={20} className="text-white fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight">CashLens</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2 font-medium text-slate-600 hover:text-slate-900 transition-colors">Login</Link>
          <Link href="/login" className="px-5 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all">Get Started</Link>
        </div>
      </nav>

      {/* 2. HERO SECTION (The "Hook") */}
      <section className="pt-20 pb-32 px-6 max-w-5xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          V1.0 PROTOTYPE FOR STUDENTS
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          See where your <span className="text-blue-600">money goes.</span> <br />
          See how long it <span className="text-emerald-500">can last.</span>
        </motion.h1>

        <motion.p 
          className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          CashLens helps you understand spending patterns, estimate your financial runway, and make smarter decisions before you buy.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center gap-2 group">
            Start Your Journey <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
            Watch Demo
          </button>
        </motion.div>
      </section>

      {/* 3. SCROLL-ANIMATED FEATURES (The "Forward Motion") */}
      <section className="py-32 bg-slate-50 border-y border-slate-200 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Built for the Student Hustle</h2>
            <p className="text-slate-500">Everything you need to survive the month on a budget.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              {...fadeIn} 
              transition={{ delay: 0.2 }}
              className="p-8 bg-white rounded-3xl border border-slate-200 hover:border-blue-300 transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Financial Runway</h3>
              <p className="text-slate-500 leading-relaxed">Don't just see a balance. Know exactly how many days your money will last based on your habits.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              {...fadeIn} 
              transition={{ delay: 0.4 }}
              className="p-8 bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 transition-colors group"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MousePointer2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Purchase Simulator</h3>
              <p className="text-slate-500 leading-relaxed">Planning a ₹500 treat? See how it affects your month before you swipe. No more "End-of-Month" surprises.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              {...fadeIn} 
              transition={{ delay: 0.6 }}
              className="p-8 bg-white rounded-3xl border border-slate-200 hover:border-orange-300 transition-colors group"
            >
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-slate-500 leading-relaxed">We don't want your bank login. Just your awareness. Your data is encrypted and yours alone.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA SECTION */}
      <section className="py-32 px-6 text-center">
        <motion.div {...fadeIn} className="max-w-3xl mx-auto p-12 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to see clearly?</h2>
            <p className="text-slate-400 mb-10 text-lg">Join other students managing their money with CashLens.</p>
            <Link href="/login" className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all inline-block">
              Create Your Free Account
            </Link>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-20"></div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-sm">
        © 2024 CashLens Prototype • DTIE Project • Built with Awareness
      </footer>
    </div>
  );
}