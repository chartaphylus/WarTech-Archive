'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/storage';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Plus, 
  Trash2,
  Info,
  Globe,
  Layers,
  Upload,
  Loader2
} from 'lucide-react';
import { showToast } from '@/components/Toast';
import Link from 'next/link';

export default function NewUnitPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'tank',
    subcategory: '',
    country: '',
    country_code: '',
    year: new Date().getFullYear(),
    image_url: '',
    description: '',
    history: '',
    featured: false
  });

  const [specs, setSpecs] = useState([{ label: '', value: '' }]);
  const [techs, setTechs] = useState(['']);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile && !formData.image_url) {
      showToast('Harap pilih gambar unit dahulu.', 'warning');
      return;
    }
    setLoading(true);

    try {
      let finalImageUrl = formData.image_url;

      // Upload image only now
      if (selectedFile) {
        setUploading(true);
        const url = await uploadImage(selectedFile, 'units', 'units');
        if (!url) throw new Error('Gagal mengunggah gambar ke storage.');
        finalImageUrl = url;
        setUploading(false);
      }

      // 1. Insert unit
      const { data: unit, error: unitError } = await supabase
        .from('units')
        .insert([{ ...formData, image_url: finalImageUrl }])
        .select()
        .single();

      if (unitError) throw unitError;

      // 2. Insert specs
      if (specs.length > 0 && specs[0].label) {
        const { error: specError } = await supabase
          .from('specifications')
          .insert(specs.map(s => ({ ...s, unit_id: unit.id })));
        if (specError) throw specError;
      }

      // 3. Insert techs
      if (techs.length > 0 && techs[0]) {
        const { error: techError } = await supabase
          .from('technologies')
          .insert(techs.map(t => ({ name: t, unit_id: unit.id })));
        if (techError) throw techError;
      }

      showToast('Unit militer berhasil didaftarkan!', 'success');
      router.push('/admin/units');
    } catch (err: any) {
      console.error(err);
      showToast(`Kesalahan: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/units" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">Tambah Unit Baru</h2>
            <p className="text-sm text-slate-500">Daftarkan teknologi militer baru ke dalam database WarTech.</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || uploading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-neon-lime transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {loading ? 'Menyimpan...' : 'Simpan Unit'}
        </button>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-steel-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 text-neon-green mb-2">
              <Info className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Informasi Dasar</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nama Unit</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                  placeholder="Contoh: M1 Abrams"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:border-neon-green/50 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Slug (URL)</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-sm font-mono text-neon-green/70 focus:border-neon-green/50 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Deskripsi Singkat</label>
              <textarea 
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:border-neon-green/50 outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sejarah Lengkap</label>
              <textarea 
                rows={6}
                value={formData.history}
                onChange={(e) => setFormData({...formData, history: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:border-neon-green/50 outline-none"
              />
            </div>
          </div>

          {/* Specs & Tech */}
          <div className="bg-steel-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 text-neon-green mb-2">
              <Layers className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Spesifikasi & Teknologi</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Spesifikasi Teknis</label>
                <button 
                  type="button"
                  onClick={() => setSpecs([...specs, { label: '', value: '' }])}
                  className="text-[10px] font-bold text-neon-green hover:underline uppercase"
                >
                  + Tambah Baris
                </button>
              </div>
              {specs.map((spec, i) => (
                <div key={i} className="flex gap-2">
                  <input 
                    placeholder="Label (ex: Berat)" 
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-xs focus:border-neon-green/50 outline-none"
                    value={spec.label}
                    onChange={(e) => {
                      const newSpecs = [...specs];
                      newSpecs[i].label = e.target.value;
                      setSpecs(newSpecs);
                    }}
                  />
                  <input 
                    placeholder="Value (ex: 68 ton)" 
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-xs focus:border-neon-green/50 outline-none"
                    value={spec.value}
                    onChange={(e) => {
                      const newSpecs = [...specs];
                      newSpecs[i].value = e.target.value;
                      setSpecs(newSpecs);
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setSpecs(specs.filter((_, idx) => idx !== i))}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Teknologi & Fitur</label>
                <button 
                  type="button"
                  onClick={() => setTechs([...techs, ''])}
                  className="text-[10px] font-bold text-neon-green hover:underline uppercase"
                >
                  + Tambah Fitur
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1">
                    <input 
                      placeholder="Nama Teknologi" 
                      className="bg-transparent border-none text-xs focus:outline-none text-neon-green/80 w-32"
                      value={tech}
                      onChange={(e) => {
                        const newTechs = [...techs];
                        newTechs[i] = e.target.value;
                        setTechs(newTechs);
                      }}
                    />
                    <button 
                      type="button"
                      onClick={() => setTechs(techs.filter((_, idx) => idx !== i))}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Media */}
        <div className="space-y-6">
          <div className="bg-steel-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 text-neon-green mb-2">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Klasifikasi</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Kategori Utama</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:border-neon-green/50 outline-none"
                >
                  <option value="tank">Tanks</option>
                  <option value="gun">Guns</option>
                  <option value="warship">Warships</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sub-Kategori</label>
                <input 
                  type="text" 
                  value={formData.subcategory}
                  onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                  placeholder="ex: main-battle-tank"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:border-neon-green/50 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Asal Negara</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    placeholder="Nama Negara (ex: Jerman)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:border-neon-green/50 outline-none"
                  />
                  <select
                    value={formData.country_code}
                    onChange={(e) => setFormData({...formData, country_code: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:border-neon-green/50 outline-none text-slate-300"
                  >
                    <option value="">Pilih Kode (Bendera)</option>
                    <option value="us">USA (us)</option>
                    <option value="ru">Russia (ru)</option>
                    <option value="de">Germany (de)</option>
                    <option value="id">Indonesia (id)</option>
                    <option value="gb">United Kingdom (gb)</option>
                    <option value="fr">France (fr)</option>
                    <option value="cn">China (cn)</option>
                    <option value="jp">Japan (jp)</option>
                    <option value="kr">South Korea (kr)</option>
                    <option value="il">Israel (il)</option>
                    <option value="ua">Ukraine (ua)</option>
                    <option value="tr">Turkey (tr)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tahun Aktif</label>
                <input 
                  type="number" 
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:border-neon-green/50 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Box */}
          <div className="bg-steel-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 text-neon-green mb-2">
              <ImageIcon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Media Utama</span>
            </div>

            <div className="space-y-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video w-full rounded-lg bg-slate-950 border-2 border-dashed border-slate-800 flex flex-col items-center justify-center gap-2 overflow-hidden cursor-pointer hover:border-neon-green/40 transition-all group"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    {uploading ? (
                      <Loader2 className="w-8 h-8 text-neon-green animate-spin" />
                    ) : (
                      <Upload className="w-8 h-8 text-slate-700 group-hover:text-neon-green transition-colors" />
                    )}
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter group-hover:text-slate-400">
                      {uploading ? 'Processing Image...' : 'Click to select image'}
                    </span>
                  </>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
              <p className="text-[9px] text-slate-500 text-center uppercase tracking-widest">
                Format: JPG, PNG, WEBP (Max 5MB)
              </p>
            </div>
          </div>

          <div className="bg-neon-green/5 border border-neon-green/20 rounded-xl p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-neon-green focus:ring-neon-green"
              />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">Tampilkan di Unggulan</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
