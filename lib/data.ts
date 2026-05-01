import { supabase } from './supabase';
import { MilitaryUnit } from '@/types/military';

// ── World War Types ──────────────────────────────────────────────────────────

export interface WorldWarEvent {
  id: string;
  war: 'ww1' | 'ww2';
  title: string;
  event_date: string | null;
  year: number;
  description: string;
  key_figures: string | null;
  nations: string | null;
  event_type: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ── World War Queries ────────────────────────────────────────────────────────

export async function fetchWorldWarEvents(war?: 'ww1' | 'ww2'): Promise<WorldWarEvent[]> {
  let query = supabase
    .from('world_war_events')
    .select('*')
    .order('sort_order', { ascending: true });

  if (war) {
    query = query.eq('war', war);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching world war events:', error);
    return [];
  }

  return data || [];
}

export async function fetchWorldWarEventById(id: string): Promise<WorldWarEvent | null> {
  const { data, error } = await supabase
    .from('world_war_events')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching world war event:', error);
    return null;
  }

  return data;
}

// ── Unit Queries ─────────────────────────────────────────────────────────────

export async function fetchUnitsByMainCategory(category: string): Promise<MilitaryUnit[]> {
  const { data, error } = await supabase
    .from('units')
    .select('*, specifications(*), technologies(*)')
    .ilike('category', `%${category}%`) 
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching units:', error);
    return [];
  }

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

// ── Landing Page Sections ────────────────────────────────────────────────────

export async function fetchLandingPageSections(): Promise<any[]> {
  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .in('id', ['home_hero', 'home_tank', 'home_gun', 'home_sniper', 'home_warship'])
    .order('id');

  if (error || !data || data.length === 0) {
    return getFallbackSections();
  }

  // Prioritize home_gun over home_sniper if both exist
  const gunConfig = data.find(item => item.id === 'home_gun') || data.find(item => item.id === 'home_sniper');
  const others = data.filter(item => !['home_gun', 'home_sniper'].includes(item.id));
  
  const finalSections = [...others];
  if (gunConfig) {
    finalSections.push({ ...gunConfig, slug: 'gun' });
  }

  return finalSections.map(item => ({
    ...item,
    slug: item.slug || item.id.split('_').pop()
  }));
}

// ── Fallback Data ────────────────────────────────────────────────────────────

function getFallbackSections() {
  return [
    {
      id: 'home_hero',
      slug: 'hero',
      title: 'WarTech Archive',
      subtitle: 'Exploring Military Technology, History, and Specifications',
      content: 'Selamat datang di Central Intelligence Terminal. Kami menyajikan arsip mendalam mengenai evolusi persenjataan global — dari kekuatan lapis baja di darat, presisi Senjata api, hingga dominasi armada tempur di samudra luas.',
      image_url: ''
    },
    {
      id: 'home_tank',
      slug: 'tank',
      title: 'Main Battle Tanks',
      subtitle: 'Kekuatan Lapis Baja Darat',
      content: 'Tank tempur utama (MBT) adalah kendaraan tempur lapis baja yang mengisi peran tembakan langsung dan manuver darat modern. Evolusi sesungguhnya terjadi pada era Perang Dingin hingga saat ini, melahirkan monster lapis baja seperti M1 Abrams dan Leopard 2.',
      image_url: 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=1280&q=80'
    },
    {
      id: 'home_gun',
      slug: 'gun',
      title: 'Firearms & Precision Weapons',
      subtitle: 'Seni Presisi & Teknologi Senjata Api',
      content: 'Senjata api dan sistem presisi telah mengubah wajah pertempuran modern. Dari senapan serbu modular hingga sistem anti-materiel, teknologi ini memungkinkan eliminasi target dengan akurasi tinggi.',
      image_url: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=1280&q=80'
    },
    {
      id: 'home_warship',
      slug: 'warship',
      title: 'Warships & Naval Systems',
      subtitle: 'Dominasi Armada Lautan',
      content: 'Armada laut modern adalah simbol kedaulatan dan proyeksi kekuatan global. Kapal induk bertenaga nuklir merupakan puncak rekayasa manusia.',
      image_url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1280&q=80'
    }
  ];
}

// ── Transform Helper ─────────────────────────────────────────────────────────

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
