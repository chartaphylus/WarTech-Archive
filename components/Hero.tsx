'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, ChevronDown, Zap, Target, Anchor } from 'lucide-react';
import { useRef } from 'react';

export default function Hero({
  title = 'WarTech Archive',
  subtitle = 'Exploring Military Technology, History, and Specifications',
  description = '',
  showCTA = true,
}: {
  title?: string;
  subtitle?: string;
  description?: string;
  showCTA?: boolean;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-steel-950" />
        <div className="absolute inset-0 bg-tech-motif opacity-70" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(57,255,20,0.15),transparent_70%)]" />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-linear-to-t from-steel-950 via-steel-950/80 to-transparent" />
      </motion.div>

      {/* Floating HUD Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <motion.div 
            animate={{ 
                x: [0, 15, 0], 
                y: [0, -15, 0],
                rotate: [0, 5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[10%] w-64 h-64 border border-neon-green/10 rounded-full opacity-20"
         />
         <motion.div 
            animate={{ 
                x: [0, -20, 0], 
                y: [0, 10, 0],
                rotate: [0, -10, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[5%] w-80 h-80 border border-neon-green/5 rounded-full opacity-10"
         />
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 mb-12 px-5 py-2 border border-neon-green/30 bg-neon-green/5 backdrop-blur-md rounded-full"
        >
          <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_10px_#39ff14]" />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-neon-green">
            Central Intelligence Terminal · v4.0.1
          </span>
        </motion.div>

        <div className="relative mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black uppercase tracking-tighter text-white leading-[0.8] drop-shadow-2xl"
            >
              War<span className="text-neon-green inline-block hover:animate-glitch">Tech</span>
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-steel-400/50 leading-[0.8] mt-2"
            >
              Archive
            </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-base sm:text-lg text-steel-400 tracking-[0.2em] uppercase max-w-3xl mx-auto mb-6 leading-relaxed font-medium"
        >
          {subtitle}
        </motion.p>

        {description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-sm text-slate-500 max-w-2xl mx-auto mb-16 leading-relaxed font-bold uppercase tracking-wider"
          >
            {description}
          </motion.p>
        )}

        {/* Feature Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-wrap justify-center gap-12 mb-20"
        >
          {[
            { icon: Zap, label: 'Advanced Tech' },
            { icon: Target, label: 'Precision Stats' },
            { icon: Anchor, label: 'Global Fleet' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 flex items-center justify-center border border-steel-800 bg-steel-900/50 rounded-xl group-hover:border-neon-green/40 transition-all duration-500">
                <item.icon className="w-5 h-5 text-steel-500 group-hover:text-neon-green" />
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-steel-600 group-hover:text-steel-400 transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        {showCTA && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-8"
          >
            <Link
              href="#units"
              className="group relative px-10 py-4 bg-neon-green text-black font-black text-xs uppercase tracking-[0.3em] rounded-sm overflow-hidden hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(57,255,20,0.2)]"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              Initiate Archive Access
            </Link>
            <Link
              href="/admin/login"
              className="group relative px-10 py-4 border border-steel-700 bg-steel-900/50 text-white font-black text-xs uppercase tracking-[0.3em] rounded-sm hover:border-neon-green/50 hover:bg-neon-green/5 transition-all duration-300"
            >
              Secure Terminal Login
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-neon-green/20 to-transparent" />
      <div className="absolute left-8 inset-y-0 w-px bg-linear-to-b from-transparent via-steel-800 to-transparent opacity-30" />
      <div className="absolute right-8 inset-y-0 w-px bg-linear-to-b from-transparent via-steel-800 to-transparent opacity-30" />

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-steel-700"
      >
        <span className="text-[9px] font-bold tracking-[0.5em] uppercase">Initialize Scroll</span>
        <ChevronDown className="w-5 h-5 text-neon-green/40" />
      </motion.div>
    </div>
  );
}
