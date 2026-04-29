'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Section, { SectionHeader } from '@/components/Section';
import UnitCard from '@/components/UnitCard';
import SearchBar from '@/components/SearchBar';
import { searchUnits } from '@/lib/data';
import { MilitaryUnit } from '@/types/military';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [results, setResults] = useState<MilitaryUnit[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function performSearch() {
      if (!query) {
        setResults([]);
        return;
      }
      setLoading(true);
      const data = await searchUnits(query);
      setResults(data);
      setLoading(false);
    }
    performSearch();
  }, [query]);

  return (
    <Section className="bg-steel-950 pt-32">
      <SectionHeader
        label="Search"
        title={query ? `Results for "${query}"` : 'Search Archive'}
      />

      <div className="mb-10 max-w-xl">
        <SearchBar initialValue={query} />
      </div>

      {loading ? (
        <div className="flex items-center gap-3 py-10">
          <div className="w-5 h-5 border-2 border-neon-green/20 border-t-neon-green rounded-full animate-spin" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Searching Archive...</p>
        </div>
      ) : (
        <>
          {query && (
            <p className="text-sm text-steel-500 mb-8 tracking-wide">
              {results.length} unit{results.length !== 1 ? 's' : ''} matched your query.
            </p>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((unit, i) => (
                <UnitCard key={unit.id} unit={unit} index={i} />
              ))}
            </div>
          ) : query ? (
            <div className="flex flex-col items-center justify-center py-32 text-steel-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-16 h-16 mb-4 opacity-30">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <p className="text-sm tracking-widest uppercase mb-2">No units found.</p>
              <p className="text-xs text-steel-700">Try a different search term.</p>
            </div>
          ) : null}
        </>
      )}
    </Section>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
