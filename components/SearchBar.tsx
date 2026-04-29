'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchBarProps {
  compact?: boolean;
  initialValue?: string;
}

export default function SearchBar({ compact = false, initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        suppressHydrationWarning
        placeholder={compact ? 'Search…' : 'Search units, countries, categories…'}
        className={`bg-steel-800/60 border border-steel-600/50 text-steel-200 placeholder-steel-500 rounded
          focus:outline-none focus:border-neon-green/50 focus:bg-steel-800 focus:ring-1 focus:ring-neon-green/20
          transition-all duration-200
          ${compact ? 'pl-8 pr-3 py-1.5 text-xs w-44 focus:w-56' : 'pl-10 pr-4 py-3 text-sm w-full'}`}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className={`absolute top-1/2 -translate-y-1/2 text-steel-500 group-focus-within:text-neon-green transition-colors duration-200
          ${compact ? 'left-2 w-3.5 h-3.5' : 'left-3 w-4 h-4'}`}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </form>
  );
}
