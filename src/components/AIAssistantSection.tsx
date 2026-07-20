"use client";

import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Send, 
  User, 
  HelpCircle,
  ArrowRight,
  MessageSquare,
  Search,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

/* 
========================================================================
DESIGN PLAN - AI ASSISTANT SECTION
========================================================================
1. Style & Palette:
   - Base Color: A clean, soft off-white canvas with very subtle warm grey undertones (#FAF9F6) to seamlessly continue from HowItWorksSection.
   - Accents: Deep vibrant blue (#0060ff / bg-blue-600) for the user bubbles and active buttons.
   - Glows: Ambient soft glow backdrops using Tailwind blur-3xl classes with custom high-transparency color overlays (e.g. blue-400/10, purple-400/5) to keep it light and subdued rather than heavy pastel gradients.
   - Cards: Glass-morphism rounded-2xl panels with fine-line borders (border-slate-200/60) and generous shadows to reflect premium craftsmanship.

2. Interaction & Example Questions:
   - Interactive Suggestion Chips: Clicking an example chip will dynamically change the active chat message in the mockup, resetting the typing animation for an immersive interactive experience!
   - Examples Included:
     1. "How much did I spend on food this month?"
     2. "Am I on track with my savings goal?"
     3. "What's my biggest expense category?"

3. Chat Interface Mockup (Right Column):
   - A highly polished smartphone or browser container mockup representing the active MoneyTracker chat interface.
   - User Bubble: Sleek dark blue bubble with white text, positioned on the right.
   - AI Bubble: Soft slate-50 background with detailed, human-focused analytics responses, accompanied by a custom glowing Sparkle/Bot icon avatar on the left.
   - Animated typing indicator dots for when a new message is loaded.

4. Motion & Sequencing:
   - Staggered initial entrance animations using motion/react's whileInView (one-time triggered).
   - Smooth slide-up transitions for the text columns and micro-bounce scales for interactive chips.
========================================================================
*/

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const chatScenarios: Record<string, ChatMessage[]> = {
  coffee: [
    {
      id: 'u1',
      sender: 'user',
      text: "How much did I spend on coffee this month?",
      timestamp: "10:24 AM"
    },
    {
      id: 'a1',
      sender: 'assistant',
      text: "You've spent $47.25 on coffee this month across 12 visits — that's about $3.94 per visit. This is 14% lower than your previous month's coffee run. Excellent progress on cutting down!",
      timestamp: "10:24 AM"
    }
  ],
  food: [
    {
      id: 'u2',
      sender: 'user',
      text: "How much did I spend on food this month?",
      timestamp: "11:02 AM"
    },
    {
      id: 'a2',
      sender: 'assistant',
      text: "You've spent $420.00 on Groceries & Dining. You have $80.00 left in your monthly Food budget. With 12 days remaining, I recommend keeping dining out to under $6.50/day to stay on track.",
      timestamp: "11:02 AM"
    }
  ],
  savings: [
    {
      id: 'u3',
      sender: 'user',
      text: "Am I on track with my savings goal?",
      timestamp: "11:05 AM"
    },
    {
      id: 'a3',
      sender: 'assistant',
      text: "Yes, you are currently at 84% of your $500 monthly emergency fund goal! Your current trajectory puts you on pace to complete it 3 days early if your spending remains stable.",
      timestamp: "11:05 AM"
    }
  ],
  expense: [
    {
      id: 'u4',
      sender: 'user',
      text: "What's my biggest expense category?",
      timestamp: "11:07 AM"
    },
    {
      id: 'a4',
      sender: 'assistant',
      text: "Your biggest category is Housing ($956.48, 40% of total), followed by Groceries ($420.00). Transportation is third at $358.68. Everything else is well below average this period.",
      timestamp: "11:07 AM"
    }
  ]
};

