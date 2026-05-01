'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Home, Shield, Crosshair, Anchor, Search, BookOpen } from 'lucide-react';
import SearchBar from './SearchBar';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/category/tank', label: 'Tanks', icon: Shield },
  { href: '/category/gun', label: 'Guns', icon: Crosshair },
  { href: '/category/warship', label: 'Warships', icon: Anchor },
  { href: '/world-wars', label: 'World Wars', icon: BookOpen },
];

// Mobile bottom bar: replace Search with World Wars
const MOBILE_NAV = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/category/tank', label: 'Tanks', icon: Shield },
  { href: '/category/gun', label: 'Guns', icon: Crosshair },
  { href: '/category/warship', label: 'Ships', icon: Anchor },
  { href: '/world-wars', label: 'Wars', icon: BookOpen },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Desktop & Tablet Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-steel-950/90 backdrop-blur-xl border-b border-neon-green/10 shadow-lg shadow-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 border border-neon-green/60 bg-neon-green/10 rounded">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-green">
                  <path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-3a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 000-2h-1V8a1 1 0 00-1-1z" />
                </svg>
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-xs sm:text-sm font-bold tracking-widest text-white uppercase group-hover:text-neon-green transition-colors duration-200">
                  WarTech
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-steel-400 uppercase">Archive</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 lg:px-4 py-2 text-[10px] lg:text-xs font-semibold tracking-widest uppercase rounded transition-all duration-200 ${
                      isActive 
                        ? 'text-neon-green bg-neon-green/10' 
                        : 'text-steel-300 hover:text-neon-green hover:bg-neon-green/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop search */}
            <div className="hidden md:block">
              <SearchBar compact />
            </div>

            {/* Mobile: just the search */}
            <div className="md:hidden">
              <SearchBar compact />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-steel-950/95 backdrop-blur-xl border-t border-neon-green/20 pb-safe">
        <div className="flex items-center justify-around h-16">
          {MOBILE_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300 relative ${
                  isActive ? 'text-neon-green' : 'text-steel-500'
                }`}
              >
                <div className={`relative ${isActive ? 'scale-110' : 'scale-100'} transition-transform`}>
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <div className="absolute -inset-2 bg-neon-green/20 rounded-full blur-md -z-10 animate-pulse" />
                  )}
                </div>
                <span className="text-[8px] font-black uppercase tracking-tighter">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute top-0 w-8 h-0.5 bg-neon-green shadow-[0_0_10px_#39ff14]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
