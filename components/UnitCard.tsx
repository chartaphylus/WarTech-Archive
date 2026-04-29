import Link from 'next/link';
import { MilitaryUnit } from '@/types/military';
import CategoryBadge from './CategoryBadge';

interface UnitCardProps {
  unit: MilitaryUnit;
  index?: number;
}

export default function UnitCard({ unit, index = 0 }: UnitCardProps) {
  return (
    <Link
      href={`/unit/${unit.slug}`}
      className="group relative flex flex-col bg-steel-800/40 border border-steel-700/50 rounded-lg overflow-hidden
        hover:border-neon-green/40 hover:bg-steel-800/60 hover:shadow-xl hover:shadow-neon-green/5
        transition-all duration-400 animate-fade-in"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-steel-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
          src={unit.image}
          alt={unit.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-steel-900 via-steel-900/20 to-transparent" />

        {/* Subcategory badge */}
        <div className="absolute top-3 left-3">
          <CategoryBadge subcategory={unit.subcategory} />
        </div>

        {/* Year tag */}
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-steel-600/40 rounded text-[10px] font-mono tracking-wider text-steel-400">
          {unit.year}
        </div>

        {/* Scan line effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
          <div className="w-full h-px bg-neon-green/30 animate-scan-line" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 relative">
        {/* Futuristic corner accents */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-green/20 group-hover:border-neon-green/50 transition-colors" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-green/20 group-hover:border-neon-green/50 transition-colors" />

        {/* Country */}
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-steel-500 mb-1">
          {unit.country}
        </p>

        {/* Name */}
        <h3 className="text-lg font-bold text-white group-hover:text-neon-green transition-colors duration-200 leading-tight mb-2">
          {unit.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-steel-400 leading-relaxed line-clamp-3 flex-1">
          {unit.description}
        </p>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-steel-700/50 flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-widest text-steel-600 uppercase">
            {unit.specifications.length} specs
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-neon-green/70 group-hover:text-neon-green transition-colors duration-200">
            View Details
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* Left accent line */}
      <div className="absolute left-0 top-0 w-px h-0 bg-neon-green group-hover:h-full transition-all duration-500" />
    </Link>
  );
}
