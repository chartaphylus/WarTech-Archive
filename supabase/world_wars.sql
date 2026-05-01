-- ============================================================
-- WORLD WAR EVENTS - SCHEMA + ALL DATA
-- Jalankan file ini di Supabase SQL Editor
-- ============================================================

-- Drop table if exists (untuk fresh install)
DROP TABLE IF EXISTS world_war_events;

CREATE TABLE world_war_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  war TEXT NOT NULL CHECK (war IN ('ww1', 'ww2')),
  title TEXT NOT NULL,
  event_date DATE,
  year INTEGER NOT NULL,
  description TEXT NOT NULL,
  key_figures TEXT,
  nations TEXT,
  event_type TEXT NOT NULL DEFAULT 'event' CHECK (event_type IN ('battle', 'treaty', 'invasion', 'surrender', 'declaration', 'event', 'atrocity', 'turning_point')),
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE world_war_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON world_war_events FOR SELECT USING (true);
CREATE POLICY "Admin full access" ON world_war_events FOR ALL USING (auth.role() = 'authenticated');
CREATE INDEX idx_wwe_war ON world_war_events(war);
CREATE INDEX idx_wwe_year ON world_war_events(year);

-- ============================================================
-- PERANG DUNIA I (1914-1919) — 20 Peristiwa
-- ============================================================
INSERT INTO world_war_events (war, title, event_date, year, description, key_figures, nations, event_type, sort_order) VALUES

('ww1', 'Pembunuhan Archduke Franz Ferdinand', '1914-06-28', 1914,
 'Archduke Franz Ferdinand dari Austria-Hongaria beserta istrinya Sophie dibunuh oleh Gavrilo Princip di Sarajevo, Bosnia. Princip adalah anggota Mlada Bosna yang didukung organisasi rahasia Serbia "Black Hand". Pembunuhan ini menciptakan krisis diplomatik yang eskalasi menjadi perang global dalam waktu sebulan.',
 'Archduke Franz Ferdinand, Sophie Duchess of Hohenberg, Gavrilo Princip', 'Austria-Hongaria, Serbia', 'event', 1),

('ww1', 'Austria-Hongaria Menyatakan Perang pada Serbia', '1914-07-28', 1914,
 'Setelah Serbia menolak ultimatum Austria-Hongaria, Austria-Hongaria secara resmi menyatakan perang. Sistem aliansi Triple Entente dan Triple Alliance menarik negara-negara besar lainnya ke dalam konflik, memulai Perang Dunia I.',
 'Kaiser Franz Joseph I, Count Leopold von Berchtold', 'Austria-Hongaria, Serbia', 'declaration', 2),

('ww1', 'Jerman Menginvasi Belgia (Rencana Schlieffen)', '1914-08-04', 1914,
 'Jerman melaksanakan Rencana Schlieffen dengan menginvasi Belgia netral untuk menyerang Prancis dari utara. Pelanggaran netralitas ini membawa Inggris masuk perang berdasarkan Perjanjian London 1839. Perlawanan sengit Belgia memperlambat kemajuan Jerman secara signifikan.',
 'Helmuth von Moltke the Younger, King Albert I of Belgium', 'Jerman, Belgia, Inggris, Prancis', 'invasion', 3),

('ww1', 'Pertempuran Marne Pertama', '1914-09-05', 1914,
 'Pertempuran Marne (5-12 Sep 1914) menghentikan kemajuan Jerman ke Paris. Sekitar 2 juta tentara terlibat. Jenderal Joffre memimpin serangan balik Prancis yang mengubah perang dari konflik bergerak menjadi perang parit yang membeku selama bertahun-tahun.',
 'Joseph Joffre, Helmuth von Moltke, John French', 'Prancis, Inggris, Jerman', 'battle', 4),

