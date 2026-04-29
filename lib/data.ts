import { supabase } from './supabase';
import { MilitaryUnit } from '@/types/military';

export async function fetchUnitsByMainCategory(category: string): Promise<MilitaryUnit[]> {
  const { data, error } = await supabase
    .from('units')
    .select('*, specifications(*), technologies(*)')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching units:', error);
    return [];
  }

  // Transform to match the MilitaryUnit type if necessary
  return (data || []).map(transformUnit);
}

export async function fetchUnitBySlug(slug: string): Promise<MilitaryUnit | null> {
  const { data, error } = await supabase
    .from('units')
    .select('*, specifications(*), technologies(*)')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Error fetching unit:', error);
    return null;
  }

  return transformUnit(data);
}

export async function fetchFeaturedUnits(): Promise<MilitaryUnit[]> {
  const { data, error } = await supabase
    .from('units')
    .select('*, specifications(*), technologies(*)')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured units:', error);
    return [];
  }

  return (data || []).map(transformUnit);
}

export async function fetchAllUnits(): Promise<MilitaryUnit[]> {
  const { data, error } = await supabase
    .from('units')
    .select('*, specifications(*), technologies(*)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all units:', error);
    return [];
  }

  return (data || []).map(transformUnit);
}

export async function searchUnits(query: string): Promise<MilitaryUnit[]> {
  const q = query.toLowerCase();
  const { data, error } = await supabase
    .from('units')
    .select('*, specifications(*), technologies(*)')
    .or(`name.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%,subcategory.ilike.%${q}%,country.ilike.%${q}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching units:', error);
    return [];
  }

  return (data || []).map(transformUnit);
}

export async function fetchLandingPageSections(): Promise<any[]> {
  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .in('id', ['home_hero', 'home_tank', 'home_sniper', 'home_warship'])
    .order('id');

  if (error || !data || data.length === 0) {
    console.warn('Using fallback content for landing page sections.');
    // Hardcoded fallbacks so the page is never blank
    return [
      {
        id: 'home_hero',
        slug: 'hero',
        title: 'WarTech Archive',
        subtitle: 'Exploring Military Technology, History, and Specifications',
        content: 'Selamat datang di Central Intelligence Terminal. Kami menyajikan arsip mendalam mengenai evolusi persenjataan global — dari kekuatan lapis baja di darat, presisi penembak jitu di perbatasan, hingga dominasi armada tempur di samudra luas.',
        image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80'
      },
      {
        id: 'home_tank',
        slug: 'tank',
        title: 'Main Battle Tanks',
        subtitle: 'Kekuatan Lapis Baja Darat',
        content: 'Tank tempur utama (MBT) adalah kendaraan tempur lapis baja yang mengisi peran tembakan langsung dan manuver darat modern. Sejarahnya dimulai pada Perang Dunia I dengan kemunculan "Little Willie", namun evolusi sesungguhnya terjadi pada era Perang Dingin hingga saat ini, melahirkan monster lapis baja seperti M1 Abrams dan Leopard 2 yang dilengkapi dengan lapisan baja komposit Chobham, meriam smoothbore 120mm, dan sistem kendali tembakan digital canggih.',
        image_url: 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=1280&q=80'
      },
      {
        id: 'home_sniper',
        slug: 'sniper',
        title: 'Sniper & Precision Rifles',
        subtitle: 'Seni Presisi Jarak Jauh',
        content: 'Senjata presisi telah mengubah wajah pertempuran modern. Dari senapan bolt-action tradisional hingga sistem semi-otomatis kaliber .50 anti-materiel, teknologi ini memungkinkan eliminasi target dari jarak lebih dari 2 kilometer. Senjata seperti Barrett M82 dan Accuracy International L115A3 bukan sekadar senapan, melainkan instrumen presisi tinggi yang menggabungkan optik termal, perhitungan balistik komputerisasi, dan teknik manufaktur kedirgantaraan.',
        image_url: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=1280&q=80'
      },
      {
        id: 'home_warship',
        slug: 'warship',
        title: 'Warships & Naval Systems',
        subtitle: 'Dominasi Armada Lautan',
        content: 'Armada laut modern adalah simbol kedaulatan dan proyeksi kekuatan global. Kapal induk bertenaga nuklir kelas Nimitz atau Gerald R. Ford merupakan puncak rekayasa manusia, berfungsi sebagai pangkalan udara terapung yang mampu beroperasi selama puluhan tahun tanpa mengisi bahan bakar. Didampingi oleh kapal perusak berpeluru kendali kelas Arleigh Burke dengan sistem radar AEGIS, angkatan laut modern adalah ekosistem teknologi yang paling kompleks di dunia.',
        image_url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1280&q=80'
      }
    ];
  }

  return data.map(item => ({
    ...item,
    slug: item.id.split('_').pop()
  }));
}

// Helper to transform Supabase data to our TypeScript type
function transformUnit(item: any): MilitaryUnit {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    category: item.category,
    subcategory: item.subcategory,
    country: item.country,
    countryCode: item.country_code,
    year: item.year,
    image: item.image_url,
    description: item.description,
    history: item.history,
    featured: item.featured,
    specifications: (item.specifications || []).map((s: any) => ({
      label: s.label,
      value: s.value
    })),
    technologies: (item.technologies || []).map((t: any) => t.name)
  };
}
