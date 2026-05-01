'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UnitCard from './UnitCard';
import { MilitaryUnit } from '@/types/military';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const SUBCATEGORY_LABELS: Record<string, string> = {
  'main-battle-tank': 'Main Battle Tanks',
  'light-tank': 'Light Tanks',
  'heavy-tank': 'Heavy Tanks',
  'anti-materiel': 'Anti-Materiel',
  'designated-marksman': 'Designated Marksman',
  'bolt-action': 'Bolt-Action',
  'assault-rifle': 'Assault Rifles',
  'battle-rifle': 'Battle Rifles',
  'aircraft-carrier': 'Aircraft Carriers',
  'destroyer': 'Destroyers',
  'cruiser': 'Cruisers',
  'submarine': 'Submarines',
  'frigate': 'Frigates',
};

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

interface CategoryContentProps {
  units: MilitaryUnit[];
}

export default function CategoryContent({ units }: CategoryContentProps) {
  const [active, setActive] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const subcategories = Array.from(new Set(units.map((u) => u.subcategory)));
  const filtered = active ? units.filter((u) => u.subcategory === active) : units;
  
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedUnits = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  // Reset page when filter or pageSize changes
  const handleFilterChange = (sub: string | null) => {
    setActive(sub);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <>
      {/* ── Subcategory Filter Tabs ── */}
      <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-3 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 sm:gap-3 flex-nowrap min-w-max">
          <button
            onClick={() => handleFilterChange(null)}
            className={`relative group px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-sm text-[9px] sm:text-[10px] font-bold tracking-widest uppercase transition-all duration-300 overflow-hidden
              ${!active
                ? 'text-neon-green shadow-[0_0_15px_rgba(57,255,20,0.15)] bg-steel-800/80'
                : 'text-steel-400 bg-steel-900/50 hover:text-neon-green hover:bg-steel-800/50'
              }`}
          >
            <div className={`absolute inset-0 border transition-colors duration-300 ${!active ? 'border-neon-green/50' : 'border-steel-700/50 group-hover:border-neon-green/30'}`} />
            {!active && <div className="absolute top-0 left-0 w-1 sm:w-1.5 h-full bg-neon-green" />}
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              Semua
              <span className={`px-1 sm:px-1.5 py-0.5 rounded-sm text-[8px] sm:text-[9px] ${!active ? 'bg-neon-green/20 text-neon-green' : 'bg-steel-800 text-steel-500'}`}>
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
                onClick={() => handleFilterChange(sub)}
                className={`relative group px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-sm text-[9px] sm:text-[10px] font-bold tracking-widest uppercase transition-all duration-300 overflow-hidden
                  ${isActive
                    ? 'text-neon-green shadow-[0_0_15px_rgba(57,255,20,0.15)] bg-steel-800/80'
                    : 'text-steel-400 bg-steel-900/50 hover:text-neon-green hover:bg-steel-800/50'
                  }`}
              >
                <div className={`absolute inset-0 border transition-colors duration-300 ${isActive ? 'border-neon-green/50' : 'border-steel-700/50 group-hover:border-neon-green/30'}`} />
                {isActive && <div className="absolute top-0 left-0 w-1 sm:w-1.5 h-full bg-neon-green" />}
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  {SUBCATEGORY_LABELS[sub] ?? sub}
                  <span className={`px-1 sm:px-1.5 py-0.5 rounded-sm text-[8px] sm:text-[9px] ${isActive ? 'bg-neon-green/20 text-neon-green' : 'bg-steel-800 text-steel-500'}`}>
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Page Size Selector + Info ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8 px-1">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[9px] sm:text-[10px] font-bold text-steel-500 uppercase tracking-widest">Tampilkan</span>
          <div className="flex gap-1">
            {PAGE_SIZE_OPTIONS.map((size) => (
              <button
                key={size}
                onClick={() => handlePageSizeChange(size)}
                className={`px-2 sm:px-2.5 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-bold rounded transition-all duration-200 ${
                  pageSize === size
                    ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                    : 'bg-steel-900/50 text-steel-500 border border-steel-800 hover:border-steel-700 hover:text-steel-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold text-steel-500 uppercase tracking-widest">per halaman</span>
        </div>
        <p className="text-[9px] sm:text-[10px] text-steel-600 font-mono tracking-wider">
          Menampilkan {Math.min((currentPage - 1) * pageSize + 1, filtered.length)}-{Math.min(currentPage * pageSize, filtered.length)} dari {filtered.length} unit
        </p>
      </div>

      {/* ── Units Grid ── */}
      {paginatedUnits.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {paginatedUnits.map((unit, i) => (
              <motion.div
                key={unit.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
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
          className="flex flex-col items-center justify-center py-24 sm:py-32 text-steel-600 border border-dashed border-steel-800 rounded-lg bg-steel-900/20"
        >
          <div className="w-12 h-12 mb-4 border border-steel-700 rounded flex items-center justify-center animate-pulse">
            <div className="w-6 h-px bg-steel-600" />
          </div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase">No Signals Detected</p>
          <p className="text-xs text-steel-500 mt-2">Tidak ada unit ditemukan untuk filter ini.</p>
        </motion.div>
      )}

      {/* ── Pagination Controls ── */}
      {totalPages > 1 && (
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1.5 sm:p-2 rounded border border-steel-800 text-steel-500 hover:text-neon-green hover:border-neon-green/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronsLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            {/* Prev */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 sm:p-2 rounded border border-steel-800 text-steel-500 hover:text-neon-green hover:border-neon-green/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                if (totalPages <= 7) return true;
                if (page === 1 || page === totalPages) return true;
                if (Math.abs(page - currentPage) <= 1) return true;
                return false;
              })
              .map((page, idx, arr) => {
                const showEllipsis = idx > 0 && page - arr[idx - 1] > 1;
                return (
                  <span key={page} className="contents">
                    {showEllipsis && (
                      <span className="px-1 text-steel-700 text-xs">···</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-[28px] sm:min-w-[32px] h-7 sm:h-8 rounded text-[10px] sm:text-xs font-bold transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-neon-green text-black shadow-[0_0_12px_rgba(57,255,20,0.3)]'
                          : 'border border-steel-800 text-steel-500 hover:text-neon-green hover:border-neon-green/30'
                      }`}
                    >
                      {page}
                    </button>
                  </span>
                );
              })}

            {/* Next */}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 sm:p-2 rounded border border-steel-800 text-steel-500 hover:text-neon-green hover:border-neon-green/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1.5 sm:p-2 rounded border border-steel-800 text-steel-500 hover:text-neon-green hover:border-neon-green/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronsRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