('ww1', 'Pertempuran Tannenberg', '1914-08-26', 1914,
 'Pertempuran Tannenberg (26-30 Agustus 1914) adalah kemenangan telak Jerman atas Rusia di Front Timur. Jenderal Hindenburg dan Ludendorff mengepung dan menghancurkan Tentara Kedua Rusia, menawan 92.000 tentara. Jenderal Samsonov bunuh diri setelah kekalahan ini. Kemenangan ini menjadikan Hindenburg pahlawan nasional Jerman.',
 'Paul von Hindenburg, Erich Ludendorff, Alexander Samsonov', 'Jerman, Rusia', 'battle', 5),

('ww1', 'Penggunaan Senjata Kimia di Ypres', '1915-04-22', 1915,
 'Pasukan Jerman melepaskan 168 ton gas klorin di dekat Ypres, Belgia — penggunaan senjata kimia skala besar pertama dalam sejarah perang modern. Serangan ini membuka era peperangan kimia yang menewaskan sekitar 90.000 tentara selama perang.',
 'Fritz Haber, John French', 'Jerman, Prancis, Inggris, Kanada', 'atrocity', 6),

('ww1', 'Kampanye Gallipoli', '1915-02-19', 1915,
 'Kampanye Gallipoli (Feb 1915 - Jan 1916) adalah upaya Sekutu menguasai Selat Dardanella. Diprakarsai Winston Churchill, operasi ini gagal total melawan pasukan Turki Ottoman di bawah Mustafa Kemal (Ataturk). Korban gabungan lebih dari 500.000.',
 'Winston Churchill, Mustafa Kemal Atatürk, Ian Hamilton', 'Inggris, Prancis, Australia, Selandia Baru, Turki Ottoman', 'battle', 7),

('ww1', 'Tenggelamnya RMS Lusitania', '1915-05-07', 1915,
 'Kapal penumpang Inggris RMS Lusitania ditenggelamkan oleh torpedo U-boat Jerman, menewaskan 1.198 orang termasuk 128 warga Amerika. Insiden ini memicu kemarahan publik di AS dan menjadi salah satu faktor masuknya AS ke perang pada 1917.',
 'Kapten William Turner, Walther Schwieger', 'Inggris, Jerman, AS', 'event', 8),

('ww1', 'Italia Bergabung dengan Sekutu', '1915-05-23', 1915,
 'Meskipun anggota Triple Alliance, Italia bergabung Sekutu setelah Pakta London yang menjanjikan wilayah Austria-Hongaria. Italia membuka front baru di Alpen dengan kondisi medan pegunungan yang sangat sulit.',
 'King Victor Emmanuel III, Antonio Salandra', 'Italia, Austria-Hongaria', 'declaration', 9),

('ww1', 'Pertempuran Verdun', '1916-02-21', 1916,
 'Pertempuran Verdun (Feb-Des 1916) berlangsung 303 hari dengan korban gabungan 700.000. Jerman bertujuan "menguras darah" tentara Prancis. Philippe Petain memimpin pertahanan dengan semboyan "Ils ne passeront pas!" (Mereka tidak akan lewat!).',
 'Philippe Pétain, Erich von Falkenhayn, Robert Nivelle', 'Prancis, Jerman', 'battle', 10),

('ww1', 'Pertempuran Jutland', '1916-05-31', 1916,
 'Pertempuran laut terbesar dalam PD I melibatkan 250 kapal perang dan 100.000 personel. Meskipun Jerman menenggelamkan lebih banyak kapal, Inggris mempertahankan dominasi laut strategisnya. Armada Jerman tidak pernah lagi menantang Grand Fleet.',
 'John Jellicoe, David Beatty, Reinhard Scheer', 'Inggris, Jerman', 'battle', 11),

('ww1', 'Pertempuran Somme', '1916-07-01', 1916,
 'Hari pertama Somme (1 Juli) menjadi hari paling berdarah dalam sejarah militer Inggris dengan 57.470 korban. Tank digunakan pertama kali pada 15 Sep 1916. Total korban lebih dari 1 juta dari kedua pihak.',
 'Douglas Haig, Henry Rawlinson, Fritz von Below', 'Inggris, Prancis, Jerman', 'battle', 12),

