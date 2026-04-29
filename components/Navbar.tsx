'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/category/tank', label: 'Tanks' },
  { href: '/category/sniper', label: 'Snipers' },
  { href: '/category/warship', label: 'Warships' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-steel-950/90 backdrop-blur-xl border-b border-neon-green/10 shadow-lg shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 border border-neon-green/60 bg-neon-green/10 rounded">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-neon-green">
                <path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-3a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 000-2h-1V8a1 1 0 00-1-1z" />
              </svg>
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-widest text-white uppercase group-hover:text-neon-green transition-colors duration-200">
                WarTech
              </span>
              <span className="text-[9px] tracking-[0.3em] text-steel-400 uppercase">Archive</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-xs font-semibold tracking-widest uppercase text-steel-300 hover:text-neon-green hover:bg-neon-green/5 rounded transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop search */}
          <div className="hidden md:block">
            <SearchBar compact />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-6 bg-neon-green transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block h-px w-6 bg-neon-green transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-neon-green transition-all duration-300 ${menuOpen ? '-rotate-45 translate-y-[-5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80' : 'max-h-0'
        } bg-steel-950/95 backdrop-blur-xl border-b border-neon-green/10`}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          <div className="mb-3">
            <SearchBar compact />
          </div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-xs font-semibold tracking-widest uppercase text-steel-300 hover:text-neon-green hover:bg-neon-green/5 rounded transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
