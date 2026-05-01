'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight, Shield, Layers, Cpu, Database } from 'lucide-react';

interface SectionData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  image_url: string;
}

export default function AnimatedHome({ sections }: { sections: SectionData[] }) {
  return (
    <div id="units" className="space-y-0 relative z-10">
      {sections.map((section, idx) => (
        <HomeSection key={section.id} section={section} index={idx} />
      ))}
    </div>
  );
}

function HomeSection({ section, index }: { section: SectionData, index: number }) {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: false,
  });

  const isReversed = index % 2 !== 0;

  return (
    <section 
      ref={ref}
      className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center py-16 sm:py-24 overflow-hidden border-b border-steel-900"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-steel-950/90 z-10" />
        <img 
          src={section.image_url} 
          alt="" 
          className="w-full h-full object-cover opacity-20 sm:opacity-30 transition-transform duration-[10s] ease-out"
          style={{ 
            transform: inView 
              ? `scale(1.1) translate(${isReversed ? '1%' : '-1%'}, 1%)` 
              : 'scale(1) translate(0, 0)' 
          }}
        />
        <div className="absolute inset-0 bg-tech-motif opacity-40 sm:opacity-60 z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-15 sm:opacity-20 z-10" />
        <div className="absolute inset-x-0 top-0 h-32 sm:h-40 bg-linear-to-b from-steel-950 to-transparent z-20" />
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-linear-to-t from-steel-950 to-transparent z-20" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 relative z-30">
        <div className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* ── Content Box ── */}
          <motion.div 
            initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full space-y-5 sm:space-y-8"
          >
            {/* Classification Tag */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-px w-8 sm:w-12 bg-neon-green" />
                <span className="text-[9px] sm:text-[10px] font-black tracking-[0.4em] sm:tracking-[0.5em] uppercase text-neon-green">
                  Classification: {section.slug.toUpperCase()}
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                {section.title}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-neon-green font-mono opacity-80">{section.subtitle}</p>
            </div>

            {/* Dossier Card */}
            <div className="relative p-5 sm:p-8 bg-steel-900/40 border border-steel-800 backdrop-blur-xl rounded-xl sm:rounded-2xl group">
              <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-20">
                <Layers className="w-8 h-8 sm:w-12 sm:h-12 text-neon-green" />
              </div>
              <div className="space-y-1 mb-4 sm:mb-6">
                <p className="text-[8px] sm:text-[9px] font-bold text-neon-green/60 uppercase tracking-widest">Dossier: Historical Context</p>
                <div className="h-0.5 w-12 sm:w-16 bg-neon-green/30" />
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-steel-300 leading-relaxed font-medium">
                {section.content}
              </p>
              
              {/* Tags */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-steel-800 flex flex-wrap gap-4 sm:gap-6">
                {[
                  { icon: Shield, label: 'Armor Grade A+' },
                  { icon: Cpu, label: 'Advanced targeting' },
                  { icon: Database, label: 'Full technical data' }
                ].map((tag, i) => (
                  <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                    <tag.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-green" />
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-steel-500">{tag.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Link */}
            <Link 
              href={`/category/${section.slug}`}
              className="inline-flex items-center gap-3 sm:gap-4 group text-white hover:text-neon-green transition-colors"
            >
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Access Full Dossier</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-steel-700 flex items-center justify-center group-hover:border-neon-green group-hover:bg-neon-green/10 transition-all">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>

          {/* ── Visual Box ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="flex-1 w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[500px] mx-auto"
          >
            <div className="relative aspect-square">
              {/* Outer Rings — hidden on small mobile */}
              <div className="absolute inset-[-8%] border border-neon-green/5 rounded-full animate-spin-slow hidden sm:block" />
              <div className="absolute inset-[-16%] border border-neon-green/5 rounded-full animate-reverse-spin-slow hidden sm:block" />
              
              {/* Main Image Frame */}
              <div className="relative h-full w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-steel-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <img 
                  src={section.image_url} 
                  alt={section.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-steel-950 via-transparent to-transparent opacity-60" />
                
                {/* HUD Data Overlay */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 bg-steel-950/80 backdrop-blur-md border border-steel-700 rounded-lg sm:rounded-xl">
                   <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="h-1 w-16 sm:w-20 bg-neon-green/40 rounded" />
                        <div className="h-1 w-10 sm:w-12 bg-neon-green/20 rounded" />
                        <span className="text-[8px] sm:text-[9px] font-mono text-neon-green/60 block mt-1.5 sm:mt-2 tracking-widest uppercase">Target ID: {section.slug}-001</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[7px] sm:text-[8px] font-black text-steel-500 uppercase block mb-1">Status</span>
                        <span className="px-1.5 sm:px-2 py-0.5 bg-neon-green/10 text-neon-green text-[8px] sm:text-[9px] font-black rounded border border-neon-green/20">ACTIVE</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Scanning Effect */}
              <div className="scanline z-50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
