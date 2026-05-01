'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Save, Loader2, Plus, Trash2, Edit3, X, 
  Swords, ScrollText, Flame, Flag, BookOpen, AlertTriangle, Shield, Star, Calendar
} from 'lucide-react';
import { showToast } from '@/components/Toast';
import { motion, AnimatePresence } from 'framer-motion';

const EVENT_TYPES = [
  { value: 'battle', label: 'Pertempuran' },
  { value: 'treaty', label: 'Perjanjian' },
  { value: 'invasion', label: 'Invasi' },
  { value: 'surrender', label: 'Penyerahan' },
  { value: 'declaration', label: 'Deklarasi' },
  { value: 'event', label: 'Peristiwa' },
  { value: 'atrocity', label: 'Kekejaman' },
  { value: 'turning_point', label: 'Titik Balik' },
];

const EMPTY_EVENT = {
  war: 'ww1' as 'ww1' | 'ww2',
  title: '',
  event_date: '',
  year: new Date().getFullYear(),
  description: '',
  key_figures: '',
  nations: '',
  event_type: 'event',
  image_url: '',
  sort_order: 0,
};

export default function WorldWarsAdminPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [filterWar, setFilterWar] = useState<'all' | 'ww1' | 'ww2'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => { fetchEvents(); }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from('world_war_events')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      showToast('Gagal memuat data: ' + error.message, 'error');
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  }

  async function handleSave() {
    if (!editing) return;
    if (!editing.title || !editing.description) {
      showToast('Judul dan deskripsi wajib diisi', 'error');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        war: editing.war,
        title: editing.title,
        event_date: editing.event_date || null,
        year: parseInt(editing.year) || new Date().getFullYear(),
        description: editing.description,
        key_figures: editing.key_figures || null,
        nations: editing.nations || null,
        event_type: editing.event_type,
        image_url: editing.image_url || null,
        sort_order: parseInt(editing.sort_order) || 0,
        updated_at: new Date().toISOString(),
      };

      if (isNew) {
        const { error } = await supabase.from('world_war_events').insert(payload);
        if (error) throw error;
        showToast('Peristiwa baru berhasil ditambahkan!', 'success');
      } else {
        const { error } = await supabase.from('world_war_events').update(payload).eq('id', editing.id);
        if (error) throw error;
        showToast('Peristiwa berhasil diperbarui!', 'success');
      }

      setEditing(null);
      setIsNew(false);
      fetchEvents();
    } catch (err: any) {
      showToast('Gagal menyimpan: ' + err.message, 'error');
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from('world_war_events').delete().eq('id', id);
    if (error) {
      showToast('Gagal menghapus: ' + error.message, 'error');
    } else {
      showToast('Peristiwa berhasil dihapus', 'success');
      setDeleteConfirm(null);
      fetchEvents();
    }
  }

  const filteredEvents = filterWar === 'all' ? events : events.filter(e => e.war === filterWar);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-neon-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">Sejarah Perang Dunia</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Kelola data peristiwa Perang Dunia I dan II.</p>
        </div>
        <button
          onClick={() => { setEditing({ ...EMPTY_EVENT }); setIsNew(true); }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon-green text-black text-xs font-black uppercase tracking-widest rounded-lg hover:bg-neon-lime transition-all shadow-lg shadow-neon-green/20"
        >
          <Plus className="w-4 h-4" />
          Tambah Peristiwa
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { key: 'all' as const, label: 'Semua' },
          { key: 'ww1' as const, label: 'PD I' },
          { key: 'ww2' as const, label: 'PD II' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterWar(tab.key)}
            className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded border transition-all ${
              filterWar === tab.key
                ? 'text-neon-green border-neon-green/50 bg-neon-green/10'
                : 'text-slate-400 border-slate-800 bg-slate-900/50 hover:border-slate-700'
            }`}
          >
            {tab.label} ({tab.key === 'all' ? events.length : events.filter(e => e.war === tab.key).length})
          </button>
        ))}
      </div>

      {/* Event List */}
      <div className="space-y-3">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-steel-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 hover:border-slate-700 transition-colors">
            {/* Sort Order Number */}
            <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
              <span className="text-xs font-mono font-bold text-neon-green">{event.sort_order}</span>
            </div>
            <div className={`shrink-0 px-2 py-1 text-[8px] font-black uppercase tracking-widest rounded border ${
              event.war === 'ww1' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' : 'text-blue-400 bg-blue-400/10 border-blue-400/20'
            }`}>
              {event.war === 'ww1' ? 'PD I' : 'PD II'}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white truncate">{event.title}</h4>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] text-slate-500 font-mono">{event.year}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase font-bold tracking-wider">
                  {EVENT_TYPES.find(t => t.value === event.event_type)?.label || event.event_type}
                </span>
              </div>
            </div>

            <div className="flex gap-2 shrink-0 self-end sm:self-auto">
              <button
                onClick={() => { setEditing({ ...event }); setIsNew(false); }}
                className="p-2 text-slate-400 hover:text-neon-green hover:bg-neon-green/10 rounded-lg transition-all"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              {deleteConfirm === event.id ? (
                <div className="flex gap-1">
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="px-3 py-1.5 text-[10px] font-bold text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg hover:bg-red-400/20"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-3 py-1.5 text-[10px] font-bold text-slate-400 bg-slate-800 border border-slate-700 rounded-lg"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(event.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 text-slate-600">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase">Tidak ada data peristiwa</p>
          </div>
        )}
      </div>

      {/* ── Edit/Create Modal ── */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 overflow-y-auto"
            onClick={(e) => { if (e.target === e.currentTarget) { setEditing(null); setIsNew(false); } }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-full max-w-2xl bg-steel-900 border border-slate-700 rounded-2xl shadow-2xl mb-10"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest text-white">
                  {isNew ? 'Tambah Peristiwa Baru' : 'Edit Peristiwa'}
                </h3>
                <button onClick={() => { setEditing(null); setIsNew(false); }} className="p-2 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-5 sm:space-y-6 max-h-[65vh] overflow-y-auto">
                {/* Row: War + Type + Year */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Perang</label>
                    <select
                      value={editing.war}
                      onChange={e => setEditing({ ...editing, war: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-neon-green/50"
                    >
                      <option value="ww1">Perang Dunia I</option>
                      <option value="ww2">Perang Dunia II</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipe Peristiwa</label>
                    <select
                      value={editing.event_type}
                      onChange={e => setEditing({ ...editing, event_type: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-neon-green/50"
                    >
                      {EVENT_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tahun</label>
                    <input
                      type="number"
                      value={editing.year}
                      onChange={e => setEditing({ ...editing, year: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-neon-green/50"
                    />
                  </div>
                </div>

                {/* Row: Title + Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Judul Peristiwa *</label>
                    <input
                      type="text"
                      value={editing.title}
                      onChange={e => setEditing({ ...editing, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-neon-green/50"
                      placeholder="Misal: Pertempuran Somme"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal (opsional)</label>
                    <input
                      type="date"
                      value={editing.event_date || ''}
                      onChange={e => setEditing({ ...editing, event_date: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-neon-green/50"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deskripsi Lengkap *</label>
                  <textarea
                    rows={6}
                    value={editing.description}
                    onChange={e => setEditing({ ...editing, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-xs text-slate-300 outline-none focus:border-neon-green/50 resize-none leading-loose"
                    placeholder="Jelaskan peristiwa secara lengkap..."
                  />
                </div>

                {/* Key Figures + Nations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tokoh Penting</label>
                    <input
                      type="text"
                      value={editing.key_figures || ''}
                      onChange={e => setEditing({ ...editing, key_figures: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-neon-green/50"
                      placeholder="Pisahkan dengan koma"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Negara Terlibat</label>
                    <input
                      type="text"
                      value={editing.nations || ''}
                      onChange={e => setEditing({ ...editing, nations: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-neon-green/50"
                      placeholder="Pisahkan dengan koma"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">URL Gambar (opsional)</label>
                  <input
                    type="text"
                    value={editing.image_url || ''}
                    onChange={e => setEditing({ ...editing, image_url: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-neon-green/50"
                    placeholder="https://example.com/image.jpg"
                  />
                  {editing.image_url && (
                    <div className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-slate-700">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={editing.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Sort Order */}
                <div className="w-32 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Urutan</label>
                  <input
                    type="number"
                    value={editing.sort_order}
                    onChange={e => setEditing({ ...editing, sort_order: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-neon-green/50"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-5 sm:p-6 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => { setEditing(null); setIsNew(false); }}
                  className="px-5 py-2.5 text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700 rounded-lg hover:text-white"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black text-xs font-black uppercase tracking-widest rounded-lg hover:bg-neon-lime disabled:opacity-50 shadow-lg shadow-neon-green/20"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