export default function AIAssistantSection() {
  const [activeScenario, setActiveScenario] = useState<string>('coffee');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>(chatScenarios.coffee);

  const handleScenarioChange = (key: string) => {
    if (key === activeScenario) return;
    
    setActiveScenario(key);
    setIsTyping(true);
    // Hide AI message momentarily to simulate typing
    setVisibleMessages([chatScenarios[key][0]]);
    
    setTimeout(() => {
      setIsTyping(false);
      setVisibleMessages(chatScenarios[key]);
    }, 1200);
  };

  const suggestions = [
    { key: 'coffee', label: 'How much did I spend on coffee?' },
    { key: 'food', label: 'How much did I spend on food this month?' },
    { key: 'savings', label: 'Am I on track with my savings goal?' },
    { key: 'expense', label: "What's my biggest expense category?" }
  ];

  return (
    <section 
      id="ai-assistant" 
      className="relative w-full py-24 md:py-32 bg-[#FAF9F6] overflow-hidden"
    >
      {/* Soft Ambient Glows (subdued so they remain elegant and clean) */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-400/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Thin line subtle border at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT Column: Content and Suggestions */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Header / Eyebrow */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50/80 border border-blue-100/50"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                AI Assistant
              </motion.span>
              
              <motion.span 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200"
              >
                Coming soon
              </motion.span>
            </div>

            {/* Headline & Subheadline */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 mb-6"
            >
              Just ask. <br />It's that simple.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 font-sans mb-8 leading-relaxed"
            >
              Ask MoneyTracker anything about your spending, and get a real, customized answer instantly. No digging through files, no complex spreadsheets, just conversational clarity.
            </motion.p>

            {/* Suggestion Chips */}
            <div className="flex flex-col gap-3.5">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Click to try queries</span>
              
              <div className="flex flex-col gap-2.5 max-w-md">
                {suggestions.map((item, index) => {
                  const isActive = activeScenario === item.key;
                  return (
                    <motion.button
                      key={item.key}
                      onClick={() => handleScenarioChange(item.key)}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      className={`text-left text-sm px-4 py-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                        isActive 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/15' 
                          : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-blue-200' : 'text-slate-400'}`} />
                        <span className="font-medium tracking-tight">{item.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-blue-100 translate-x-0.5' : 'text-slate-300 group-hover:translate-x-0.5'
                      }`} />
                    </motion.button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT Column: Gorgeous Chat Interface Mockup */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
              className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden"
            >
              
              {/* Chat Mockup Header */}
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
                    <Bot className="w-5.5 h-5.5" />
                    {/* Active green status light */}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
                      MoneyTracker Assistant
                    </h4>
                    <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                      Always ready to assist
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-blue-50 border border-blue-100/50 text-blue-600 font-bold px-2.5 py-0.5 rounded-md">
                    Pro Beta
                  </span>
                </div>
              </div>

              {/* Chat Mockup Message Area */}
              <div className="p-6 h-[290px] flex flex-col gap-4 overflow-y-auto bg-slate-50/40">
                {visibleMessages.map((msg, index) => {
                  const isUser = msg.sender === 'user';
                  
                  return (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                    >
                      {/* Avatar */}
                      {!isUser && (
                        <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/60 shadow-sm flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                      )}

                      {/* Bubble */}
                      <div className="flex flex-col gap-1">
                        <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                          isUser 
                            ? 'bg-blue-600 text-white rounded-tr-none shadow-sm' 
                            : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm shadow-slate-100'
                        }`}>
                          {msg.text}
                        </div>
                        <span className={`text-[10px] text-slate-400 font-medium ${isUser ? 'text-right mr-1' : 'ml-1'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 max-w-[85%] mr-auto items-end"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/60 shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-white border border-slate-100 p-3.5 px-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5 h-10">
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input Area Mockup */}
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex gap-2 items-center bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-2">
                  <div className="flex-1 text-slate-400 text-xs font-medium cursor-not-allowed select-none">
                    Ask me anything about your finances...
                  </div>
                  <button className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white cursor-not-allowed opacity-90">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Integration Info tags */}
                <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Fully Encrypted
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> No Spreadsheet Export Needed
                  </span>
                </div>
              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
