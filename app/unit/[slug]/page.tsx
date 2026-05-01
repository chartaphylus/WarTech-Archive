import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchUnitBySlug, fetchAllUnits } from '@/lib/data';
import CategoryBadge from '@/components/CategoryBadge';
import BackButton from '@/components/BackButton';
import { Specification } from '@/types/military';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const units = await fetchAllUnits();
  return units.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unit = await fetchUnitBySlug(slug);
  if (!unit) return { title: 'Unit Tidak Ditemukan' };
  return { title: unit.name, description: unit.description };
}

function SpecRow({ spec }: { spec: Specification }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-steel-800/60 gap-4">
      <span className="text-[10px] font-bold tracking-widest uppercase text-steel-500 shrink-0 pt-0.5">
        {spec.label}
      </span>
      <span className="text-sm text-steel-200 text-right font-mono">{spec.value}</span>
    </div>
  );
}

const CATEGORY_LABEL: Record<string, string> = {
  tank: 'Tank',
  gun: 'Gun',
  warship: 'Warship',
};

export default async function UnitDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const unit = await fetchUnitBySlug(slug);
  if (!unit) notFound();

  return (
    <div className="bg-steel-950 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-tech-motif opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      <div className="relative z-10">
      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={unit.image}
          alt={unit.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-steel-950/20 via-steel-950/40 to-steel-950" />
        <div className="absolute inset-0 bg-linear-to-r from-steel-950/60 to-transparent" />

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-full h-px bg-neon-green/10 animate-scan-line" />
        </div>

        {/* Corner decorators */}
        <div className="absolute top-20 left-6 w-10 h-10 border-l-2 border-t-2 border-neon-green/40" />
        <div className="absolute top-20 right-6 w-10 h-10 border-r-2 border-t-2 border-neon-green/40" />

        {/* Header content */}
        <div className="absolute bottom-10 left-0 right-0 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <CategoryBadge subcategory={unit.subcategory} />
            <span className="text-[10px] font-mono tracking-widest text-steel-400 border border-steel-700/50 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
              {unit.country} · {unit.year}
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none"
            style={{ textShadow: '0 0 40px rgba(57,255,20,0.12)' }}
          >
            {unit.name}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">

        {/* Back button + Breadcrumb */}
        <div className="flex items-center gap-3 mb-10">
          <BackButton label={`Kembali ke ${CATEGORY_LABEL[unit.category] ?? unit.category}`} />
          <span className="text-steel-700 text-xs">›</span>
          <Link href={`/category/${unit.category}`} className="text-[10px] font-semibold tracking-widest uppercase text-steel-500 hover:text-neon-green transition-colors">
            {CATEGORY_LABEL[unit.category]}
          </Link>
          <span className="text-steel-700 text-xs">›</span>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-steel-400">{unit.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-neon-green mb-3">── Ikhtisar</p>
              <p className="text-base text-steel-300 leading-relaxed">{unit.description}</p>
            </div>

            {/* Technologies */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-neon-green mb-4">── Teknologi</p>
              <div className="flex flex-wrap gap-2">
                {unit.technologies.map((tech) => (
                  <span key={tech}
                    className="px-3 py-1.5 border border-neon-green/20 bg-neon-green/5 text-neon-green/80
                      text-[10px] font-semibold tracking-wide rounded
                      hover:border-neon-green/40 hover:bg-neon-green/10 hover:text-neon-green transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* History */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-neon-green mb-4">── Catatan Sejarah</p>
              <div className="pl-4 border-l border-neon-green/20">
                <p className="text-sm text-steel-300 leading-loose">{unit.history}</p>
              </div>
            </div>
          </div>

          {/* Right column — specs */}
          <div>
            <div className="sticky top-24 bg-steel-900/50 border border-steel-700/50 rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-steel-700/50 bg-steel-900/80">
                <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-neon-green">
                  Spesifikasi Teknis
                </p>
              </div>
              <div className="px-5 py-2">
                {unit.specifications.map((spec) => (
                  <SpecRow key={spec.label} spec={spec} />
                ))}
              </div>
              <div className="px-5 py-3 bg-steel-950/50 border-t border-steel-800/50">
                <p className="text-[9px] font-mono text-steel-600 tracking-widest">
                  ID: {unit.id.toUpperCase()} · {unit.subcategory.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
