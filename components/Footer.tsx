import Link from 'next/link';
import { Shield, Crosshair, Anchor, Home, BookOpen } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/category/tank', label: 'Tanks', icon: Shield },
  { href: '/category/gun', label: 'Guns', icon: Crosshair },
  { href: '/category/warship', label: 'Warships', icon: Anchor },
  { href: '/world-wars', label: 'World Wars', icon: BookOpen },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-steel-800/60 bg-steel-950 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-neon-green/15 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 border border-neon-green/50 bg-neon-green/10 rounded flex items-center justify-center">
                <span className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_6px_#39ff14]" />
              </span>
              <div className="leading-none">
                <span className="text-sm font-black tracking-widest uppercase text-white">WarTech</span>
                <span className="text-[8px] tracking-[0.3em] text-steel-500 uppercase block">Archive</span>
              </div>
            </div>
            <p className="text-[11px] text-steel-500 leading-relaxed max-w-xs">
              Platform edukasi yang mengarsipkan teknologi militer dari seluruh dunia — tank, senjata presisi, dan kapal perang.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
              <span className="text-[9px] font-mono text-neon-green/60 tracking-widest uppercase">System Online</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-steel-400">Navigasi</h4>
            <div className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2.5 text-xs text-steel-500 hover:text-neon-green transition-colors duration-200 group"
                >
                  <link.icon className="w-3.5 h-3.5 text-steel-700 group-hover:text-neon-green/70 transition-colors" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-steel-400">Kategori</h4>
            <div className="space-y-2.5">
              {[
                { label: 'Main Battle Tanks', count: 'MBT' },
                { label: 'Firearms & Precision', count: 'FPW' },
                { label: 'Naval Warships', count: 'NWS' },
              ].map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-steel-500">{cat.label}</span>
                  <span className="text-[8px] font-mono text-steel-700 bg-steel-900 px-1.5 py-0.5 rounded">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-5 sm:py-6 border-t border-steel-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-steel-600 tracking-wider text-center sm:text-left">
            © {currentYear} WarTech Archive — Dibuat untuk tujuan edukasi
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-mono text-steel-700 tracking-widest">v4.0.1</span>
            <div className="w-px h-3 bg-steel-800" />
            <span className="text-[9px] font-mono text-steel-700 tracking-widest uppercase">Protocol: SECURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
