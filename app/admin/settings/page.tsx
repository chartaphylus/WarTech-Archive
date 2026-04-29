'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/storage';
import { 
  Save, 
  Image as ImageIcon, 
  Upload, 
  Loader2, 
  Monitor,
  Shield,
  Info
} from 'lucide-react';
import { showToast } from '@/components/Toast';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loginBg, setLoginBg] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    const { data } = await supabase
      .from('site_config')
      .select('*')
      .eq('id', 'login_bg')
      .single();
    
    if (data) {
      setLoginBg(data.image_url);
    }
    setLoading(false);
  }

  async function handleUpload(file: File) {
    setUploading(true);
    const url = await uploadImage(file, 'units', 'admin');
    if (url) {
      setLoginBg(url);
      showToast('Gambar background diunggah', 'success');
    } else {
      showToast('Gagal mengunggah gambar', 'error');
    }
    setUploading(false);
  }

  async function handleSave() {
    setSaving(true);
    const { error } = await supabase
      .from('site_config')
      .upsert({ 
        id: 'login_bg', 
        title: 'Login Background', 
        image_url: loginBg,
        updated_at: new Date().toISOString()
      });

    if (error) {
      showToast('Gagal menyimpan: ' + error.message, 'error');
    } else {
      showToast('Pengaturan sistem berhasil disimpan!', 'success');
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-neon-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">Pengaturan Sistem</h2>
          <p className="text-sm text-slate-500 mt-1">Konfigurasi keamanan dan tampilan internal terminal.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-neon-lime transition-all disabled:opacity-50 shadow-lg shadow-neon-green/20"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Simpan' : 'Simpan Perubahan'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <section className="bg-steel-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 bg-slate-800/20 flex items-center gap-3">
            <Monitor className="w-5 h-5 text-neon-green" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200">Terminal Login Theme</h3>
          </div>

          <div className="p-8 space-y-8">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-200">Login Background Image</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Ubah atmosfer terminal akses dengan mengunggah gambar latar belakang kustom. Gunakan gambar bertema teknologi atau militer untuk estetika terbaik.
                  </p>
                </div>

                <div className="relative group aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  {loginBg ? (
                    <img src={loginBg} alt="Login Background" className="w-full h-full object-cover opacity-50" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-800">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-[9px] font-bold uppercase">No Background Set</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-white" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Ganti Gambar</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                      />
                    </label>
                  </div>

                  {uploading && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-neon-green animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-72 p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                 <div className="flex items-center gap-2 text-slate-600">
                    <Shield className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Mockup Preview</span>
                 </div>
                 <div className="aspect-video w-full bg-steel-900 rounded border border-slate-800 relative overflow-hidden flex items-center justify-center">
                    {loginBg && <img src={loginBg} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="" />}
                    <div className="relative z-10 w-20 h-12 bg-steel-800/80 border border-slate-700 rounded-lg p-2 scale-75" />
                 </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
