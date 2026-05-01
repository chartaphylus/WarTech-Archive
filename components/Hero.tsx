'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Zap, Target, Anchor, Radio, Wifi, Lock } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-start sm:items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-steel-950" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(57,255,20,0.12),transparent_60%)]" />
        <div className="absolute bottom-0 inset-x-0 h-48 sm:h-64 bg-linear-to-t from-steel-950 via-steel-950/80 to-transparent" />
      </motion.div>

      {/* Floating HUD — Desktop only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        <motion.div 
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[8%] w-64 h-64 border border-neon-green/10 rounded-full opacity-20"
        />
        <motion.div 
          animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[5%] w-80 h-80 border border-neon-green/5 rounded-full opacity-10"
        />

        {/* Left HUD Panel */}
        <div className="absolute top-28 left-10 space-y-4">
          <div className="flex items-center gap-2">
            <Radio className="w-3 h-3 text-neon-green/50" />
            <span className="text-[8px] font-mono text-neon-green/40 tracking-widest">FREQ: 243.0 MHz</span>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-mono text-neon-green/30">LAT: 34.0522° N</p>
            <p className="text-[8px] font-mono text-neon-green/30">LNG: 118.2437° W</p>
          </div>
          <div className="w-20 h-px bg-neon-green/15 overflow-hidden">
            <motion.div animate={{ x: [-80, 80] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-full h-full bg-neon-green/50" />
          </div>
        </div>
         
        {/* Right HUD Panel */}
        <div className="absolute bottom-28 right-10 text-right space-y-2">
          <div className="flex items-center justify-end gap-2">
            <span className="text-[8px] font-mono text-neon-green/40 tracking-widest">UPLINK: ACTIVE</span>
            <Wifi className="w-3 h-3 text-neon-green/50" />
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-[8px] font-mono text-neon-green/30 tracking-widest">AES-256-XTS</span>
            <Lock className="w-3 h-3 text-neon-green/30" />
          </div>
        </div>
      </div>

      {/* ───── Main Content ───── */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-5 sm:px-6 w-full max-w-6xl mx-auto pt-20 sm:pt-0"
      >
        {/* Terminal Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 sm:gap-3 mb-5 sm:mb-12 px-3 sm:px-5 py-1.5 sm:py-2 border border-neon-green/30 bg-neon-green/5 backdrop-blur-md rounded-full"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_10px_#39ff14]" />
          <span className="text-[7px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.4em] uppercase text-neon-green">
            Central Intelligence Terminal · v4.0.1
          </span>
        </motion.div>

        {/* ── Title ── */}
        <div className="relative mb-8 sm:mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[3.2rem] sm:text-7xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter text-white leading-[0.85] drop-shadow-2xl"
          >
            War<span className="text-neon-green inline-block hover:animate-glitch">Tech</span>
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-steel-400/40 leading-[0.85] mt-1 sm:mt-4"
          >
            Archive
          </motion.h1>
        </div>

        {/* ── Subtitle ── */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[10px] sm:text-sm md:text-base text-steel-300 tracking-[0.15em] sm:tracking-[0.2em] uppercase max-w-xl sm:max-w-2xl mx-auto leading-relaxed font-bold px-2"
        >
          Exploring Military Technology, History, and Specifications
        </motion.p>

        {/* ── Feature Icons ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex justify-center gap-6 sm:gap-12 mt-10 sm:mt-14 mb-10 sm:mb-16"
        >
          {[
            { icon: Zap, label: 'Advanced Tech' },
            { icon: Target, label: 'Precision Stats' },
            { icon: Anchor, label: 'Global Fleet' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 sm:gap-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-steel-800 bg-steel-900/50 rounded-lg sm:rounded-xl group-hover:border-neon-green/40 transition-all duration-500">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-steel-500 group-hover:text-neon-green transition-colors" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-bold tracking-widest uppercase text-steel-600 group-hover:text-steel-400 transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 px-4 sm:px-0"
        >
          <Link
            href="#units"
            className="group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-neon-green text-black font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-sm overflow-hidden hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(57,255,20,0.2)] text-center"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            Initiate Archive Access
          </Link>
          <Link
            href="/admin/login"
            className="group relative px-8 sm:px-10 py-3.5 sm:py-4 border border-steel-700 bg-steel-900/50 text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-sm hover:border-neon-green/50 hover:bg-neon-green/5 transition-all duration-300 text-center"
          >
            Secure Terminal Login
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative Lines — Desktop only */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-neon-green/20 to-transparent" />
      <div className="absolute left-8 inset-y-0 w-px bg-linear-to-b from-transparent via-steel-800 to-transparent opacity-30 hidden lg:block" />
      <div className="absolute right-8 inset-y-0 w-px bg-linear-to-b from-transparent via-steel-800 to-transparent opacity-30 hidden lg:block" />

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-20 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-steel-700"
      >
        <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.4em] sm:tracking-[0.5em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-neon-green/40" />
      </motion.div>
    </div>
  );
}
