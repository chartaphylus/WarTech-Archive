'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImage, deleteImage } from '@/lib/storage';
import { 
  Save, 
  Image as ImageIcon, 
  Upload, 
  Loader2, 
  Layout,
  RefreshCw,
  AlertCircle,
  BookOpen,
  Type,
  Terminal
} from 'lucide-react';
import { showToast } from '@/components/Toast';
import { motion, AnimatePresence } from 'framer-motion';

const DOSSIER_IDS = ['home_tank', 'home_gun', 'home_sniper', 'home_warship'];

export default function SiteConfigPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [configs, setConfigs] = useState<any[]>([]);
  const [briefingContent, setBriefingContent] = useState('');
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [pendingDeletions, setPendingDeletions] = useState<string[]>([]);

  useEffect(() => {
    fetchConfigs();
  }, []);

  async function fetchConfigs() {
    setLoading(true);
    try {
      // 1. Fetch hero content for Intelligence Overview editor
      const { data: heroData } = await supabase
        .from('site_config')
        .select('*')
        .eq('id', 'home_hero')
        .single();
      
      if (heroData) {
        setBriefingContent(heroData.content || '');
      }

      // 2. Fetch dossier sections
      const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .in('id', DOSSIER_IDS);
      
      if (error) throw error;

      let rawData = data || [];
      
      // Prioritize home_gun over home_sniper
      const gunEntry = rawData.find(d => d.id === 'home_gun') || rawData.find(d => d.id === 'home_sniper');
      const otherEntries = rawData.filter(d => !['home_gun', 'home_sniper'].includes(d.id));
      
      let finalConfigs = [...otherEntries];
      if (gunEntry) {
        finalConfigs.push({ ...gunEntry, id: 'home_gun' });
      }
      
      // Ensure all essential dossier sections exist
      const existingIds = finalConfigs.map(d => d.id);
      const essentialIds = ['home_tank', 'home_gun', 'home_warship'];
      const missingIds = essentialIds.filter(id => !existingIds.includes(id));

      if (missingIds.length > 0) {
         const newConfigs = missingIds.map(id => ({
            id,
            title: id.split('_').pop()?.toUpperCase() || 'New Section',
            subtitle: 'Kategori Militer',
            content: 'Deskripsi dan sejarah lengkap mengenai kategori ini.',
            image_url: 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=1280&q=80'
         }));
         finalConfigs = [...finalConfigs, ...newConfigs];
      }

      setConfigs(finalConfigs.sort((a, b) => a.id.localeCompare(b.id)));
    } catch (err: any) {
      showToast('Gagal memuat konfigurasi: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(id: string, file: File) {
    setUploadingId(id);
    try {
      const currentConfig = configs.find(c => c.id === id);
      const oldUrl = currentConfig?.image_url;

      const url = await uploadImage(file, 'units', 'site');
      if (url) {
        setConfigs(prev => prev.map(c => c.id === id ? { ...c, image_url: url } : c));
        if (oldUrl && oldUrl.includes('supabase')) {
          setPendingDeletions(prev => [...prev, oldUrl]);
        }
        showToast('Gambar baru diunggah', 'success');
      }
    } catch (err) {
      showToast('Gagal mengunggah gambar', 'error');
    }
    setUploadingId(null);
  }

  async function handleSave() {
    setSaving(true);
    try {
      // 1. Process image deletions
      for (const url of pendingDeletions) {
        await deleteImage(url, 'units');
      }
      setPendingDeletions([]);

      // 2. Save Intelligence Overview content to home_hero
      const { error: heroError } = await supabase
        .from('site_config')
        .upsert({
          id: 'home_hero',
          title: 'WarTech Archive',
          subtitle: 'Exploring Military Technology, History, and Specifications',
          content: briefingContent,
          updated_at: new Date().toISOString()
        });
      if (heroError) throw heroError;

      // 3. Upsert each dossier config
      for (const config of configs) {
        const { error } = await supabase
          .from('site_config')
          .upsert({
            id: config.id,
            title: config.title,
            subtitle: config.subtitle,
            content: config.content,
            image_url: config.image_url,
            updated_at: new Date().toISOString()
          });
        if (error) throw error;
      }
      showToast('Semua konfigurasi berhasil disimpan!', 'success');
    } catch (err: any) {
      showToast('Gagal menyimpan: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-neon-green animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neon-green">Loading Terminal...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-10 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">Setup Landing Page</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Modifikasi konten untuk halaman utama sistem.</p>
        </div>
        <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={fetchConfigs}
            className="p-2.5 bg-slate-800 text-slate-400 rounded-lg hover:text-white transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 bg-neon-green text-black text-xs font-black uppercase tracking-widest rounded-lg hover:bg-neon-lime transition-all disabled:opacity-50 shadow-xl shadow-neon-green/20"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Menyimpan...' : 'Simpan Semua'}
          </button>
        </div>
      </div>

      {/* ─── Intelligence Overview Editor (home_hero.content) ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-steel-900 border border-neon-green/20 rounded-2xl overflow-hidden shadow-2xl relative"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-neon-green" />
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-neon-green/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-green/20 rounded-lg">
              <Terminal className="w-4 h-4 text-neon-green" />
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">
                Intelligence Overview
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Teks utama yang muncul di bawah Hero</p>
            </div>
          </div>
          <span className="text-[9px] font-mono text-neon-green/60 bg-black/40 px-2 py-1 rounded hidden sm:inline">
            home_hero.content
          </span>
        </div>
        <div className="p-5 sm:p-8">
          <textarea 
            rows={5}
            value={briefingContent}
            onChange={(e) => setBriefingContent(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 px-5 text-xs sm:text-sm text-slate-300 outline-none focus:border-neon-green/50 focus:bg-slate-900 transition-all resize-none leading-loose font-medium"
            placeholder="Tulis deskripsi utama Intelligence Overview..."
          />
          <div className="flex justify-between items-center px-1 mt-2">
            <p className="text-[9px] text-slate-600 uppercase font-bold tracking-widest italic">
              *Teks ini akan muncul di bagian Intelligence Overview halaman utama.
            </p>
            <span className="text-[9px] text-slate-700 font-mono">{briefingContent.length} karakter</span>
          </div>
        </div>
      </motion.div>

      {/* ─── Dossier Section Cards (Tank, Gun, Warship) ─── */}
      <div className="grid grid-cols-1 gap-10 sm:gap-12">
        <AnimatePresence>
          {configs.map((section, idx) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-steel-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-neon-green/40" />
              
              <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-800/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neon-green/10 rounded-lg">
                    <Layout className="w-4 h-4 text-neon-green" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-200">
                    Seksi: {section.id.split('_').pop()?.toUpperCase()}
                  </h4>
                </div>
                <span className="text-[9px] font-mono text-slate-600 bg-black/40 px-2 py-1 rounded hidden sm:inline">
                  UID: {section.id}
                </span>
              </div>

              <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
                {/* Media Column */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Visual Dossier</span>
                  </div>
                  <div className="relative group aspect-video lg:aspect-square rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-inner">
                    {section.image_url ? (
                      <img src={section.image_url} alt="Preview" className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-1000" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-800">
                        <ImageIcon className="w-10 h-10" />
                        <span className="text-[10px] font-bold uppercase">No Image</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                      <label className="cursor-pointer flex flex-col items-center gap-3">
                        <div className="p-4 bg-neon-green text-black rounded-full shadow-[0_0_20px_#39ff14]">
                          <Upload className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Ganti Media</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={(e) => e.target.files?.[0] && handleUpload(section.id, e.target.files[0])} 
                        />
                      </label>
                    </div>

                    {uploadingId === section.id && (
                      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-8 h-8 text-neon-green animate-spin" />
                        <span className="text-[9px] font-black text-neon-green uppercase tracking-widest">Uploading...</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[9px] text-slate-600 text-center uppercase tracking-widest leading-relaxed">
                    Gunakan gambar landscape (16:9) resolusi tinggi.
                  </p>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Type className="w-3.5 h-3.5 text-neon-green" />
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Judul Utama</label>
                      </div>
                      <input 
                        type="text" 
                        value={section.title}
                        onChange={(e) => setConfigs(prev => prev.map(c => c.id === section.id ? { ...c, title: e.target.value } : c))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3.5 px-5 text-sm text-white outline-none focus:border-neon-green/50 focus:bg-slate-900 transition-all font-black uppercase tracking-tight"
                        placeholder="Masukkan Judul..."
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sub-Judul / Label</label>
                      </div>
                      <input 
                        type="text" 
                        value={section.subtitle}
                        onChange={(e) => setConfigs(prev => prev.map(c => c.id === section.id ? { ...c, subtitle: e.target.value } : c))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3.5 px-5 text-sm text-white outline-none focus:border-neon-green/50 focus:bg-slate-900 transition-all"
                        placeholder="Masukkan Sub-judul..."
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deskripsi & Sejarah Singkat</label>
                    </div>
                    <textarea 
                      rows={5}
                      value={section.content}
                      onChange={(e) => setConfigs(prev => prev.map(c => c.id === section.id ? { ...c, content: e.target.value } : c))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 px-5 text-xs text-slate-300 outline-none focus:border-neon-green/50 focus:bg-slate-900 transition-all resize-none leading-loose font-medium"
                      placeholder="Masukkan deskripsi teknis dan sejarah singkat..."
                    />
                    <div className="flex justify-between items-center px-1">
                      <p className="text-[9px] text-slate-600 uppercase font-bold tracking-widest italic">
                        *Konten tampil di seksi dossier halaman beranda.
                      </p>
                      <span className="text-[9px] text-slate-700 font-mono">{section.content?.length || 0} karakter</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 sm:p-6 flex gap-4 sm:gap-5 items-start">
        <div className="p-2 sm:p-3 bg-blue-500/10 rounded-xl shrink-0">
           <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
        </div>
        <div className="space-y-2">
          <h4 className="text-xs sm:text-sm font-black text-blue-400 uppercase tracking-widest">Penting: Protokol Sinkronisasi</h4>
          <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed">
            Data yang Anda ubah akan langsung memperbarui database publik setelah disimpan. Pastikan teks sudah benar sebelum menekan tombol simpan.
          </p>
        </div>
      </div>
    </div>
  );
}
