'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { uploadImage, deleteImage } from '@/lib/storage';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Trash2,
  Info,
  Globe,
  Layers,
  Upload,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { showToast } from '@/components/Toast';
import Link from 'next/link';

export default function EditUnitPage() {
  const router = useRouter();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState<any>({
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

  const [specs, setSpecs] = useState<any[]>([]);
  const [techs, setTechs] = useState<string[]>([]);
  const [oldImageUrl, setOldImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (id) fetchUnitData();
  }, [id]);

  async function fetchUnitData() {
    setLoading(true);
    try {
      // 1. Fetch main unit
      const { data: unit, error } = await supabase
        .from('units')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setFormData(unit);
      setOldImageUrl(unit.image_url);
      setImagePreview(unit.image_url);

      // 2. Fetch specs
      const { data: specData } = await supabase
        .from('specifications')
        .select('*')
        .eq('unit_id', id)
        .order('sort_order');
      
      setSpecs(specData || []);

      // 3. Fetch techs
      const { data: techData } = await supabase
        .from('technologies')
        .select('*')
        .eq('unit_id', id);
      
      setTechs(techData?.map(t => t.name) || []);
    } catch (err) {
      console.error('Error fetching unit:', err);
      showToast('Gagal mengambil data unit.', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImageUrl = formData.image_url;

      // Upload new image if selected
      if (selectedFile) {
        setUploading(true);
        const url = await uploadImage(selectedFile, 'units', 'units');
        if (!url) throw new Error('Gagal mengunggah gambar baru.');
        finalImageUrl = url;
        setUploading(false);
      }

      // 1. Update unit
      const { error: unitError } = await supabase
        .from('units')
        .update({
          name: formData.name,
          slug: formData.slug,
          category: formData.category,
          subcategory: formData.subcategory,
          country: formData.country,
          country_code: formData.country_code,
          year: formData.year,
          image_url: finalImageUrl,
          description: formData.description,
          history: formData.history,
          featured: formData.featured,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (unitError) throw unitError;

      // 2. If image changed, delete old one from storage
      if (selectedFile && oldImageUrl && oldImageUrl !== finalImageUrl && oldImageUrl.includes('supabase')) {
        await deleteImage(oldImageUrl, 'units');
      }

      // 3. Sync Specs (Delete all then re-insert for simplicity)
      await supabase.from('specifications').delete().eq('unit_id', id);
      if (specs.length > 0) {
        await supabase.from('specifications').insert(
          specs.map((s, idx) => ({ 
            unit_id: id, 
            label: s.label, 
            value: s.value, 
            sort_order: idx 
          }))
        );
      }

      // 4. Sync Techs
      await supabase.from('technologies').delete().eq('unit_id', id);
      if (techs.length > 0) {
        await supabase.from('technologies').insert(
          techs.map(t => ({ unit_id: id, name: t }))
        );
      }

      showToast('Unit militer berhasil diperbarui!', 'success');
      router.push('/admin/units');
      router.refresh();
    } catch (err: any) {
      console.error(err);
      showToast('Gagal memperbarui unit: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-neon-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/units" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <Link href="/admin/units" className="hover:text-neon-green transition-colors">Unit Militer</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Edit Unit</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={saving || uploading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-neon-lime transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Menyimpan...' : 'Perbarui Unit'}
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="bg-steel-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 text-neon-green mb-2">
              <Info className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Identitas Unit</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nama Unit</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-sm text-white focus:border-neon-green/50 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Slug (URL)</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-sm font-mono text-neon-green/70 focus:border-neon-green/50 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Deskripsi Ringkas</label>
              <textarea 
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-sm text-white focus:border-neon-green/50 outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Arsip Sejarah</label>
              <textarea 
                rows={6}
                value={formData.history}
                onChange={(e) => setFormData({...formData, history: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-sm text-white focus:border-neon-green/50 outline-none"
              />
            </div>
          </div>

          {/* Specs */}
          <div className="bg-steel-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neon-green">
                <Layers className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Spesifikasi Teknis</span>
              </div>
              <button 
                type="button"
                onClick={() => setSpecs([...specs, { label: '', value: '' }])}
                className="text-[10px] font-bold text-neon-green hover:underline uppercase"
              >
                + Tambah
              </button>
            </div>

            <div className="space-y-3">
              {specs.map((spec, i) => (
                <div key={i} className="flex gap-3">
                  <input 
                    placeholder="Label (ex: Kecepatan)" 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-xs text-white focus:border-neon-green/50 outline-none"
                    value={spec.label}
                    onChange={(e) => {
                      const newSpecs = [...specs];
                      newSpecs[i].label = e.target.value;
                      setSpecs(newSpecs);
                    }}
                  />
                  <input 
                    placeholder="Value" 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-xs text-white focus:border-neon-green/50 outline-none"
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
                    className="p-2.5 text-red-400 hover:bg-red-400/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Media */}
          <div className="bg-steel-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 text-neon-green mb-2">
              <ImageIcon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Media Visual</span>
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
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter group-hover:text-slate-400 text-center px-4">
                      {uploading ? 'Memproses Gambar...' : 'Klik untuk ganti gambar'}
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
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-steel-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 text-neon-green mb-2">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Metadata</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Kategori Utama</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-sm text-white focus:border-neon-green/50 outline-none"
                >
                  <option value="tank">Tanks</option>
                  <option value="sniper">Snipers</option>
                  <option value="warship">Warships</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Asal Negara</label>
                <input 
                  type="text" 
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-sm text-white focus:border-neon-green/50 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tahun Aktif</label>
                <input 
                  type="number" 
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-sm text-white focus:border-neon-green/50 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-neon-green/5 border border-neon-green/20 rounded-xl p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-neon-green focus:ring-neon-green"
              />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">Halaman Unggulan</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
