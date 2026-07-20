"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Target, 
  PieChart, 
  Home, 
  Wallet, 
  Settings, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

/* 
========================================================================
DESIGN PLAN - FEATURES SECTION
========================================================================
1. Pastel Gradient Hex Values:
   - Primary soft aurora canvas:
     - Gradient Background: A combined CSS radial gradient overlaying an off-white baseline (#FAF9F6).
     - Pink/Rose blush: #FFF5F3 (at top left - radial-gradient circle 40% depth)
     - Fresh Mint/Teal: #E6F8F6 (at top right - radial-gradient circle 45% depth)
     - Calm Sky/Indigo: #EBF5FF (at center bottom - radial-gradient circle 50% depth)
     - Generates a subtle, high-end flowing atmospheric pastel background.

2. Glowing Badges & Theme Colors:
   - Analytics (TrendingUp):
     - Tile bg: bg-rose-50/80, border: border-rose-100/60
     - Active Glow Shadow: shadow-[0_0_25px_rgba(244,63,94,0.18)]
     - Accent Colors: text-rose-500, stroke: #FB7185
   - Security (ShieldCheck):
     - Tile bg: bg-blue-50/80, border: border-blue-100/60
     - Active Glow Shadow: shadow-[0_0_25px_rgba(59,130,246,0.18)]
     - Accent Colors: text-blue-500, stroke: #60A5FA
   - Budgets (Target):
     - Tile bg: bg-teal-50/80, border: border-teal-100/60
     - Active Glow Shadow: shadow-[0_0_25px_rgba(20,184,166,0.18)]
     - Accent Colors: text-teal-600, stroke: #2DD4BF

3. Connector Line SVG Path Approach:
   - Placed in a container (`h-32 hidden md:block relative w-full`) between the badges row and the dashboard mockup.
   - SVG `viewBox="0 0 1000 128" preserveAspectRatio="none"` allows responsiveness.
   - 3 Curving Cubic Bezier lines drawing in sequence via `motion.path` when scrolled into view:
     - Analytics (Left -> Center-Left of card): 
       `M 200 0 C 200 64, 400 64, 400 128` (Rose gradient, delay: 0.2s)
     - Security (Center -> Center of card): 
       `M 500 0 C 500 64, 500 64, 500 128` (Blue gradient, delay: 0.4s)
     - Budgets (Right -> Center-Right of card): 
       `M 800 0 C 800 64, 600 64, 600 128` (Teal gradient, delay: 0.6s)
   - Each path utilizes duplicate overlapping paths:
     - Underlay stroke: thicker (stroke-6), high-blur, low opacity for physical neon-glow effect.
     - Overlay stroke: thinner (stroke-2.5), solid gradient for bright energy core.
========================================================================
*/

interface SpendingCategory {
  name: string;
  value: number;
  percentage: number;
  color: string;
  hoverColor: string;
  glow: string;
}