('ww1', 'Perang Kapal Selam Tanpa Batas Dimulai', '1917-02-01', 1917,
 'Jerman mengumumkan kebijakan perang kapal selam tanpa batas — menenggelamkan semua kapal di perairan Inggris tanpa peringatan. Tujuannya memutus suplai ke Inggris. Kebijakan ini langsung memicu ketegangan dengan AS dan menjadi faktor utama masuknya Amerika ke perang.',
 'Henning von Holtzendorff, Tirpitz', 'Jerman, Inggris, AS', 'declaration', 13),

('ww1', 'Amerika Serikat Memasuki Perang', '1917-04-06', 1917,
 'Setelah perang kapal selam tanpa batas dan Telegram Zimmermann, Presiden Wilson meminta Kongres menyatakan perang. Masuknya AS dengan kekuatan industri dan pasukan segar (AEF di bawah Pershing) mengubah keseimbangan kekuatan di Front Barat.',
 'Woodrow Wilson, John J. Pershing', 'Amerika Serikat, Jerman', 'declaration', 14),

('ww1', 'Pertempuran Passchendaele', '1917-07-31', 1917,
 'Pertempuran Ypres Ketiga (Jul-Nov 1917) menjadi simbol kesengsaraan perang parit. Hujan mengubah medan menjadi lautan lumpur. Sekutu maju hanya 8 km dalam 4 bulan dengan 500.000 korban dari kedua pihak.',
 'Douglas Haig, Arthur Currie', 'Inggris, Kanada, Australia, Jerman', 'battle', 15),

('ww1', 'Revolusi Bolshevik Rusia', '1917-11-07', 1917,
 'Revolusi Oktober oleh Lenin dan Bolshevik menggulingkan Pemerintahan Sementara Rusia. Pemerintah baru segera mencari perdamaian, mengakhiri keterlibatan Rusia dalam perang dan melahirkan Uni Soviet.',
 'Vladimir Lenin, Leon Trotsky, Alexander Kerensky', 'Rusia', 'turning_point', 16),

('ww1', 'Perjanjian Brest-Litovsk', '1918-03-03', 1918,
 'Rusia Soviet menandatangani perdamaian dengan Blok Sentral, kehilangan sepertiga populasinya termasuk Polandia, Finlandia, dan Ukraina. Perjanjian ini membebaskan pasukan Jerman untuk dipindahkan ke Front Barat.',
 'Leon Trotsky, Richard von Kühlmann', 'Rusia, Jerman, Austria-Hongaria, Turki Ottoman', 'treaty', 17),

('ww1', 'Ofensif Musim Semi Jerman (Kaiserschlacht)', '1918-03-21', 1918,
 'Serangan besar terakhir Jerman menggunakan taktik Stormtroopers. Berhasil menembus 65 km — kemajuan terbesar sejak 1914 — tetapi akhirnya kehabisan logistik, menandai awal kekalahan final Jerman.',
 'Erich Ludendorff, Ferdinand Foch, Douglas Haig', 'Jerman, Inggris, Prancis, AS', 'battle', 18),

('ww1', 'Ofensif Seratus Hari & Gencatan Senjata', '1918-08-08', 1918,
 'Serangkaian serangan Sekutu (8 Agustus - 11 November) memukul mundur Jerman. Dimulai Pertempuran Amiens yang disebut Ludendorff "hari paling hitam." Gencatan senjata berlaku pukul 11:00 tanggal 11/11/1918. Total 17 juta tewas, 20 juta terluka.',
 'Ferdinand Foch, Douglas Haig, John Pershing, Matthias Erzberger', 'Sekutu, Jerman', 'turning_point', 19),

('ww1', 'Perjanjian Versailles', '1919-06-28', 1919,
 'Secara resmi mengakhiri PD I. Jerman dipaksa menerima tanggung jawab penuh (War Guilt Clause), membayar reparasi besar, dan mengurangi militernya. Syarat keras ini menciptakan kepahitan yang dimanfaatkan Hitler untuk bangkitnya Nazisme.',
 'Woodrow Wilson, Georges Clemenceau, David Lloyd George', 'Jerman, Prancis, Inggris, AS, Italia', 'treaty', 20);
