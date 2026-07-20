"use client";

import React from 'react';
import { 
  Landmark, 
  Receipt, 
  TrendingUp, 
  ChevronRight, 
  Sparkles,
  ShoppingBag,
  CreditCard,
  Coins
} from 'lucide-react';
import { motion } from 'motion/react';

/* 
========================================================================
DESIGN PLAN - HOW IT WORKS SECTION
========================================================================
1. Pastel Gradient Hex Values:
   - Aurora Canvas continuation for seamless flow:
     - Peach/Coral: #FFF6F0 (warm sunrise glow at left side)
     - Fresh Mint: #EAFCFA (refreshing clean breeze at right side)
     - Sky/Lavender: #F3F0FF (dreamy deep shadow at center)
     - Base Canvas: #FAF9F6 (matching FeaturesSection)

2. Background Textures:
   - Abstract flowing waves using a low-opacity fine dotted path structure to mimic modern tech dashboards.
   - Flowing light flares and ambient blurs.

3. Staircase Layout Mechanics (Desktop):
   - 3 Column grid/flex layout with progressive Y-offsets:
     - Card 1 (Sync): Y-offset: 0px (`md:translate-y-0`)
     - Card 2 (Track): Y-offset: 96px (`md:translate-y-24`)
     - Card 3 (Grow): Y-offset: 192px (`md:translate-y-48`)
   
4. 3D-Style Glass/Glossy Icons:
   - Floating top-left badges: Pure white glossy squares with dual-ring inner shadows (`inset 0 2px 4px rgba(255,255,255,0.9)`), custom outer dropshadows, and 3D colorful icons.
   - Layered bottom-right overlapping items:
     - Card 1 Overlap: A hyper-detailed 3D miniature glowing blue credit card with a gold microchip and embossed details.
     - Card 2 Overlap: A gorgeous peach-orange shopping bag with realistic handles, gradient body, and micro-shadows.
     - Card 3 Overlap: A glossy 3D gold coin with multiple golden rims and an embossed DollarSign.

5. Conduit Connectors (The Pipe/Tube Connectors):
   - SVG rounded-corner pipes sitting between the cards.
   - Glassy glossy overlay stroke (`stroke-white/30` with `backdrop-blur-sm`) + inner glowing core stroke (`stroke-blue-400/20` and `stroke-teal-400/20`) to create a fluid, transparent three-dimensional tube effect.
========================================================================
*/