export default function FeaturesSection() {
  // Interactive state for the donut chart segment selection
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);
  
  // Hovered state for feature badges (to trigger connection lines glows)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Spending data breakdown
  const spendingData: SpendingCategory[] = [
    { name: 'Housing', value: 956.48, percentage: 40, color: '#3B82F6', hoverColor: '#60A5FA', glow: 'rgba(59,130,246,0.3)' },
    { name: 'Food', value: 597.80, percentage: 25, color: '#FB7185', hoverColor: '#FDA4AF', glow: 'rgba(251,113,133,0.3)' },
    { name: 'Transportation', value: 358.68, percentage: 15, color: '#14B8A6', hoverColor: '#2DD4BF', glow: 'rgba(20,184,166,0.3)' },
    { name: 'Entertainment', value: 286.94, percentage: 12, color: '#8B5CF6', hoverColor: '#A78BFA', glow: 'rgba(139,92,246,0.3)' },
    { name: 'Other', value: 191.30, percentage: 8, color: '#64748B', hoverColor: '#94A3B8', glow: 'rgba(100,116,139,0.3)' },
  ];

  const totalSpent = spendingData.reduce((acc, curr) => acc + curr.value, 0);

  // SVG donut segment calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const badgeVariants = (index: number) => ({
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.3 + index * 0.15
      }
    }
  });

  const linePathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: [0, 1, 1],
      transition: {
        pathLength: { duration: 1.6, ease: "easeInOut", delay },
        opacity: { duration: 0.3, delay }
      }
    })
  };

  return (
    <section 
      id="features"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 15% 25%, #FFF5F3 0%, transparent 45%),
          radial-gradient(circle at 85% 20%, #E6F8F6 0%, transparent 45%),
          radial-gradient(circle at 50% 85%, #EBF5FF 0%, transparent 50%),
          #FAF9F6
        `
      }}
    >
      {/* Smooth transition zone: Fades from Hero's background color (slate-50) down into the features section pastel base */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-slate-50 via-slate-50/80 to-transparent pointer-events-none z-10" />

      {/* Decorative top soft mesh border overlay */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent z-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50/80 border border-blue-100/50 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            Features
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 mb-6"
          >
            Everything you need,<br className="hidden sm:inline" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600">beautifully connected.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 font-sans"
          >
            Say goodbye to fragmented budgeting apps. MoneyTracker syncs, categorizes, and protects your entire financial footprint in one stunning interactive workspace.
          </motion.p>
        </div>

        {/* Dynamic Connected Layout Grid */}
        <div className="relative max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Row of Three Glass badges */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 relative z-20">
            
            {/* Feature 1: Analytics */}
            <motion.div 
              variants={badgeVariants(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              onHoverStart={() => setHoveredFeature(0)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="group bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_48px_rgba(251,113,133,0.12)] transition-all duration-300 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1"
            >
              <div className="relative mb-5 flex items-center justify-center">
                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-rose-400/25 blur-xl rounded-2xl group-hover:bg-rose-400/40 transition-colors duration-300" />
                {/* Tile Icon Box */}
                <div className="relative w-14 h-14 rounded-2xl bg-rose-50/90 border border-rose-100 flex items-center justify-center text-rose-500 shadow-[0_0_20px_rgba(251,113,133,0.15)] group-hover:scale-105 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">Predictive Analytics</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                See where your money goes with AI-powered trend forecasts, cash-flow diagnostics, and predictive insights.
              </p>
            </motion.div>

            {/* Feature 2: Security */}
            <motion.div 
              variants={badgeVariants(1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              onHoverStart={() => setHoveredFeature(1)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="group bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_48px_rgba(59,130,246,0.12)] transition-all duration-300 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1"
            >
              <div className="relative mb-5 flex items-center justify-center">
                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-blue-400/25 blur-xl rounded-2xl group-hover:bg-blue-400/40 transition-colors duration-300" />
                {/* Tile Icon Box */}
                <div className="relative w-14 h-14 rounded-2xl bg-blue-50/90 border border-blue-100 flex items-center justify-center text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:scale-105 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">Bank-Grade Security</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Your credentials and personal information are guarded by AES-256 military encryption and MFA security layers.
              </p>
            </motion.div>

            {/* Feature 3: Budgets */}
            <motion.div 
              variants={badgeVariants(2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              onHoverStart={() => setHoveredFeature(2)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="group bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_48px_rgba(20,184,166,0.12)] transition-all duration-300 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1"
            >
              <div className="relative mb-5 flex items-center justify-center">
                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-teal-400/25 blur-xl rounded-2xl group-hover:bg-teal-400/40 transition-colors duration-300" />
                {/* Tile Icon Box */}
                <div className="relative w-14 h-14 rounded-2xl bg-teal-50/90 border border-teal-100 flex items-center justify-center text-teal-600 shadow-[0_0_20px_rgba(20,184,166,0.15)] group-hover:scale-105 transition-transform duration-300">
                  <Target className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">Smart Budgets</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Flexible limits that adapt dynamically based on actual monthly margins, helping you save automatically.
              </p>
            </motion.div>

          </div>

          {/* SVG Animated Glowing Connector Lines (Desktop Only) */}
          <div className="w-full h-32 hidden md:block relative z-10 overflow-visible pointer-events-none">
            <svg 
              className="absolute inset-0 w-full h-full overflow-visible"
              viewBox="0 0 1000 128" 
              fill="none" 
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Definitions for gorgeous gradients and glowing filter */}
              <defs>
                <linearGradient id="gradient-rose" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FB7185" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradient-teal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
                </linearGradient>
                
                {/* Glow filter */}
                <filter id="svg-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background trace lines - very faint and dark */}
              <path d="M 166 0 C 166 64, 380 64, 380 128" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 500 0 C 500 64, 500 64, 500 128" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 833 0 C 833 64, 620 64, 620 128" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* 1. Analytics glow trace */}
              <motion.path 
                d="M 166 0 C 166 64, 380 64, 380 128" 
                stroke="url(#gradient-rose)" 
                strokeWidth={hoveredFeature === 0 ? "8" : "4.5"}
                strokeOpacity={hoveredFeature === 0 ? "0.35" : "0.15"}
                filter="url(#svg-glow)"
                custom={0.2}
                variants={linePathVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="transition-all duration-300"
              />
              {/* Analytics core energy line */}
              <motion.path 
                d="M 166 0 C 166 64, 380 64, 380 128" 
                stroke="url(#gradient-rose)" 
                strokeWidth={hoveredFeature === 0 ? "3.5" : "2"}
                strokeLinecap="round"
                custom={0.2}
                variants={linePathVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="transition-all duration-300"
              />

              {/* 2. Security glow trace */}
              <motion.path 
                d="M 500 0 C 500 64, 500 64, 500 128" 
                stroke="url(#gradient-blue)" 
                strokeWidth={hoveredFeature === 1 ? "8" : "4.5"}
                strokeOpacity={hoveredFeature === 1 ? "0.35" : "0.15"}
                filter="url(#svg-glow)"
                custom={0.45}
                variants={linePathVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="transition-all duration-300"
              />
              {/* Security core energy line */}
              <motion.path 
                d="M 500 0 C 500 64, 500 64, 500 128" 
                stroke="url(#gradient-blue)" 
                strokeWidth={hoveredFeature === 1 ? "3.5" : "2"}
                strokeLinecap="round"
                custom={0.45}
                variants={linePathVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="transition-all duration-300"
              />

              {/* 3. Budgets glow trace */}
              <motion.path 
                d="M 833 0 C 833 64, 620 64, 620 128" 
                stroke="url(#gradient-teal)" 
                strokeWidth={hoveredFeature === 2 ? "8" : "4.5"}
                strokeOpacity={hoveredFeature === 2 ? "0.35" : "0.15"}
                filter="url(#svg-glow)"
                custom={0.3}
                variants={linePathVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="transition-all duration-300"
              />
              {/* Budgets core energy line */}
              <motion.path 
                d="M 833 0 C 833 64, 620 64, 620 128" 
                stroke="url(#gradient-teal)" 
                strokeWidth={hoveredFeature === 2 ? "3.5" : "2"}
                strokeLinecap="round"
                custom={0.3}
                variants={linePathVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="transition-all duration-300"
              />
            </svg>
          </div>

          {/* Simple connector line spacer for mobile stack */}
          <div className="h-8 md:hidden" />

          {/* Central Glassmorphism Dashboard Mockup Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.5 }}
            className="w-full bg-white/60 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden flex flex-row min-h-[520px]"
          >
            {/* Sidebar Mockup */}
            <div className="w-16 sm:w-20 bg-slate-900/5 border-r border-slate-900/5 py-6 flex flex-col items-center justify-between">
              <div className="flex flex-col items-center gap-6">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                  <DollarSign className="w-5 h-5" />
                </div>
                
                <div className="h-px w-8 bg-slate-900/5 mt-2" />

                {/* Nav Stack */}
                <div className="flex flex-col gap-5 mt-4">
                  <div className="w-10 h-10 rounded-xl bg-white/80 border border-slate-200/50 text-blue-600 flex items-center justify-center shadow-sm">
                    <Home className="w-4 h-4" />
                  </div>
                  <div className="w-10 h-10 rounded-xl text-slate-500 hover:bg-slate-900/5 flex items-center justify-center transition-colors cursor-pointer">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div className="w-10 h-10 rounded-xl text-slate-500 hover:bg-slate-900/5 flex items-center justify-center transition-colors cursor-pointer">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <div className="w-10 h-10 rounded-xl text-slate-500 hover:bg-slate-900/5 flex items-center justify-center transition-colors cursor-pointer">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="w-10 h-10 rounded-xl text-slate-500 hover:bg-slate-900/5 flex items-center justify-center transition-colors cursor-pointer">
                    <Target className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Bottom Nav Avatar & Settings */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-xl text-slate-400 hover:bg-slate-900/5 flex items-center justify-center transition-colors cursor-pointer">
                  <Settings className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 p-0.5 shadow-md">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-blue-600">
                    JD
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Main Panel */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col gap-6 overflow-hidden">
              
              {/* Upper Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Stat 1: Balance */}
                <div className="bg-white/80 border border-white/60 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.015)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 text-slate-300 group-hover:text-slate-400 transition-colors">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Total Balance</span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-slate-900">$12,458.50</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      <ArrowUpRight className="w-3 h-3" /> +8.2%
                    </span>
                    <span className="text-[10px] text-slate-400">vs last month</span>
                  </div>
                  {/* Subtle Sparkline SVG */}
                  <div className="h-10 w-24 absolute right-2 bottom-2 opacity-50">
                    <svg className="w-full h-full" viewBox="0 0 100 30" fill="none" preserveAspectRatio="none">
                      <path d="M0,25 Q15,15 30,22 T60,5 T90,12 T100,2" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Stat 2: Income */}
                <div className="bg-white/80 border border-white/60 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.015)] relative overflow-hidden group">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Monthly Income</span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-slate-900">$4,850.00</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      <ArrowUpRight className="w-3 h-3" /> +12.4%
                    </span>
                    <span className="text-[10px] text-slate-400">vs last month</span>
                  </div>
                  {/* Sparkline */}
                  <div className="h-10 w-24 absolute right-2 bottom-2 opacity-50">
                    <svg className="w-full h-full" viewBox="0 0 100 30" fill="none" preserveAspectRatio="none">
                      <path d="M0,28 Q20,10 40,20 T80,3 T100,6" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Stat 3: Expenses */}
                <div className="bg-white/80 border border-white/60 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.015)] relative overflow-hidden group">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Monthly Spent</span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-slate-900">$2,391.20</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                      <ArrowDownRight className="w-3 h-3" /> -4.1%
                    </span>
                    <span className="text-[10px] text-slate-400">favorable savings</span>
                  </div>
                  {/* Sparkline */}
                  <div className="h-10 w-24 absolute right-2 bottom-2 opacity-50">
                    <svg className="w-full h-full" viewBox="0 0 100 30" fill="none" preserveAspectRatio="none">
                      <path d="M0,10 Q25,25 50,15 T85,28 T100,26" stroke="#FB7185" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* Lower Section: Interactive Donut & Budgets Progress List */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
                
                {/* Donut Column */}
                <div className="lg:col-span-6 bg-white/80 border border-white/60 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Spending Breakdown</h4>
                      <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full">Interactive</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6 py-2 justify-center lg:justify-start">
                      {/* Custom SVG Donut Chart */}
                      <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 120 120" className="w-full h-full transform -scale-x-100">
                          {spendingData.map((seg, idx) => {
                            // Calculate current rotation angles dynamically
                            let accumulatedPercent = 0;
                            for (let i = 0; i < idx; i++) {
                              accumulatedPercent += spendingData[i].percentage;
                            }
                            
                            const strokeLength = (seg.percentage / 100) * circumference;
                            const gapLength = circumference - strokeLength;
                            const rotationAngle = -90 + (accumulatedPercent / 100) * 360;
                            const isHovered = activeSegmentIndex === idx;

                            return (
                              <circle
                                key={seg.name}
                                cx="60"
                                cy="60"
                                r={radius}
                                fill="transparent"
                                stroke={seg.color}
                                strokeWidth={isHovered ? 13 : 9}
                                strokeDasharray={`${strokeLength} ${gapLength}`}
                                transform={`rotate(${rotationAngle} 60 60)`}
                                strokeLinecap="round"
                                className="cursor-pointer transition-all duration-300"
                                onMouseEnter={() => setActiveSegmentIndex(idx)}
                                onMouseLeave={() => setActiveSegmentIndex(null)}
                                style={{
                                  filter: isHovered ? `drop-shadow(0 0 6px ${seg.glow})` : 'none',
                                }}
                              />
                            );
                          })}
                        </svg>

                        {/* Centered details box */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">
                            {activeSegmentIndex !== null ? spendingData[activeSegmentIndex].name : 'Total Spent'}
                          </span>
                          <span className="text-base font-display font-extrabold text-slate-800 leading-tight">
                            ${activeSegmentIndex !== null 
                              ? spendingData[activeSegmentIndex].value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
                              : totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                            }
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded-md mt-0.5 shadow-sm border border-slate-100">
                            {activeSegmentIndex !== null ? `${spendingData[activeSegmentIndex].percentage}%` : '100%'}
                          </span>
                        </div>
                      </div>

                      {/* Donut Legend */}
                      <div className="flex-1 space-y-2.5 w-full">
                        {spendingData.map((seg, idx) => (
                          <div 
                            key={seg.name}
                            onMouseEnter={() => setActiveSegmentIndex(idx)}
                            onMouseLeave={() => setActiveSegmentIndex(null)}
                            className={`flex items-center justify-between p-1.5 rounded-lg border transition-all cursor-pointer ${
                              activeSegmentIndex === idx 
                                ? 'bg-slate-50 border-slate-100 shadow-sm' 
                                : 'border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span 
                                className="w-2.5 h-2.5 rounded-full block shrink-0" 
                                style={{ backgroundColor: seg.color }}
                              />
                              <span className="text-xs font-medium text-slate-600">{seg.name}</span>
                            </div>
                            <div className="text-right flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-800">${seg.value.toFixed(0)}</span>
                              <span className="text-[10px] font-semibold text-slate-400">({seg.percentage}%)</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget Column */}
                <div className="lg:col-span-6 bg-white/80 border border-white/60 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Active Budgets</h4>
                      <span className="inline-flex items-center text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-md">
                        On Track
                      </span>
                    </div>

                    <div className="space-y-4 py-1">
                      {/* Food Progress */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-700">Food & Dining</span>
                            <span className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-1.5 py-0.2 rounded">Near Limit</span>
                          </div>
                          <span className="text-slate-400 font-medium">
                            <strong className="text-slate-700">$420</strong> of $500
                          </span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '84%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                            className="h-full bg-rose-400 rounded-full" 
                          />
                        </div>
                      </div>

                      {/* Shopping Progress */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-700">Shopping & Retail</span>
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded">On Track</span>
                          </div>
                          <span className="text-slate-400 font-medium">
                            <strong className="text-slate-700">$120</strong> of $300
                          </span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '40%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
                            className="h-full bg-blue-500 rounded-full" 
                          />
                        </div>
                      </div>

                      {/* Travel Progress */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-700">Travel & Commute</span>
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded">On Track</span>
                          </div>
                          <span className="text-slate-400 font-medium">
                            <strong className="text-slate-700">$150</strong> of $600
                          </span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '25%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                            className="h-full bg-teal-500 rounded-full" 
                          />
                        </div>
                      </div>

                      {/* Entertainment Progress */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-700">Entertainment</span>
                            <span className="text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-1.5 py-0.2 rounded">Warning</span>
                          </div>
                          <span className="text-slate-400 font-medium">
                            <strong className="text-slate-700">$80</strong> of $100
                          </span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '80%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
                            className="h-full bg-violet-500 rounded-full" 
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
          
        </div>

      </div>
    </section>
  );
}
