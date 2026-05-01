import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  emoji?: string;
}

export function SectionHeader({ label, title, subtitle, emoji }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      {label && (
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-neon-green mb-3">
          ── {label} ──
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
        {emoji && <span className="mr-2">{emoji}</span>}
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-steel-400 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
