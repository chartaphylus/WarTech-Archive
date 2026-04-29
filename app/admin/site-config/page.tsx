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
  Type
} from 'lucide-react';
import { showToast } from '@/components/Toast';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_IDS = ['home_hero', 'home_tank', 'home_sniper', 'home_warship'];

export default function SiteConfigPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [configs, setConfigs] = useState<any[]>([]);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [pendingDeletions, setPendingDeletions] = useState<string[]>([]);

  useEffect(() => {
    fetchConfigs();
  }, []);

  async function fetchConfigs() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .in('id', DEFAULT_IDS);
      
      if (error) throw error;
      
      const existingIds = data?.map(d => d.id) || [];
      const missingIds = DEFAULT_IDS.filter(id => !existingIds.includes(id));
      
      let finalConfigs = data || [];
      
      if (missingIds.length > 0) {
         const newConfigs = missingIds.map(id => ({
            id,
            title: id.split('_').pop()?.toUpperCase() || 'New Section',
            subtitle: 'Kategori Militer',
            content: 'Deskripsi dan sejarah lengkap mengenai kategori ini akan ditampilkan di halaman beranda.',
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
        
        // Add old URL to pending deletions if it was a storage URL
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
      // 1. Process deletions first
      for (const url of pendingDeletions) {
        await deleteImage(url, 'units');
      }
      setPendingDeletions([]);

      // 2. Upsert each config
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
      showToast('Konfigurasi berhasil disimpan dan Storage dibersihkan!', 'success');
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white">Setup Landing Page</h2>
          <p className="text-sm text-slate-500 mt-1">Modifikasi konten dossier untuk halaman utama sistem.</p>
        </div>
        <div className="flex gap-4">
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
            className="inline-flex items-center gap-3 px-8 py-3 bg-neon-green text-black text-xs font-black uppercase tracking-widest rounded-lg hover:bg-neon-lime transition-all disabled:opacity-50 shadow-xl shadow-neon-green/20"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Processing...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
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
              
              <div className="p-6 border-b border-slate-800 bg-slate-800/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neon-green/10 rounded-lg">
                    <Layout className="w-4 h-4 text-neon-green" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-200">
                    Seksi: {section.id.split('_').pop()?.toUpperCase()}
                  </h4>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-mono text-slate-600 bg-black/40 px-2 py-1 rounded">UID: {section.id}</span>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
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
                        <span className="text-[10px] font-bold uppercase">No Image Uploaded</span>
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
                    Disarankan menggunakan gambar landscape (16:9) dengan resolusi tinggi.
                  </p>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      rows={6}
                      value={section.content}
                      onChange={(e) => setConfigs(prev => prev.map(c => c.id === section.id ? { ...c, content: e.target.value } : c))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 px-5 text-xs text-slate-300 outline-none focus:border-neon-green/50 focus:bg-slate-900 transition-all resize-none leading-loose font-medium"
                      placeholder="Masukkan deskripsi teknis dan sejarah singkat..."
                    />
                    <div className="flex justify-between items-center px-1">
                      <p className="text-[9px] text-slate-600 uppercase font-bold tracking-widest italic">
                        *Konten ini akan tampil sebagai paragraf utama di seksi beranda.
                      </p>
                      <span className="text-[9px] text-slate-700 font-mono">{section.content?.length || 0} characters</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 flex gap-5 items-start">
        <div className="p-3 bg-blue-500/10 rounded-xl">
           <AlertCircle className="w-6 h-6 text-blue-400" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest">Penting: Protokol Sinkronisasi</h4>
          <p className="text-xs text-slate-500 leading-relaxed uppercase font-bold">
            Data yang Anda ubah di sini akan langsung memperbarui database publik. Pastikan teks sudah benar secara gramatikal sebelum menekan tombol simpan. Gambar yang diunggah akan otomatis dikompresi untuk performa optimal.
          </p>
        </div>
      </div>
    </div>
  );
}
