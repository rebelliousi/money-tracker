"use client";

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  PieChart, 
  ShieldCheck, 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles,
  Coins,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/*
  MoneyTracker Hero Section - Next.js 16 (App Router) Design Plan:
  -----------------------------------------------------------------
  1. Scrim/Contrast:
     - Left-to-right white gradient overlay (from-white/95 via-white/80 md:via-white/50 to-transparent)
     - Since the video theme is extremely clean and light-colored (white background with glass/glowing elements), we use high-contrast dark charcoal and brilliant blue texts to provide gorgeous legibility.
     - Bottom-up white scrim (`from-white to-transparent/30`) to merge smoothly with the content/rest of the page.
  2. Color Palette (Tailwind CSS v4 custom/standard values):
     - Primary Button & Badges: Brilliant Brand Blue (`#0060ff` / standard `bg-blue-600` hover: `bg-blue-700`)
     - Badge bg: Standard translucent blue (`bg-blue-50/90 text-blue-700 font-semibold tracking-wider text-xs border border-blue-200/50`)
     - Secondary Buttons: Transparent backdrop-blurs with subtle silver-gray border (`border-gray-200 bg-white/70 hover:bg-white/90 text-gray-800 font-medium`)
     - Background Solid Placeholder: Soft off-white canvas fallback (`#f8fafc` or `bg-slate-50`)
  3. Responsive Strategy:
     - On mobile screens (<md), overlay text can get extremely cluttered or hard to read on top of playing video.
     - Strategy: Show a elegant top-header area. Below it, the video plays inside a rounded-2xl modern glass container (like a demo player / interactive showcase) with object-cover, while the primary text, checklists, and primary actions are beautifully structured above/beside it with solid, perfectly legible white/slate backgrounds.
     - On desktop screens (>=md), the video expands to fill the entire hero viewport as a seamless full-screen background canvas. The left-side content container floats elegantly on top with a custom left-to-right white scrim.
*/

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock interactive element to make the hero feel "alive" and highly crafted
  const [mockBalance, setMockBalance] = useState(4250);
  useEffect(() => {
    const interval = setInterval(() => {
      setMockBalance(prev => {
        const delta = Math.floor(Math.random() * 20) - 8;
        const next = prev + delta;
        return next > 5000 ? 4250 : next < 3800 ? 4250 : next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuresList = [
    {
      id: "feat-1",
      title: "Real-time expense tracking",
      desc: "Instantly categorize and monitor every single transaction.",
      icon: Wallet,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      id: "feat-2",
      title: "Smart budget planning",
      desc: "Set intuitive, automated caps with predictive warnings.",
      icon: PieChart,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      id: "feat-3",
      title: "Insights & analytics",
      desc: "Beautiful automated reports showing trends and habits.",
      icon: TrendingUp,
      color: "text-violet-600 bg-violet-50 border-violet-100",
    },
    {
      id: "feat-4",
      title: "Secure & private",
      desc: "Bank-grade 256-bit encryption with zero tracking.",
      icon: ShieldCheck,
      color: "text-teal-600 bg-teal-50 border-teal-100",
    },
  ];

  const bottomBadges = [
    { id: "b1", icon: ShieldCheck, title: "Bank-level Security", desc: "256-bit SSL encryption" },
    { id: "b2", icon: Sparkles, title: "Real-time Sync", desc: "Across all your devices" },
    { id: "b3", icon: Coins, title: "Automatic Backup", desc: "Your data is always safe" },
  ];

  return (
    <div id="moneytracker-hero-root" className="relative min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* 2. Navbar: Floating frosted glass bar overlaid on the video background */}
      <header id="main-navbar" className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 z-50 max-w-7xl mx-auto bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-slate-900">
                Money<span className="text-blue-600">Tracker</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#pricing" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors">Pricing</a>
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-sm font-semibold text-slate-800 hover:text-blue-600 px-3 py-2 transition-colors">
                Log in
              </button>
              <button className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 transition-all active:scale-[0.98]">
                Get Started <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-800 hover:bg-black/5 transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/5 rounded-b-2xl overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-4">
                <a 
                  href="#features" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-black/5 hover:text-blue-600 transition-all"
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-black/5 hover:text-blue-600 transition-all"
                >
                  How It Works
                </a>
                <a 
                  href="#pricing" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-black/5 hover:text-blue-600 transition-all"
                >
                  Pricing
                </a>
                <hr className="border-black/5" />
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button className="w-full text-center py-2.5 text-sm font-medium text-slate-800 rounded-lg hover:bg-black/5 transition-colors">
                    Log in
                  </button>
                  <button className="w-full text-center py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Hero Container */}
      <section className="relative w-full min-h-screen md:min-h-[82vh] flex items-center justify-center isolate z-0">
        
        {/* 1. Video background & Fallback placeholder (Desktop mode fullscreen overlay) */}
        {/* We keep standard solid fallbacks behind to avoid flashy loads */}
        <div className="absolute inset-0 w-full h-full bg-slate-100 -z-10 hidden md:block">
          {/* Subtle grid pattern background underneath to elevate the premium feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
          
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: isVideoPlaying ? 1 : 0, objectPosition: '60% 55%' }}
            onCanPlay={() => setIsVideoPlaying(true)}
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* 4. Left-to-right gradient scrim over the video background (Desktop Mode) */}
        <div 
          className="absolute inset-0 -z-10 hidden md:block" 
          style={{ 
            background: 'linear-gradient(to right, #ffffff 0%, #ffffff 38%, rgba(255, 255, 255, 0.9) 45%, rgba(255, 255, 255, 0.2) 55%, rgba(255, 255, 255, 0) 65%)' 
          }} 
        />
        {/* Bottom fading scrim */}
        <div className="absolute bottom-0 inset-x-0 h-40 -z-10 bg-gradient-to-t from-slate-50 to-transparent hidden md:block" />

        {/* Content Wrapper */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 md:pt-36 md:pb-16 lg:pt-44 lg:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* 3. Hero text overlay: LEFT side of the video, optimized for absolute legibility */}
            <div className="md:col-span-6 lg:col-span-5 space-y-8 text-left relative z-10">
              
              {/* Badge Text */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold tracking-wider text-[11px] sm:text-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                <span>TRACK. SAVE. GROW.</span>
              </div>

              {/* Bold Headline & Subheadline */}
              <div className="space-y-4">
                <h1 className="font-display font-extrabold text-slate-900 text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                  Smart Money <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm">Tracker</span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed">
                  Track your expenses, set budgets, and watch your savings grow in real-time. Elegant, effortless, and entirely offline-capable.
                </p>
              </div>

              {/* Feature Checklist (3-4 items with small icons) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuresList.map((feat) => {
                  const IconComponent = feat.icon;
                  return (
                    <div key={feat.id} className="flex gap-3 items-start group">
                      <div className={`p-2 rounded-xl border ${feat.color} shrink-0 transition-transform group-hover:scale-110 duration-200`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm">{feat.title}</h3>
                        <p className="text-slate-500 text-xs mt-0.5 leading-snug">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all text-base">
                  Start Tracking <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="inline-flex items-center justify-center border border-slate-200 bg-white/85 hover:bg-white text-slate-700 font-semibold px-8 py-4 rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all text-base backdrop-blur-sm">
                  See How It Works
                </button>
              </div>

            </div>

            {/* Right column: Video container on Mobile, decorative subtle card wrapper on desktop to elevate depth */}
            <div className="md:col-span-6 lg:col-span-7 relative flex justify-center items-center">
              
              {/* Responsive: on mobile, stack text above video/card container */}
              {/* This section functions as the beautiful interactive viewport on Mobile screens */}
              <div className="w-full max-w-lg md:max-w-none bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/60 shadow-xl relative overflow-hidden block md:hidden">
                <div className="aspect-[4/3] w-full rounded-2xl bg-slate-100 overflow-hidden relative">
                  {/* Subtle Grid underlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-35" />
                  
                  {/* Video component explicitly responsive with object-cover and custom focus position */}
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover object-center"
                  >
                    <source src="/videos/hero.webm" type="video/webm" />
                    <source src="/videos/hero.mp4" type="video/mp4" />
                  </video>

                  {/* Absolute subtle watermark label */}
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-white font-mono text-[10px] tracking-widest flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    <span>LIVE PREVIEW</span>
                  </div>
                </div>

                <div className="mt-4 pt-2 space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                    <span>INTERACTIVE DEMO DISPLAY</span>
                    <span>4S LOOPING ANIMATION</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    The visual simulation showcases a glowing glass safe vault surrounded by budgeting cards, spending graphs, and coins, reflecting total asset growth security.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* 4. bottom feature badges */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {bottomBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base">{badge.title}</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </footer>

    </div>
  );
}
