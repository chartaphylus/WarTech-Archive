'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UnitCard from './UnitCard';
import { MilitaryUnit } from '@/types/military';

const SUBCATEGORY_LABELS: Record<string, string> = {
  'main-battle-tank': 'Main Battle Tanks',
  'light-tank': 'Light Tanks',
  'heavy-tank': 'Heavy Tanks',
  'anti-materiel': 'Anti-Materiel',
  'designated-marksman': 'Designated Marksman',
  'bolt-action': 'Bolt-Action',
  'aircraft-carrier': 'Aircraft Carriers',
  'destroyer': 'Destroyers',
  'cruiser': 'Cruisers',
  'submarine': 'Submarines',
  'frigate': 'Frigates',
};

interface CategoryContentProps {
  units: MilitaryUnit[];
}

export default function CategoryContent({ units }: CategoryContentProps) {
  const [active, setActive] = useState<string | null>(null);

  const subcategories = Array.from(new Set(units.map((u) => u.subcategory)));
  const filtered = active ? units.filter((u) => u.subcategory === active) : units;

  return (
    <>
      {/* Subcategory filter tabs (HUD Style) */}
      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() => setActive(null)}
          className={`relative group px-5 py-2.5 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all duration-300 overflow-hidden
            ${!active
              ? 'text-neon-green shadow-[0_0_15px_rgba(57,255,20,0.15)] bg-steel-800/80'
              : 'text-steel-400 bg-steel-900/50 hover:text-neon-green hover:bg-steel-800/50'
            }`}
        >
          {/* Active border/glow effects */}
          <div className={`absolute inset-0 border transition-colors duration-300 ${!active ? 'border-neon-green/50' : 'border-steel-700/50 group-hover:border-neon-green/30'}`} />
          {!active && <div className="absolute top-0 left-0 w-1.5 h-full bg-neon-green" />}
          
          <span className="relative z-10 flex items-center gap-2">
            Semua
            <span className={`px-1.5 py-0.5 rounded-sm text-[9px] ${!active ? 'bg-neon-green/20 text-neon-green' : 'bg-steel-800 text-steel-500 group-hover:text-neon-green/70'}`}>
              {units.length}
            </span>
          </span>
        </button>

        {subcategories.map((sub) => {
          const count = units.filter((u) => u.subcategory === sub).length;
          const isActive = active === sub;
          return (
            <button
              key={sub}
              onClick={() => setActive(sub)}
              className={`relative group px-5 py-2.5 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all duration-300 overflow-hidden
                ${isActive
                  ? 'text-neon-green shadow-[0_0_15px_rgba(57,255,20,0.15)] bg-steel-800/80'
                  : 'text-steel-400 bg-steel-900/50 hover:text-neon-green hover:bg-steel-800/50'
                }`}
            >
              {/* Active border/glow effects */}
              <div className={`absolute inset-0 border transition-colors duration-300 ${isActive ? 'border-neon-green/50' : 'border-steel-700/50 group-hover:border-neon-green/30'}`} />
              {isActive && <div className="absolute top-0 left-0 w-1.5 h-full bg-neon-green" />}
              
              <span className="relative z-10 flex items-center gap-2">
                {SUBCATEGORY_LABELS[sub] ?? sub}
                <span className={`px-1.5 py-0.5 rounded-sm text-[9px] ${isActive ? 'bg-neon-green/20 text-neon-green' : 'bg-steel-800 text-steel-500 group-hover:text-neon-green/70'}`}>
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Units grid with animations */}
      {filtered.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filtered.map((unit, i) => (
              <motion.div
                key={unit.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              >
                <UnitCard unit={unit} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="flex flex-col items-center justify-center py-32 text-steel-600 border border-dashed border-steel-800 rounded-lg bg-steel-900/20"
        >
          <div className="w-12 h-12 mb-4 border border-steel-700 rounded flex items-center justify-center animate-pulse">
            <div className="w-6 h-px bg-steel-600" />
          </div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase">No Signals Detected</p>
          <p className="text-xs text-steel-500 mt-2">Tidak ada unit ditemukan untuk filter ini.</p>
        </motion.div>
      )}
    </>
  );
}
