"use client";

import React from 'react';
import { 
  Rocket, 
  TrendingUp, 
  DollarSign, 
  Cloud, 
  PieChart, 
  Sparkles, 
  Plus,
  ArrowRight
} from 'lucide-react';
import { motion, useInView } from 'motion/react';

/* 
========================================================================
DESIGN PLAN - FINAL CTA SECTION
========================================================================
1. Pastel Gradient Background:
   - Aurora continuation matching preceding sections:
     - Peach/Pink warm glow: #FFF1EB
     - Fresh Mint/Teal breeze: #E6F7F5
     - Sky/Lavender soft shadow: #F0EDFF
     - Base Canvas: #FAF9F6

2. Central Glass-Morphic Panel:
   - Semi-transparent gradient fill using vibrant neon pastels:
     - Mint Green to Sky Blue gradient: `bg-gradient-to-br from-[#A7F3D0]/30 via-[#A5F3FC]/25 to-[#93C5FD]/30`
     - Framed with double-border effect (`border border-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.03)]`) and heavy backdrop-blur (`backdrop-blur-2xl`).

3. Pill-Shaped Glowing Button:
   - Inside panel: White glass capsule `bg-white/90 shadow-[0_8px_32px_rgba(16,185,129,0.25)] border border-white`
   - Hover effects with pulse waves, text in bold forest green/emerald `#047857`.

4. Floating 3D-style Decorative elements:
   - Rocket Ship (Top-Right): Styled with blue-indigo-white gradient casing, tilted diagonally at -35deg. Below it, an SVG bright radial energy cone acting as launch exhaust trail (`from-blue-400/40 via-blue-500/10 to-transparent`).
   - Bar Chart Card (Upper-Left): Glass sheet holding 5 glowing green vertical pill bars.
   - 3D Glass Green Coins: Circular layered gradients (`from-emerald-300/45 to-teal-500/45 border border-emerald-400/40`) with inner dropshadow, featuring an embossed shiny white DollarSign.
   - Pie/Donut Chart Segment (Right-Center): Elegant partial donut ring peaking out from the side of the glass.
   - Pedestal platform (Bottom): Translucent glowing layered circles underneath the panel to ground it physically in space.

5. Motion & Infinite floating effects:
   - whileInView triggers a soft spring scale-up for the central panel.
   - Staggered loop animations (`animate={{ y: [0, -8, 0] }}`) with varying delays on the rocket, coins, and chart to establish organic, independent levitation.
========================================================================
*/

