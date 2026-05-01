import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CategoryContent from '@/components/CategoryContent';
import { fetchUnitsByMainCategory } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_META: Record<string, { title: string; subtitle: string; emoji: string; gradient: string }> = {
  tank: {
    title: 'Main Battle Tanks',
    subtitle: 'Kendaraan tempur lapis baja — garda depan peperangan darat modern.',
    emoji: '🛡️',
    gradient: 'from-emerald-900/40 via-steel-950 to-steel-950',
  },
  gun: {
    title: 'Firearms & Precision Weapons',
    subtitle: 'Senjata api modern dan presisi — dari senapan serbu hingga anti-materiel.',
    emoji: '🔫',
    gradient: 'from-amber-900/30 via-steel-950 to-steel-950',
  },
  warship: {
    title: 'Warships & Naval Systems',
    subtitle: 'Armada laut modern — dari kapal induk nuklir hingga fregat multimisi.',
    emoji: '⚓',
    gradient: 'from-blue-900/30 via-steel-950 to-steel-950',
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
      {/* Background textures */}
      <div className="absolute inset-0 bg-tech-motif opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      {/* Hero Banner */}
      <div className={`relative pt-20 sm:pt-24 pb-12 sm:pb-16 bg-linear-to-b ${meta.gradient}`}>
        <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-steel-950 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 sm:w-12 bg-neon-green" />
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-neon-green">Kategori</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[0.9]">
                {meta.title}
              </h1>
              <p className="text-xs sm:text-sm text-steel-400 max-w-xl leading-relaxed">{meta.subtitle}</p>
            </div>
            
            <div className="flex items-end gap-3 sm:gap-0 sm:flex-col sm:items-end shrink-0 bg-steel-900/50 sm:bg-transparent p-4 sm:p-0 border border-steel-800 sm:border-none rounded-lg">
              <span className="text-4xl sm:text-5xl font-black text-neon-green tabular-nums leading-none">{units.length}</span>
              <p className="text-[9px] sm:text-[10px] tracking-widest uppercase text-steel-500 font-bold">Unit Tersedia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-16 -mt-4">
        <CategoryContent units={units} />
      </div>
    </div>
  );
}