export default function HowItWorksSection() {
  
  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = (index: number) => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: index * 0.25
      }
    }
  });

  const pipeVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.4, ease: "easeInOut", delay },
        opacity: { duration: 0.3, delay }
      }
    })
  };

  return (
    <section 
      id="how-it-works"
      className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 10% 25%, #FFF6F0 0%, transparent 45%),
          radial-gradient(circle at 90% 65%, #EAFCFA 0%, transparent 45%),
          radial-gradient(circle at 50% 45%, #F3F0FF 0%, transparent 50%),
          #FAF9F6
        `
      }}
    >
      {/* Seamless transition zone from FeaturesSection above (FAF9F6) */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#FAF9F6] to-transparent pointer-events-none z-10" />

      {/* Decorative Wave/Line Textures in the Background */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <path 
            d="M -100 400 C 300 200, 600 600, 1000 300 C 1200 150, 1400 450, 1600 350" 
            fill="none" 
            stroke="#6366F1" 
            strokeWidth="3" 
            strokeDasharray="8 8" 
          />
          <path 
            d="M -100 450 C 280 250, 580 650, 980 350 C 1180 200, 1380 500, 1580 400" 
            fill="none" 
            stroke="#14B8A6" 
            strokeWidth="2" 
            strokeDasharray="6 6" 
          />
          <path 
            d="M -100 500 C 260 300, 560 700, 960 400 C 1160 250, 1360 550, 1560 450" 
            fill="none" 
            stroke="#F43F5E" 
            strokeWidth="1.5" 
            strokeDasharray="4 4" 
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50/80 border border-blue-100/50 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            How It Works
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 mb-6"
          >
            Three steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600">financial clarity.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 font-sans"
          >
            Getting control of your wealth shouldn't be a chore. Experience a fluid, auto-syncing pipeline designed to organize your life effortlessly.
          </motion.p>
        </div>

        {/* Staircase Section Layout */}
        <div className="relative max-w-5xl mx-auto pb-48 md:pb-64 lg:pb-72">
          
          {/* Conduit Pipes - Desktop Only */}
          <div className="absolute inset-0 hidden md:block z-0 pointer-events-none overflow-visible">
            <svg 
              className="absolute inset-0 w-full h-full overflow-visible"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="pipe-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#F43F5E" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FB923C" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="pipe-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FB923C" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0.4" />
                </linearGradient>
                <filter id="pipe-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Pipe 1: Card 1 (Sync) right edge -> Card 2 (Track) top edge */}
              {/* Card 1 Right Center is roughly at X: 275, Y: 110 */}
              {/* Card 2 Top Center is roughly at X: 475, Y: 155 */}
              {/* Conduit curve: M 275 110 H 425 A 24 24 0 0 1 449 134 V 170 A 24 24 0 0 0 473 194 H 480 */}
              
              {/* Shadow glow underlays for Pipe 1 */}
              <motion.path 
                d="M 285 110 H 435 A 28 28 0 0 1 463 138 V 162 A 28 28 0 0 0 491 190 H 500"
                stroke="url(#pipe-gradient-1)"
                strokeWidth="18"
                strokeLinecap="round"
                filter="url(#pipe-glow)"
                opacity="0.15"
                variants={pipeVariants}
                custom={0.4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              />
              {/* Inner glowing core for Pipe 1 */}
              <motion.path 
                d="M 285 110 H 435 A 28 28 0 0 1 463 138 V 162 A 28 28 0 0 0 491 190 H 500"
                stroke="url(#pipe-gradient-1)"
                strokeWidth="8"
                strokeLinecap="round"
                className="stroke-blue-400/30"
                variants={pipeVariants}
                custom={0.4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              />
              {/* Highlight center thin line for Pipe 1 */}
              <motion.path 
                d="M 285 110 H 435 A 28 28 0 0 1 463 138 V 162 A 28 28 0 0 0 491 190 H 500"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.6"
                variants={pipeVariants}
                custom={0.4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              />

              {/* Pipe 2: Card 2 (Track) right edge -> Card 3 (Grow) top edge */}
              {/* Card 2 Right Center is roughly at X: 615, Y: 302 */}
              {/* Card 3 Top Center is roughly at X: 805, Y: 347 */}
              
              {/* Shadow glow underlays for Pipe 2 */}
              <motion.path 
                d="M 615 302 H 755 A 28 28 0 0 1 783 330 V 354 A 28 28 0 0 0 811 382 H 830"
                stroke="url(#pipe-gradient-2)"
                strokeWidth="18"
                strokeLinecap="round"
                filter="url(#pipe-glow)"
                opacity="0.15"
                variants={pipeVariants}
                custom={0.8}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              />
              {/* Inner glowing core for Pipe 2 */}
              <motion.path 
                d="M 615 302 H 755 A 28 28 0 0 1 783 330 V 354 A 28 28 0 0 0 811 382 H 830"
                stroke="url(#pipe-gradient-2)"
                strokeWidth="8"
                strokeLinecap="round"
                className="stroke-teal-400/30"
                variants={pipeVariants}
                custom={0.8}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              />
              {/* Highlight center thin line for Pipe 2 */}
              <motion.path 
                d="M 615 302 H 755 A 28 28 0 0 1 783 330 V 354 A 28 28 0 0 0 811 382 H 830"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.6"
                variants={pipeVariants}
                custom={0.8}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              />
            </svg>
          </div>

          {/* Cards Flex Container (Diagonal layout on desktop, stacked on mobile) */}
          <div className="flex flex-col md:flex-row items-center gap-24 md:gap-0 justify-between relative z-10">
            
            {/* STEP 1 CARD */}
            <motion.div 
              variants={cardVariants(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full max-w-[310px] bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.12)] rounded-[32px] p-8 md:translate-y-0 transition-shadow duration-300 group"
            >
              {/* Card glossy light shine effect */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent rounded-t-[32px] pointer-events-none" />

              {/* Floating Top-Left 3D Icon Badge */}
              <div className="absolute -top-6 -left-4 w-16 h-16 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/40 flex items-center justify-center shadow-[0_12px_24px_rgba(0,0,0,0.04),_inset_0_2px_4px_rgba(255,255,255,0.95)] group-hover:scale-105 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-600 shadow-[0_4px_10px_rgba(59,130,246,0.1)]">
                  <Landmark className="w-5.5 h-5.5" />
                </div>
              </div>

              {/* Card Main content */}
              <div className="pt-6 pb-2">
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-1">
                  1. Sync
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Connect accounts securely in seconds.
                </p>
              </div>

              {/* Floating Bottom-Right 3D Blue Credit Card Overlap */}
              <div className="absolute -bottom-8 -right-4 w-32 h-20 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-2.5 shadow-[0_12px_28px_rgba(59,130,246,0.25)] border border-blue-400/20 transform rotate-[6deg] group-hover:rotate-[2deg] group-hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Embedded shiny card stripes */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                {/* Chip & Logo Row */}
                <div className="flex justify-between items-center mb-4">
                  {/* Gold Microchip */}
                  <div className="w-5 h-4 rounded-[3px] bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border border-amber-300/30 flex flex-col justify-between p-0.5 shadow-sm">
                    <div className="h-px bg-amber-700/20 w-full" />
                    <div className="h-px bg-amber-700/20 w-full" />
                  </div>
                  {/* Subtle Card network logo */}
                  <div className="flex gap-0.5 items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 opacity-80 -ml-1.5" />
                  </div>
                </div>
                {/* Embossed Dots representing credit card digits */}
                <div className="flex gap-1 items-center mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-blue-100">•••• •••• •••• 4012</span>
                </div>
              </div>
            </motion.div>

            {/* STEP 2 CARD */}
            <motion.div 
              variants={cardVariants(1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full max-w-[310px] bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(244,63,94,0.12)] rounded-[32px] p-8 md:translate-y-24 transition-shadow duration-300 group"
            >
              {/* Card glossy light shine effect */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent rounded-t-[32px] pointer-events-none" />

              {/* Floating Top-Left 3D Icon Badge */}
              <div className="absolute -top-6 -left-4 w-16 h-16 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/40 flex items-center justify-center shadow-[0_12px_24px_rgba(0,0,0,0.04),_inset_0_2px_4px_rgba(255,255,255,0.95)] group-hover:scale-105 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-slate-50/50 flex items-center justify-center text-slate-700 shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                  <Receipt className="w-5.5 h-5.5 text-slate-600" />
                </div>
              </div>

              {/* Card Main content */}
              <div className="pt-6 pb-2">
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-1">
                  2. Track
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Automate and categorize every transaction.
                </p>
              </div>

              {/* Floating Bottom-Right 3D Peach-Orange Shopping Bag Overlap */}
              <div className="absolute -bottom-8 -right-3 w-16 h-18 bg-gradient-to-br from-rose-400 to-orange-400 rounded-2xl shadow-[0_12px_24px_rgba(244,63,94,0.22)] border border-rose-300/20 transform rotate-[-6deg] group-hover:rotate-[-2deg] group-hover:-translate-y-1 transition-all duration-300 flex flex-col justify-end p-2 pb-2.5">
                {/* Shopping Bag handles */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-6 border-3 border-orange-200 rounded-t-full pointer-events-none opacity-90" />
                <div className="w-full flex justify-center mt-4">
                  <ShoppingBag className="w-5 h-5 text-white/95" />
                </div>
                {/* Subtle visual folds */}
                <div className="absolute right-0 bottom-0 top-6 w-3 bg-black/5 rounded-r-2xl" />
              </div>
            </motion.div>

            {/* STEP 3 CARD */}
            <motion.div 
              variants={cardVariants(2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full max-w-[310px] bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.12)] rounded-[32px] p-8 md:translate-y-48 transition-shadow duration-300 group"
            >
              {/* Card glossy light shine effect */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent rounded-t-[32px] pointer-events-none" />

              {/* Floating Top-Left 3D Icon Badge */}
              <div className="absolute -top-6 -left-4 w-16 h-16 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/40 flex items-center justify-center shadow-[0_12px_24px_rgba(0,0,0,0.04),_inset_0_2px_4px_rgba(255,255,255,0.95)] group-hover:scale-105 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-emerald-50/50 flex items-center justify-center text-emerald-600 shadow-[0_4px_10px_rgba(16,185,129,0.1)]">
                  <TrendingUp className="w-5.5 h-5.5" />
                </div>
              </div>

              {/* Card Main content */}
              <div className="pt-6 pb-2">
                <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-1">
                  3. Grow
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Achieve milestones and save automatically.
                </p>
              </div>

              {/* Floating Bottom-Right 3D Golden Coin Overlap */}
              <div className="absolute -bottom-6 -right-4 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 border-2 border-yellow-200/80 shadow-[0_8px_20px_rgba(217,119,6,0.3)] flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 select-none">
                {/* Shiny reflex edge */}
                <div className="absolute inset-0.5 rounded-full border border-yellow-200/30 bg-gradient-to-b from-white/10 to-transparent" />
                {/* Inner coin rim */}
                <div className="w-10 h-10 rounded-full border-1.5 border-dashed border-amber-600/35 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-amber-800/95 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]" />
                </div>
              </div>
            </motion.div>

          </div>

          {/* Simple connector vertical indicators for Mobile Only */}
          <div className="absolute inset-y-0 left-[26px] top-32 bottom-32 w-0.5 border-l border-dashed border-slate-300 md:hidden z-0" />

        </div>

      </div>
    </section>
  );
}
