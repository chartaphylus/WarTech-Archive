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
    <div className="space-y-0 relative z-10">
      {sections.map((section, idx) => (
        <HomeSection key={section.id} section={section} index={idx} />
      ))}
    </div>
  );
}

function HomeSection({ section, index }: { section: SectionData, index: number }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const isReversed = index % 2 !== 0;

  return (
    <section 
      ref={ref}
      className="relative min-h-[90vh] flex items-center py-24 overflow-hidden border-b border-steel-900"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-steel-950/90 z-10" />
        <img 
          src={section.image_url} 
          alt="" 
          className="w-full h-full object-cover opacity-30 transition-transform duration-[10s] ease-linear"
          style={{ transform: inView ? 'scale(1.1) rotate(1deg)' : 'scale(1) rotate(0deg)' }}
        />
        <div className="absolute inset-0 bg-tech-motif opacity-60 z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20 z-10" />
        <div className="absolute inset-0 bg-dot-pattern opacity-10 z-10" />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-steel-950 to-transparent z-20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-steel-950 to-transparent z-20" />
      </div>

      <div className="container mx-auto px-6 relative z-30">
        <div className={`flex flex-col lg:flex-row items-center gap-16 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Content Box */}
          <motion.div 
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-neon-green" />
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-neon-green">
                  Classification: {section.slug.toUpperCase()}
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                {section.title}
              </h2>
              <p className="text-xl text-neon-green font-mono opacity-80">{section.subtitle}</p>
            </div>

            <div className="relative p-8 bg-steel-900/40 border border-steel-800 backdrop-blur-xl rounded-2xl group">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Layers className="w-12 h-12 text-neon-green" />
              </div>
              <p className="text-steel-400 text-lg leading-relaxed font-medium">
                {section.content}
              </p>
              
              <div className="mt-8 pt-8 border-t border-steel-800 flex flex-wrap gap-6">
                {[
                  { icon: Shield, label: 'Armor Grade A+' },
                  { icon: Cpu, label: 'Advanced targeting' },
                  { icon: Database, label: 'Full technical data' }
                ].map((tag, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <tag.icon className="w-4 h-4 text-neon-green" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-steel-500">{tag.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link 
              href={`/category/${section.slug}`}
              className="inline-flex items-center gap-4 group text-white hover:text-neon-green transition-colors"
            >
              <span className="text-xs font-black uppercase tracking-[0.3em]">Access Full Dossier</span>
              <div className="w-10 h-10 rounded-full border border-steel-700 flex items-center justify-center group-hover:border-neon-green group-hover:bg-neon-green/10 transition-all">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          {/* Visual Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: isReversed ? -5 : 5 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1 }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-square max-w-[500px] mx-auto">
              {/* Outer Rings */}
              <div className="absolute inset-[-10%] border border-neon-green/5 rounded-full animate-spin-slow" />
              <div className="absolute inset-[-20%] border border-neon-green/5 rounded-full animate-reverse-spin-slow" />
              
              {/* Main Image Frame */}
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-steel-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <img 
                  src={section.image_url} 
                  alt={section.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-steel-950 via-transparent to-transparent opacity-60" />
                
                {/* HUD Data Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-steel-950/80 backdrop-blur-md border border-steel-700 rounded-xl">
                   <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="h-1 w-20 bg-neon-green/40 rounded" />
                        <div className="h-1 w-12 bg-neon-green/20 rounded" />
                        <span className="text-[9px] font-mono text-neon-green/60 block mt-2 tracking-widest uppercase">Target ID: {section.slug}-001</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] font-black text-steel-500 uppercase block mb-1">Status</span>
                        <span className="px-2 py-0.5 bg-neon-green/10 text-neon-green text-[9px] font-black rounded border border-neon-green/20">OPERATIONAL</span>
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
