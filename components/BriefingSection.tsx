'use client';

import { motion } from 'framer-motion';
import { Terminal, Globe, Cpu, Radio, Wifi, Lock, Satellite, ShieldCheck, Activity, Radar, Signal, Database, Zap } from 'lucide-react';

export default function BriefingSection({ content }: { content: string }) {
  return (
    <section className="relative py-16 sm:py-28 overflow-hidden border-y border-steel-900 bg-steel-950/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* ── Left Side: Full HUD Dashboard — Desktop only ── */}
          <div className="hidden lg:flex flex-col gap-4 max-w-[520px]">
            
            {/* Row 1: Status Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-steel-900/80 border border-steel-800 rounded-xl backdrop-blur-xl space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neon-green" />
                  <span className="text-[8px] font-black text-neon-green uppercase tracking-widest">Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#39ff14]" />
                  <span className="text-xs font-mono text-neon-green">ONLINE</span>
                </div>
              </div>
              <div className="p-4 bg-steel-900/80 border border-steel-800 rounded-xl backdrop-blur-xl space-y-2">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-neon-green/60" />
                  <span className="text-[8px] font-black text-steel-400 uppercase tracking-widest">Encrypt</span>
                </div>
                <span className="text-xs font-mono text-steel-300">AES-256</span>
              </div>
              <div className="p-4 bg-steel-900/80 border border-steel-800 rounded-xl backdrop-blur-xl space-y-2">
                <div className="flex items-center gap-2">
                  <Satellite className="w-4 h-4 text-neon-green/60" />
                  <span className="text-[8px] font-black text-steel-400 uppercase tracking-widest">Uplink</span>
                </div>
                <span className="text-xs font-mono text-steel-300">STABLE</span>
              </div>
            </div>

            {/* Row 2: Radar + Network */}
            <div className="grid grid-cols-2 gap-3">
              {/* Radar Display */}
              <div className="p-5 bg-steel-900/80 border border-steel-800 rounded-xl backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Radar className="w-4 h-4 text-neon-green/70" />
                  <span className="text-[8px] font-black text-steel-400 uppercase tracking-widest">Global Radar</span>
                </div>
                <div className="relative w-full aspect-square max-w-[180px] mx-auto">
                  <div className="absolute inset-0 border border-neon-green/20 rounded-full" />
                  <div className="absolute inset-[15%] border border-neon-green/15 rounded-full" />
                  <div className="absolute inset-[30%] border border-neon-green/10 rounded-full" />
                  {/* Crosshairs */}
                  <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-neon-green/10" /></div>
                  <div className="absolute inset-0 flex justify-center"><div className="h-full w-px bg-neon-green/10" /></div>
                  {/* Sweep */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                    style={{ transformOrigin: 'center' }}
                  >
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-px bg-linear-to-r from-neon-green/60 to-transparent origin-left" />
                  </motion.div>
                  {/* Blips */}
                  <div className="absolute top-[25%] left-[60%] w-1.5 h-1.5 bg-neon-green rounded-full animate-ping" />
                  <div className="absolute top-[55%] left-[30%] w-1 h-1 bg-neon-green/60 rounded-full animate-pulse" />
                  <div className="absolute top-[70%] left-[65%] w-1 h-1 bg-neon-green/40 rounded-full animate-pulse delay-300" />
                  {/* Center Dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neon-green rounded-full shadow-[0_0_6px_#39ff14]" />
                </div>
              </div>

              {/* Network Metrics */}
              <div className="flex flex-col gap-3">
                <div className="flex-1 p-4 bg-steel-900/80 border border-steel-800 rounded-xl backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-neon-green/70" />
                    <span className="text-[8px] font-black text-steel-400 uppercase tracking-widest">Latency</span>
                  </div>
                  <div className="flex gap-1 items-end h-10">
                    {[40, 65, 45, 85, 55, 35, 80, 50, 70, 30].map((h, i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: [`${h}%`, `${Math.min(100, h + 25)}%`, `${h}%`] }}
                        transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                        className={`w-1.5 rounded-sm ${i < 8 ? 'bg-neon-green' : 'bg-steel-700'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-1 p-4 bg-steel-900/80 border border-steel-800 rounded-xl backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Signal className="w-4 h-4 text-neon-green/70" />
                    <span className="text-[8px] font-black text-steel-400 uppercase tracking-widest">Signal</span>
                  </div>
                  <div className="flex items-end gap-1 h-6">
                    {[1,2,3,4,5].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                        className="bg-neon-green rounded-sm"
                        style={{ width: '6px', height: `${i * 20}%` }}
                      />
                    ))}
                    <span className="ml-2 text-[10px] font-mono text-neon-green">98%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Info Bar */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Database, label: 'Records', value: '12.4K' },
                { icon: Zap, label: 'Active', value: '3 Cats' },
                { icon: Radio, label: 'Freq', value: '243Mhz' },
                { icon: Wifi, label: 'Nodes', value: '195+' },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-steel-900/60 border border-steel-800/60 rounded-lg text-center space-y-1">
                  <item.icon className="w-3.5 h-3.5 text-neon-green/50 mx-auto" />
                  <p className="text-[10px] font-mono text-steel-300">{item.value}</p>
                  <p className="text-[7px] font-black text-steel-600 uppercase tracking-widest">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Side: Content from DB ── */}
          <div className="space-y-6 sm:space-y-10">
            <div className="space-y-3 sm:space-y-5">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 border border-neon-green/30 bg-neon-green/10 rounded-sm text-neon-green">
                <div className="flex gap-0.5 sm:gap-1">
                  <div className="w-0.5 sm:w-1 h-2.5 sm:h-3 bg-neon-green/40 animate-pulse" />
                  <div className="w-0.5 sm:w-1 h-2.5 sm:h-3 bg-neon-green/60 animate-pulse delay-75" />
                  <div className="w-0.5 sm:w-1 h-2.5 sm:h-3 bg-neon-green/80 animate-pulse delay-150" />
                </div>
                <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em]">Operational Briefing</span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                Intelligence <span className="text-neon-green">Overview</span>
              </h2>
            </div>

            {/* Quote Card */}
            <div className="relative p-5 sm:p-10 bg-steel-900/40 border border-steel-800 rounded-xl sm:rounded-3xl backdrop-blur-md">
              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-neon-green/50" />
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-neon-green/50" />
               
              <div className="absolute top-0 right-0 p-3 sm:p-6 opacity-5">
                <Terminal className="w-16 h-16 sm:w-32 sm:h-32 text-white" />
              </div>

              <p className="text-base sm:text-xl md:text-2xl text-steel-200 leading-relaxed font-medium italic relative z-10">
                &ldquo;{content}&rdquo;
              </p>

              <div className="mt-6 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-10 border-t border-steel-800/50">
                <div className="space-y-1.5 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 text-neon-green">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest">Global Reach</span>
                  </div>
                  <p className="text-[11px] sm:text-sm text-steel-400 leading-relaxed">Cross-border intelligence gathering on all military systems across 195+ nations.</p>
                </div>
                <div className="space-y-1.5 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 text-neon-green">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest">Neural Analysis</span>
                  </div>
                  <p className="text-[11px] sm:text-sm text-steel-400 leading-relaxed">Proprietary AI-driven pattern recognition for weapon tactical specifications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