export default function FinalCTASection() {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { margin: "100px" });
  
  // Custom infinite floating animations (only animate when section is in viewport)
  const floatingAnimation = (delay: number, duration: number = 5) => ({
    animate: isInView ? {
      y: [0, -10, 0],
      rotate: [0, 1.5, -1.5, 0],
    } : {
      y: 0,
      rotate: 0,
    },
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }
  });

  const coinFloatAnimation = (delay: number, offsetRotate: number) => ({
    animate: isInView ? {
      y: [0, -12, 0],
      rotate: [offsetRotate, offsetRotate + 3, offsetRotate - 3, offsetRotate],
    } : {
      y: 0,
      rotate: offsetRotate,
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }
  });

  return (
    <section 
      id="pricing"
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 lg:py-48 overflow-hidden bg-[#FAF9F6]"
      style={{
        background: `
          radial-gradient(circle at 15% 20%, #FFF1EB 0%, transparent 45%),
          radial-gradient(circle at 85% 80%, #E6F7F5 0%, transparent 45%),
          radial-gradient(circle at 50% 50%, #F0EDFF 0%, transparent 50%),
          #FAF9F6
        `
      }}
    >
      {/* Top seamless transition fade */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#FAF9F6] to-transparent pointer-events-none z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* The entire floating structure */}
        <div className="relative w-full max-w-4xl min-h-[500px] flex items-center justify-center py-12">
          
          {/* ==================================================================== */}
          {/* FLOATING DECORATIONS (Desktop-only/large-screen priority) */}
          {/* ==================================================================== */}
          
          {/* 1. Bar Chart Card (Upper Left) */}
          <motion.div 
            {...floatingAnimation(0.2, 5.5)}
            className="absolute left-[-20px] top-[10%] xl:left-[-60px] hidden md:flex flex-col gap-3 p-4 w-40 bg-white/95 rounded-2xl border border-white/70 shadow-[0_12px_32px_rgba(0,0,0,0.02)] z-20"
          >
            <div className="flex items-center gap-1.5 justify-between">
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Growth</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            {/* Visual Mini Bars */}
            <div className="flex items-end justify-between h-14 pt-2 px-1">
              <div className="w-3.5 bg-gradient-to-t from-emerald-400 to-teal-300 rounded-t-md h-[30%]" />
              <div className="w-3.5 bg-gradient-to-t from-emerald-400 to-teal-300 rounded-t-md h-[45%]" />
              <div className="w-3.5 bg-gradient-to-t from-emerald-400 to-teal-300 rounded-t-md h-[60%]" />
              <div className="w-3.5 bg-gradient-to-t from-emerald-400 to-teal-300 rounded-t-md h-[80%]" />
              <div className="w-3.5 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-md h-[100%] shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse" />
            </div>
          </motion.div>

          {/* 2. Floating Glass Green Coins (Various Sizes and Positions) */}
          {/* Main Giant Coin (Lower Left) */}
          <motion.div 
            {...coinFloatAnimation(0.6, -15)}
            className="absolute left-[-40px] bottom-[12%] xl:left-[-100px] w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-emerald-400/40 via-emerald-300/35 to-teal-400/40 border border-white/50 shadow-[0_15px_35px_rgba(16,185,129,0.25),_inset_0_4px_8px_rgba(255,255,255,0.4)] flex items-center justify-center z-30 select-none cursor-pointer"
          >
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border-2 border-dashed border-emerald-500/40 flex items-center justify-center bg-white/20">
              <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)]" />
            </div>
            {/* Glossy inner reflex card highlight */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Medium Coin (Top Center-Left) */}
          <motion.div 
            {...coinFloatAnimation(1.1, 10)}
            className="absolute left-[8%] top-[-8px] w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-400/35 to-teal-300/35 border border-white/50 shadow-[0_8px_20px_rgba(16,185,129,0.18),_inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center z-20"
          >
            <div className="w-10 h-10 rounded-full border border-dashed border-emerald-500/30 flex items-center justify-center bg-white/5">
              <DollarSign className="w-5.5 h-5.5 text-emerald-600" />
            </div>
          </motion.div>

          {/* Medium Coin (Right Side mid-top) */}
          <motion.div 
            {...coinFloatAnimation(1.5, 20)}
            className="absolute right-[-20px] top-[24%] xl:right-[-60px] w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-400/35 to-teal-300/35 border border-white/50 shadow-[0_10px_24px_rgba(16,185,129,0.18),_inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center z-20"
          >
            <div className="w-12 h-12 rounded-full border border-dashed border-emerald-500/30 flex items-center justify-center bg-white/5">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </motion.div>

          {/* Tiny Coin (Bottom Right floor) */}
          <motion.div 
            {...coinFloatAnimation(0.2, -8)}
            className="absolute right-[5%] bottom-[-15px] w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-400/30 to-teal-300/30 border border-white/50 shadow-[0_6px_15px_rgba(16,185,129,0.15)] flex items-center justify-center z-20"
          >
            <div className="w-8 h-8 rounded-full border border-dashed border-emerald-500/20 flex items-center justify-center bg-white/5">
              <DollarSign className="w-4.5 h-4.5 text-emerald-600" />
            </div>
          </motion.div>

          {/* 3. Small Cloud shapes (Top Right & Left ambient) */}
          <motion.div 
            {...floatingAnimation(1.8, 7)}
            className="absolute right-[16%] top-[-10px] text-white/80 filter drop-shadow(0 12px 24px rgba(255,255,255,0.95)) z-10 hidden sm:block"
          >
            <Cloud className="w-14 h-14 fill-white text-slate-100" />
          </motion.div>
          
          <motion.div 
            {...floatingAnimation(2.4, 8)}
            className="absolute right-[-40px] bottom-[30%] text-white/60 filter drop-shadow(0 12px 24px rgba(255,255,255,0.95)) z-10 hidden lg:block"
          >
            <Cloud className="w-18 h-18 fill-white text-slate-50" />
          </motion.div>

          {/* 4. Partial Donut/Pie Chart (Peeking in on the Right edge) */}
          <motion.div 
            {...floatingAnimation(0.9, 6)}
            className="absolute right-[-30px] bottom-[12%] xl:right-[-70px] hidden md:block z-20"
          >
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Pie SVG peeking */}
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-12 drop-shadow-[0_12px_24px_rgba(16,185,129,0.1)]">
                <circle cx="50" cy="50" r="35" fill="none" stroke="#2DD4BF" strokeWidth="12" strokeDasharray="140 100" strokeLinecap="round" opacity="0.6" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#3B82F6" strokeWidth="12" strokeDasharray="60 180" strokeDashoffset="-140" strokeLinecap="round" opacity="0.4" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#FB7185" strokeWidth="12" strokeDasharray="30 210" strokeDashoffset="-200" strokeLinecap="round" opacity="0.5" />
              </svg>
            </div>
          </motion.div>

          {/* 5. Star / Plus spark markers scattered */}
          <motion.div 
            animate={isInView ? { scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] } : { scale: 1, opacity: 0.3 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[3%] top-[45%] text-amber-400"
          >
            <Plus className="w-5 h-5 text-emerald-400" />
          </motion.div>
          <motion.div 
            animate={isInView ? { scale: [1.2, 0.9, 1.2], opacity: [0.4, 0.8, 0.4] } : { scale: 1.2, opacity: 0.4 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-[22%] bottom-[8%] text-blue-400"
          >
            <Plus className="w-4 h-4 text-blue-400" />
          </motion.div>
          <motion.div 
            animate={isInView ? { scale: [1, 1.3, 1], opacity: [0.2, 0.8, 0.2] } : { scale: 1, opacity: 0.2 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-[2%] top-[12%] text-emerald-400"
          >
            <Plus className="w-5.5 h-5.5 text-emerald-400" />
          </motion.div>

          {/* ==================================================================== */}
          {/* THE CENTRAL GLASS-MORPHIC CONTAINER PANEL */}
          {/* ==================================================================== */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            className="relative w-full bg-gradient-to-br from-[#A7F3D0]/35 via-[#A5F3FC]/25 to-[#93C5FD]/30 backdrop-blur-2xl border border-white/50 shadow-[0_25px_65px_-12px_rgba(0,0,0,0.04)] rounded-[40px] px-8 py-16 sm:py-20 md:py-24 text-center flex flex-col items-center justify-center z-10 mx-4 overflow-hidden"
          >
            {/* Soft inner radial gradient highlight for extreme gloss finish */}
            <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 80%) pointer-events-none" />

            {/* Headline and Subtext */}
            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-white mb-6 drop-shadow-[0_2px_12px_rgba(15,23,42,0.18)] leading-[1.15]">
                Ready to take control of your money?
              </h2>
              <p className="text-lg sm:text-xl text-white/95 font-sans font-medium mb-10 drop-shadow-[0_1px_4px_rgba(15,23,42,0.1)]">
                Start tracking today.
              </p>

              {/* White capsule pill-shaped button */}
              <motion.button 
                whileHover={{ scale: 1.04, shadow: "0 12px 36px rgba(16,185,129,0.35)" }}
                whileTap={{ scale: 0.98 }}
                className="relative px-10 py-4.5 rounded-full bg-white text-emerald-800 font-display font-bold text-base shadow-[0_8px_30px_rgba(16,185,129,0.2)] border border-white/90 hover:border-white transition-all flex items-center gap-2 group cursor-pointer"
              >
                Get Started
                <ArrowRight className="w-4.5 h-4.5 text-emerald-700 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>

            {/* Bubble decoration inside the glass */}
            <div className="absolute bottom-[24%] left-[10%] w-3 h-3 rounded-full bg-white/20 border border-white/35" />
            <div className="absolute top-[28%] right-[12%] w-2 h-2 rounded-full bg-white/20 border border-white/35" />

            {/* ==================================================================== */}
            {/* FLOATING ROCKET (Top-Right of the glass container border) */}
            {/* ==================================================================== */}
            <motion.div 
              {...floatingAnimation(0, 4)}
              className="absolute -top-16 right-[-8px] sm:-top-24 sm:right-[-24px] md:-top-28 md:right-[-28px] w-28 h-32 sm:w-40 sm:h-44 md:w-44 md:h-48 z-30 pointer-events-none origin-bottom-left select-none"
            >
              {/* Curved Exhaust Light-Trail Overlay */}
              <div 
                className="absolute top-[48%] left-[-5%] sm:top-[44%] sm:left-[-15%] w-[110px] h-[75px] sm:w-[150px] sm:h-[105px] origin-top-right transform -rotate-[40deg] opacity-70 blur-[1px] pointer-events-none"
                style={{
                  background: 'conic-gradient(from 120deg at 100% 0%, rgba(59,130,246,0.3) 0deg, rgba(255,255,255,0.7) 35deg, rgba(16,185,129,0.3) 70deg, transparent 90deg)'
                }}
              />
              
              {/* Glossy Rocket Container */}
              <div className="relative w-full h-full transform -rotate-[35deg]">
                {/* Visual Approximation of a premium 3D styled Rocket with pure CSS/SVG */}
                <svg className="w-full h-full drop-shadow-[0_20px_35px_rgba(59,130,246,0.32)]" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="rocket-hull" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="55%" stopColor="#F1F5F9" />
                      <stop offset="100%" stopColor="#CBD5E1" />
                    </linearGradient>
                    <linearGradient id="rocket-nose" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1E3A8A" />
                    </linearGradient>
                    <linearGradient id="rocket-window-rim" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#94A3B8" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient id="rocket-window-glass" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#0284C7" />
                    </linearGradient>
                    <filter id="rocket-glow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Wings / Side boosters */}
                  <path d="M 45 105 C 40 120, 25 130, 15 135 C 20 120, 25 100, 32 85 Z" fill="url(#rocket-nose)" />
                  <path d="M 115 105 C 120 120, 135 130, 145 135 C 140 120, 135 100, 128 85 Z" fill="url(#rocket-nose)" />
                  <path d="M 80 120 C 70 135, 60 148, 80 152 C 100 148, 90 135, 80 120 Z" fill="url(#rocket-nose)" />

                  {/* Main Hull cylinder */}
                  <path d="M 45 75 C 45 40, 50 15, 80 12 C 110 15, 115 40, 115 75 C 115 95, 108 120, 102 130 L 58 130 C 52 120, 45 95, 45 75 Z" fill="url(#rocket-hull)" />

                  {/* Nose cone tip */}
                  <path d="M 54 44 C 54 30, 64 16, 80 12 C 96 16, 106 30, 106 44 Z" fill="url(#rocket-nose)" />

                  {/* Circular Window */}
                  <circle cx="80" cy="72" r="16" fill="url(#rocket-window-rim)" />
                  <circle cx="80" cy="72" r="12" fill="url(#rocket-window-glass)" />
                  {/* Glass glare overlay */}
                  <path d="M 72 68 A 12 12 0 0 1 84 60 A 12 12 0 0 0 72 68 Z" fill="#FFFFFF" opacity="0.4" />

                  {/* Highlights/Shine on fuselage */}
                  <path d="M 50 75 C 50 50, 54 35, 60 25 C 55 35, 52 50, 52 75 Z" fill="#FFFFFF" opacity="0.6" />
                </svg>
              </div>
            </motion.div>

          </motion.div>

          {/* ==================================================================== */}
          {/* THE GLOWING PEDESTAL LANDING PAD */}
          {/* ==================================================================== */}
          <div className="absolute bottom-[2%] left-1/2 transform -translate-x-1/2 w-[75%] max-w-lg h-12 pointer-events-none z-0">
            {/* Soft blurred glowing ellipse overlay */}
            <div className="absolute inset-0 bg-[#A7F3D0]/30 rounded-full blur-xl scale-y-50" />
            <div className="absolute inset-x-8 inset-y-2 bg-[#A5F3FC]/45 rounded-full blur-md scale-y-50" />
            
            {/* The structural glass platform rings */}
            <div className="absolute inset-x-12 bottom-2 h-2 rounded-full bg-white/25 border-b-2 border-white/30" />
            <div className="absolute inset-x-20 bottom-0 h-1.5 rounded-full bg-white/30 border-b border-white/35" />
          </div>

        </div>

      </div>
    </section>
  );
}
