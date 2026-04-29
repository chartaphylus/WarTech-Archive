'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface BackButtonProps {
  fallback?: string;
  label?: string;
}

export default function BackButton({ fallback = '/', label = 'Kembali' }: BackButtonProps) {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.back()}
      className="group relative inline-flex items-center gap-3 px-5 py-2.5 bg-steel-900/50 border border-steel-700/50 overflow-hidden transition-all duration-300 hover:border-neon-green/40 hover:shadow-[0_0_15px_rgba(57,255,20,0.1)]"
    >
      {/* Background hover effect */}
      <div className="absolute inset-0 bg-neon-green/0 group-hover:bg-neon-green/5 transition-colors duration-300" />
      
      {/* Left accent line */}
      <div className="absolute left-0 top-0 w-1 h-full bg-steel-600 group-hover:bg-neon-green transition-colors duration-300" />
      
      <svg
        viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5}
        className="relative z-10 w-3.5 h-3.5 text-steel-400 group-hover:text-neon-green transition-colors duration-300"
      >
        <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      
      <span className="relative z-10 text-[10px] font-bold tracking-[0.2em] uppercase text-steel-300 group-hover:text-neon-green transition-colors duration-300">
        {label}
      </span>
      
      {/* HUD corner marks */}
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-steel-600 group-hover:border-neon-green transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-steel-600 group-hover:border-neon-green transition-colors duration-300" />
    </motion.button>
  );
}
