"use client";

import React, { useState } from 'react';
import { 
  DollarSign, 
  Mail, 
  ArrowRight, 
  TrendingUp, 
  Globe,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import { motion, useInView } from 'motion/react';

/* 
========================================================================
DESIGN PLAN - FOOTER SECTION
========================================================================
1. Pastel Gradient Background:
   - Soft aurora pastel continuation matching other sections:
     - Peach/Pink: #FFF1EB
     - Fresh Mint/Teal: #E6F7F5
     - Sky/Lavender: #F0EDFF
     - Base: #FAF9F6

2. Top Part Layout:
   - Left side: MoneyTracker brand (Blue rounded square card with white DollarSign, paired with bold "Money" + blue "Tracker" typography).
   - Right side:
     - Column 1 (PRODUCT): Features, Security, How It Works
     - Column 2 (COMPANY): About Us, Careers, Contact
     - Column 3 (RESOURCES): Blog, Guides, Help Center
     - Column 4 (STAY UPDATED): Newsletter input field wrapped in a gorgeous white capsule card with a glass shine effect and a circular search/submit arrow.

3. Middle Part (Visual Centerpiece):
   - Giant, bold, physical-extruded 3D white text: "Track Smarter." (displayed in elegant Space Grotesk / Inter-black weight).
   - Achieved via overlapping text-shadows:
     `text-shadow: 
       1px 1px 0px #E2E8F0, 
       2px 2px 0px #E2E8F0, 
       3px 3px 0px #CBD5E1, 
       4px 4px 10px rgba(0, 0, 0, 0.05),
       0px 10px 30px rgba(15, 23, 42, 0.04)`
   - Floating visual elements that overlap and intersect the text layers:
     - Email Pill: Peach-pink gradient capsule with a shiny glaze, overlapping "Track" (`from-rose-400/90 to-orange-400/90`).
     - Twitter Pill: Beautiful blue gradient capsule overlapping "Smarter." (`from-blue-500/90 to-sky-400/90`).
     - App Store/Play Pill: Green minty capsule (`from-emerald-400/90 to-teal-400/90`).
     - Mini bar-chart glass tile.
     - Glowing green dollar coin.

4. Bottom Part:
   - Centered copyrights and links with custom hover highlights.

5. Responsive Adaptations:
   - Mobiles: columns stack nicely, background text is scaled down using fluid text clamps (`text-5xl sm:text-7xl md:text-9xl`), floating pills are hidden or simplified to prevent overlapping touch zones.
========================================================================
*/

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = React.useRef(null);
  const isInView = useInView(footerRef, { margin: "100px" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // Custom infinite floating animations (only animate when footer is in viewport)
  const floatingAnimation = (delay: number, yOffset: number = 8) => ({
    animate: isInView ? {
      y: [0, -yOffset, 0],
      rotate: [0, 1, -1, 0],
    } : {
      y: 0,
      rotate: 0,
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }
  });

  return (
    <footer 
      id="footer"
      ref={footerRef}
      className="relative w-full pt-20 pb-10 overflow-hidden bg-[#FAF9F6]"
      style={{
        background: `
          radial-gradient(circle at 20% 40%, #FFF1EB 0%, transparent 45%),
          radial-gradient(circle at 80% 60%, #E6F7F5 0%, transparent 45%),
          radial-gradient(circle at 50% 90%, #F0EDFF 0%, transparent 50%),
          #FAF9F6
        `
      }}
    >
      {/* Top separator line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==================================================================== */}
        {/* TOP PART: Brand & Navigation Columns */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-slate-200/50">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start justify-between">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-2.5 mb-4 cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <DollarSign className="w-5.5 h-5.5" />
                </div>
                <span className="text-xl font-display font-extrabold text-slate-900 tracking-tight">
                  Money<span className="text-blue-600">Tracker</span>
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                A highly-polished interactive financial planner designed to automatically organize, optimize, and protect your family's personal wealth.
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-6 text-xs font-semibold text-slate-400">
              <Globe className="w-3.5 h-3.5 text-slate-300" />
              <span>Global Financial Security, Inc.</span>
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-4 sm:gap-6">
            {/* Column 1 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-slate-600 font-medium">
                <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#ai-assistant" className="hover:text-blue-600 transition-colors">Security</a></li>
                <li><a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-600 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-slate-600 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Stay Updated</h4>
            <p className="text-xs text-slate-500 font-medium mb-4">
              Subscribe to our weekly finance digest.
            </p>

            <form onSubmit={handleSubscribe} className="relative w-full max-w-sm flex items-center bg-white border border-slate-200 shadow-[0_4px_16px_rgba(0,0,0,0.02)] rounded-full p-1 pl-4">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email" 
                required
                className="flex-1 bg-transparent border-none text-xs text-slate-800 focus:outline-none focus:ring-0 placeholder-slate-400"
              />
              <button 
                type="submit" 
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-md shadow-blue-500/10 transition-all cursor-pointer shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <motion.span 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-bold text-emerald-600 mt-2 block pl-2"
              >
                Thanks for subscribing!
              </motion.span>
            )}
          </div>

        </div>

        {/* ==================================================================== */}
        {/* MIDDLE PART: Giant Extruded text with overlapping pills */}
        {/* ==================================================================== */}
        <div className="relative w-full py-16 md:py-24 flex flex-col items-center justify-center">
          
          {/* Background Ambient Bubbles */}
          <div className="absolute top-[20%] left-[10%] w-3 h-3 rounded-full bg-blue-400/25 blur-xs hidden sm:block" />
          <div className="absolute bottom-[30%] right-[8%] w-4 h-4 rounded-full bg-rose-400/25 blur-xs hidden sm:block" />

          {/* GIANT 3D TEXT DISPLAY */}
          <div className="relative text-center select-none pointer-events-none z-0 flex flex-col items-center w-full">
            
            {/* Word 1: Start */}
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-7xl sm:text-9xl md:text-[11rem] font-display font-black leading-none tracking-tighter text-white uppercase block select-none"
              style={{
                letterSpacing: '-0.05em',
                textShadow: `
                  1px 1px 0px #F1F5F9, 
                  2px 2px 0px #E2E8F0, 
                  3px 3px 0px #CBD5E1, 
                  4px 4px 12px rgba(148, 163, 184, 0.12),
                  0px 10px 30px rgba(15, 23, 42, 0.04)
                `
              }}
            >
              Start
            </motion.h3>

            {/* Word 2: Tracking. */}
            <motion.h3 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-7xl sm:text-9xl md:text-[11rem] font-display font-black leading-none tracking-tighter text-white uppercase block select-none -mt-4 sm:-mt-8"
              style={{
                letterSpacing: '-0.05em',
                textShadow: `
                  1px 1px 0px #F1F5F9, 
                  2px 2px 0px #E2E8F0, 
                  3px 3px 0px #CBD5E1, 
                  4px 4px 12px rgba(148, 163, 184, 0.12),
                  0px 10px 30px rgba(15, 23, 42, 0.04)
                `
              }}
            >
              Tracking.
            </motion.h3>

          </div>

          {/* ==================================================================== */}
          {/* OVERLAPPING FLOATING PILLS & CARD TILES */}
          {/* ==================================================================== */}
          
          {/* 1. Email Pill (Overlapping "Start" left-side) */}
          <motion.a 
            href="mailto:contact@moneytracker.io"
            {...floatingAnimation(0.2, 7)}
            className="absolute left-[8%] top-[25%] sm:left-[15%] sm:top-[28%] z-10 px-4.5 py-2.5 sm:px-6 sm:py-3.5 bg-gradient-to-r from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 rounded-full flex items-center gap-2.5 shadow-[0_12px_28px_rgba(244,63,94,0.18),_inset_0_2px_4px_rgba(255,255,255,0.4)] border border-rose-300/30 text-white font-display font-bold text-xs sm:text-sm tracking-wide cursor-pointer group active:scale-95 transition-all"
          >
            <Mail className="w-4 h-4 text-rose-100 group-hover:scale-105 transition-transform" />
            <span>Email Us</span>
            {/* Top highlight shine */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
          </motion.a>

          {/* 2. Twitter / X Pill (Overlapping center-bottom) */}
          <motion.a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noreferrer"
            {...floatingAnimation(1.1, 9)}
            className="absolute left-[38%] bottom-[18%] sm:bottom-[24%] z-10 px-4.5 py-2.5 sm:px-6 sm:py-3.5 bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 rounded-full flex items-center gap-2.5 shadow-[0_12px_28px_rgba(59,130,246,0.18),_inset_0_2px_4px_rgba(255,255,255,0.4)] border border-blue-400/30 text-white font-display font-bold text-xs sm:text-sm tracking-wide cursor-pointer group active:scale-95 transition-all"
          >
            {/* Custom SVG for Twitter/X */}
            <svg className="w-3.5 h-3.5 fill-blue-100 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Twitter</span>
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
          </motion.a>

          {/* 3. App Store Glass Capsule (Overlapping "Tracking" right-side) */}
          <motion.div 
            {...floatingAnimation(0.7, 8)}
            className="absolute right-[4%] top-[34%] sm:right-[12%] sm:top-[38%] z-10 px-4.5 py-2.5 sm:px-5.5 sm:py-3 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 rounded-full flex items-center gap-2 shadow-[0_12px_28px_rgba(16,185,129,0.18),_inset_0_2px_4px_rgba(255,255,255,0.4)] border border-emerald-300/30 text-white font-display font-bold text-xs sm:text-sm tracking-wide cursor-not-allowed group transition-all"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white/40 block border border-white animate-pulse" />
            <span>App Store</span>
            <span className="text-[9px] font-bold opacity-75 uppercase">Beta</span>
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
          </motion.div>

          {/* 4. Mini Glass Bar Chart Card (Far Left overlap) */}
          <motion.div 
            {...floatingAnimation(1.8, 6)}
            className="absolute left-[3%] bottom-[35%] w-24 p-3 bg-white/95 rounded-xl border border-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.015)] z-10 hidden lg:block"
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Yield</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="flex items-end gap-1.5 h-8">
              <div className="flex-1 bg-emerald-400/40 rounded-sm h-[30%]" />
              <div className="flex-1 bg-emerald-400/40 rounded-sm h-[50%]" />
              <div className="flex-1 bg-emerald-500 rounded-sm h-[80%]" />
            </div>
          </motion.div>

          {/* 5. Glowing Green Coin (Far Right overlap) */}
          <motion.div 
            {...floatingAnimation(2.4, 7)}
            className="absolute right-[4%] bottom-[24%] sm:right-[6%] sm:bottom-[30%] w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-400/35 to-teal-300/35 border border-white/50 shadow-[0_8px_20px_rgba(16,185,129,0.15),_inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center z-10 select-none hidden sm:flex"
          >
            <div className="w-10 h-10 rounded-full border border-dashed border-emerald-500/20 flex items-center justify-center bg-white/5">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
          </motion.div>

        </div>

        {/* ==================================================================== */}
        {/* BOTTOM PART: Legal Rights and Footer Bottom links */}
        {/* ==================================================================== */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/40">
          
          <div className="text-xs text-slate-400 font-semibold text-center sm:text-left order-2 sm:order-1">
            © 2026 MoneyTracker. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 order-1 sm:order-2">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <span className="text-slate-300">•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
