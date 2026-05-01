'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorldWarEvent } from '@/lib/data';
import { Calendar, Users, Flag, Swords, BookOpen, ChevronDown, ChevronUp, Flame, Shield, ScrollText, AlertTriangle, Star, ImageIcon } from 'lucide-react';
import Link from 'next/link';

const EVENT_TYPE_MAP: Record<string, { label: string; color: string; icon: typeof Swords }> = {
  battle:       { label: 'Pertempuran', color: 'text-red-400 bg-red-400/10 border-red-400/30', icon: Swords },
  treaty:       { label: 'Perjanjian', color: 'text-blue-400 bg-blue-400/10 border-blue-400/30', icon: ScrollText },
  invasion:     { label: 'Invasi', color: 'text-orange-400 bg-orange-400/10 border-orange-400/30', icon: Flame },
  surrender:    { label: 'Penyerahan', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30', icon: Flag },
  declaration:  { label: 'Deklarasi', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30', icon: BookOpen },
  event:        { label: 'Peristiwa', color: 'text-purple-400 bg-purple-400/10 border-purple-400/30', icon: Star },
  atrocity:     { label: 'Kekejaman', color: 'text-rose-500 bg-rose-500/10 border-rose-500/30', icon: AlertTriangle },
  turning_point: { label: 'Titik Balik', color: 'text-neon-green bg-neon-green/10 border-neon-green/30', icon: Shield },
};

export default function WorldWarTimeline({ events }: { events: WorldWarEvent[] }) {
  const [activeWar, setActiveWar] = useState<'all' | 'ww1' | 'ww2'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = activeWar === 'all' ? events : events.filter(e => e.war === activeWar);

  // Group events by year
  const groupedByYear = filtered.reduce<Record<number, WorldWarEvent[]>>((acc, event) => {
    if (!acc[event.year]) acc[event.year] = [];
    acc[event.year].push(event);
    return acc;
  }, {});

  const years = Object.keys(groupedByYear).map(Number).sort((a, b) => a - b);

  return (
    <div className="relative z-10 pb-24 sm:pb-16">
      {/* ── Hero Banner ── */}
      <div className="relative pt-20 sm:pt-24 pb-10 sm:pb-16 bg-linear-to-b from-red-950/30 via-steel-950 to-steel-950">
        <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-steel-950 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-steel-700/50 text-steel-400
                hover:border-neon-green/40 hover:text-neon-green hover:bg-neon-green/5
                rounded text-[10px] font-bold tracking-widest uppercase transition-all duration-200 group"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform duration-200">
                <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Beranda
            </Link>
            <span className="text-steel-700 text-xs">›</span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neon-green">Sejarah Perang Dunia</span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 sm:w-12 bg-red-500" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-400">Historical Archive</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.9]">
              Sejarah <span className="text-red-400">Perang Dunia</span>
            </h1>
            <p className="text-xs sm:text-sm text-steel-400 max-w-2xl leading-relaxed">
              Timeline lengkap peristiwa penting dari Perang Dunia I (1914–1918) dan Perang Dunia II (1939–1945) — pertempuran, perjanjian, invasi, dan momen yang mengubah arah sejarah dunia.
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 mt-6 sm:mt-8 mb-8 sm:mb-12">
        <div className="flex gap-2 sm:gap-3">
          {[
            { key: 'all' as const, label: 'Semua', count: events.length },
            { key: 'ww1' as const, label: 'Perang Dunia I', count: events.filter(e => e.war === 'ww1').length },
            { key: 'ww2' as const, label: 'Perang Dunia II', count: events.filter(e => e.war === 'ww2').length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveWar(tab.key); setExpandedId(null); }}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase rounded-sm border transition-all duration-300 ${
                activeWar === tab.key
                  ? 'text-neon-green border-neon-green/50 bg-neon-green/10 shadow-[0_0_12px_rgba(57,255,20,0.15)]'
                  : 'text-steel-400 border-steel-800 bg-steel-900/50 hover:border-steel-700 hover:text-steel-300'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 sm:ml-2 px-1 sm:px-1.5 py-0.5 rounded-sm text-[8px] sm:text-[9px] ${
                activeWar === tab.key ? 'bg-neon-green/20 text-neon-green' : 'bg-steel-800 text-steel-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-px bg-steel-800 hidden sm:block" />

        <div className="space-y-10 sm:space-y-16">
          {years.map((year) => (
            <div key={year}>
              {/* Year Marker */}
              <div className="relative flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-steel-900 border-2 border-neon-green/40 flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.15)] shrink-0">
                  <span className="text-sm sm:text-lg font-black text-neon-green tabular-nums">{year}</span>
                </div>
                <div className="h-px flex-1 bg-linear-to-r from-neon-green/30 to-transparent" />
              </div>

              {/* Events for this year */}
              <div className="space-y-4 sm:space-y-6 sm:pl-24">
                <AnimatePresence>
                  {groupedByYear[year].map((event, idx) => {
                    const typeInfo = EVENT_TYPE_MAP[event.event_type] || EVENT_TYPE_MAP.event;
                    const TypeIcon = typeInfo.icon;
                    const isExpanded = expandedId === event.id;

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="relative"
                      >
                        {/* Connector dot — desktop only */}
                        <div className="hidden sm:block absolute -left-[calc(var(--spacing)*24-2px)] top-6 w-3 h-3 rounded-full bg-steel-800 border-2 border-steel-700" />

                        <div 
                          className={`bg-steel-900/60 border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:border-steel-600 ${
                            isExpanded ? 'border-steel-600 shadow-xl' : 'border-steel-800'
                          }`}
                          onClick={() => setExpandedId(isExpanded ? null : event.id)}
                        >
                          {/* Event Header */}
                          <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                            <div className={`self-start p-2 sm:p-2.5 rounded-lg border ${typeInfo.color}`}>
                              <TypeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>

                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${typeInfo.color}`}>
                                  {typeInfo.label}
                                </span>
                                <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                                  event.war === 'ww1' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                }`}>
                                  {event.war === 'ww1' ? 'PD I' : 'PD II'}
                                </span>
                              </div>
                              <h3 className="text-base sm:text-lg font-black text-white leading-tight pr-8 sm:pr-0">
                                {event.title}
                              </h3>
                              {event.event_date && (
                                <div className="flex items-center gap-1.5 text-steel-500">
                                  <Calendar className="w-3 h-3" />
                                  <span className="text-[10px] sm:text-xs font-mono">
                                    {new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-steel-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-steel-500" />
                              )}
                            </div>
                          </div>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-4 sm:pt-5 space-y-4 sm:space-y-5 border-t border-steel-800">
                                  {/* Event Image */}
                                  {event.image_url && (
                                    <div className="relative w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden border border-steel-800">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={event.image_url}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                      />
                                      <div className="absolute inset-0 bg-linear-to-t from-steel-950/60 to-transparent" />
                                    </div>
                                  )}

                                  <p className="text-xs sm:text-sm text-steel-300 leading-relaxed sm:leading-loose">
                                    {event.description}
                                  </p>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {event.key_figures && (
                                      <div className="p-3 sm:p-4 bg-steel-950/50 border border-steel-800 rounded-lg sm:rounded-xl space-y-2">
                                        <div className="flex items-center gap-2 text-neon-green">
                                          <Users className="w-3.5 h-3.5" />
                                          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Tokoh Penting</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                          {event.key_figures.split(',').map((figure, i) => (
                                            <span key={i} className="text-[9px] sm:text-[10px] px-2 py-0.5 bg-steel-800 text-steel-300 rounded font-medium">
                                              {figure.trim()}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {event.nations && (
                                      <div className="p-3 sm:p-4 bg-steel-950/50 border border-steel-800 rounded-lg sm:rounded-xl space-y-2">
                                        <div className="flex items-center gap-2 text-blue-400">
                                          <Flag className="w-3.5 h-3.5" />
                                          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Negara Terlibat</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                          {event.nations.split(',').map((nation, i) => (
                                            <span key={i} className="text-[9px] sm:text-[10px] px-2 py-0.5 bg-steel-800 text-steel-300 rounded font-medium">
                                              {nation.trim()}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <BookOpen className="w-12 h-12 text-steel-700 mx-auto mb-4" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-steel-600">Tidak ada data</p>
            <p className="text-xs text-steel-500 mt-2">Jalankan SQL di Supabase untuk menambahkan data peristiwa.</p>
          </div>
        )}
      </div>
    </div>
  );
}
