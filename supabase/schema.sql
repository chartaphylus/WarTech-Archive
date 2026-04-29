-- WarTech Archive Supabase Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: Categories (Optional, but good for structured data)
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Units
CREATE TABLE IF NOT EXISTS public.units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL, -- tank, sniper, warship
    subcategory TEXT NOT NULL,
    country TEXT NOT NULL,
    country_code TEXT NOT NULL,
    year INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL,
    history TEXT NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Specifications
CREATE TABLE IF NOT EXISTS public.specifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID REFERENCES public.units(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Table: Technologies
CREATE TABLE IF NOT EXISTS public.technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID REFERENCES public.units(id) ON DELETE CASCADE,
    name TEXT NOT NULL
);

-- Table: Traffic/Stats
CREATE TABLE IF NOT EXISTS public.traffic_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    path TEXT NOT NULL,
    view_count BIGINT DEFAULT 1,
    last_viewed TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Site Config (Home page sections, images, titles)
CREATE TABLE IF NOT EXISTS public.site_config (
    id TEXT PRIMARY KEY, -- home_hero, section_tank, section_sniper, section_warship
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT,
    image_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Policies for Public Read Access
CREATE POLICY "Public Read Access" ON public.units FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.specifications FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.technologies FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.traffic_stats FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.site_config FOR SELECT USING (true);

-- Policies for Admin All Access
CREATE POLICY "Admin All Access" ON public.units FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON public.specifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON public.technologies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON public.traffic_stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON public.site_config FOR ALL USING (auth.role() = 'authenticated');

-- Storage Bucket: units
-- Perintah izin storage harus dijalankan di dashboard Supabase:
-- 1. Create bucket 'units'
-- 2. Make it public
-- 3. Add policy: SELECT (true), INSERT/UPDATE/DELETE (auth.role() = 'authenticated')

-- Seed Data (In Indonesian as requested)
INSERT INTO public.site_config (id, title, subtitle, content, image_url) VALUES
('home_hero', 'WarTech Archive', 'Exploring Military Technology, History, and Specifications', 'Selamat datang di Central Intelligence Terminal. Kami menyajikan arsip mendalam mengenai evolusi persenjataan global — dari kekuatan lapis baja di darat, presisi penembak jitu di perbatasan, hingga dominasi armada tempur di samudra luas.', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80'),
('home_tank', 'Main Battle Tanks', 'Kekuatan Lapis Baja Darat', 'Tank tempur utama (MBT) adalah kendaraan tempur lapis baja yang mengisi peran tembakan langsung dan manuver darat modern. Sejarahnya dimulai pada Perang Dunia I dengan kemunculan "Little Willie", namun evolusi sesungguhnya terjadi pada era Perang Dingin hingga saat ini, melahirkan monster lapis baja seperti M1 Abrams dan Leopard 2 yang dilengkapi dengan lapisan baja komposit Chobham, meriam smoothbore 120mm, dan sistem kendali tembakan digital canggih.', 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=1280&q=80'),
('home_sniper', 'Sniper & Precision Rifles', 'Seni Presisi Jarak Jauh', 'Senjata presisi telah mengubah wajah pertempuran modern. Dari senapan bolt-action tradisional hingga sistem semi-otomatis kaliber .50 anti-materiel, teknologi ini memungkinkan eliminasi target dari jarak lebih dari 2 kilometer. Senjata seperti Barrett M82 dan Accuracy International L115A3 bukan sekadar senapan, melainkan instrumen presisi tinggi yang menggabungkan optik termal, perhitungan balistik komputerisasi, dan teknik manufaktur kedirgantaraan.', 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=1280&q=80'),
('home_warship', 'Warships & Naval Systems', 'Dominasi Armada Lautan', 'Armada laut modern adalah simbol kedaulatan dan proyeksi kekuatan global. Kapal induk bertenaga nuklir kelas Nimitz atau Gerald R. Ford merupakan puncak rekayasa manusia, berfungsi sebagai pangkalan udara terapung yang mampu beroperasi selama puluhan tahun tanpa mengisi bahan bakar. Didampingi oleh kapal perusak berpeluru kendali kelas Arleigh Burke dengan sistem radar AEGIS, angkatan laut modern adalah ekosistem teknologi yang paling kompleks di dunia.', 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1280&q=80'),
('login_bg', 'Login Background', 'Default terminal background', NULL, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80');
