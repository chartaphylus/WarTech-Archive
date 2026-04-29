import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Section, { SectionHeader } from '@/components/Section';
import CategoryContent from '@/components/CategoryContent';
import { fetchUnitsByMainCategory } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_META: Record<string, { title: string; subtitle: string; emoji: string }> = {
  tank: {
    title: 'Main Battle Tanks',
    subtitle: 'Kendaraan tempur lapis baja — garda depan peperangan darat modern.',
    emoji: '🛡️',
  },
  sniper: {
    title: 'Sniper & Precision Rifles',
    subtitle: 'Senjata presisi jarak jauh — dari DMR hingga anti-materiel kaliber besar.',
    emoji: '🎯',
  },
  warship: {
    title: 'Warships & Naval Systems',
    subtitle: 'Armada laut modern — dari kapal induk nuklir hingga fregat multimisi.',
    emoji: '⚓',
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) return { title: 'Kategori Tidak Ditemukan' };
  return { title: meta.title, description: meta.subtitle };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) notFound();

  const units = await fetchUnitsByMainCategory(slug);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-tech-motif opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      <Section className="relative z-10 pt-28">
      {/* Back + Breadcrumb */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-steel-700/50 text-steel-400
            hover:border-neon-green/40 hover:text-neon-green hover:bg-neon-green/5
            rounded text-[10px] font-bold tracking-widest uppercase transition-all duration-200 group"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform duration-200">
            <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Beranda
        </Link>
        <span className="text-steel-700 text-xs">›</span>
        <span className="text-[10px] font-semibold tracking-widest uppercase text-neon-green">{meta.title}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-neon-green mb-3">── Kategori</p>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
            {meta.emoji} {meta.title}
          </h1>
          <p className="mt-2 text-sm text-steel-400">{meta.subtitle}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-4xl font-black text-neon-green tabular-nums">{units.length}</span>
          <p className="text-[10px] tracking-widest uppercase text-steel-500">Unit Tersedia</p>
        </div>
      </div>

      {/* Subcategory filter + grid — client component */}
      <CategoryContent units={units} />
    </Section>
    </div>
  );
}
