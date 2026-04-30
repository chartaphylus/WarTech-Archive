'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { deleteImage } from '@/lib/storage';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink,
  Filter,
  Database,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from '@/components/Toast';

export default function AdminUnitsPage() {
  const [units, setUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchUnits();
  }, []);

  async function fetchUnits() {
    setLoading(true);
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setUnits(data);
    } else {
      setUnits([]);
      if (error) console.error('Error fetching units:', error.message);
    }
    setLoading(false);
  }

  async function handleDelete(id: string, imageUrl: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus unit ini?')) return;
    
    try {
      if (imageUrl && imageUrl.includes('supabase')) {
        await deleteImage(imageUrl, 'units');
      }

      const { error } = await supabase
        .from('units')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setUnits(prev => prev.filter(u => u.id !== id));
      showToast('Unit militer berhasil dihapus dari arsip.', 'success');
    } catch (err: any) {
      showToast('Gagal menghapus unit: ' + err.message, 'error');
    }
  }

  const filteredUnits = units.filter(unit => {
    const matchesSearch = unit.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || 
      (unit.category && unit.category.toLowerCase().includes(filterCategory.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">Manajemen Unit</h2>
          <p className="text-sm text-slate-500 mt-1">Total {units.length} unit militer dalam arsip.</p>
        </div>
        <Link
          href="/admin/units/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-neon-green text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-neon-lime transition-all shadow-lg shadow-neon-green/10"
        >
          <Plus className="w-4 h-4" />
          Tambah Unit Baru
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 p-4 bg-steel-900 border border-slate-800 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Cari nama unit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-green/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-neon-green/50 transition-colors text-slate-300"
          >
            <option value="all">Semua Kategori</option>
            <option value="tank">Tanks</option>
            <option value="sniper">Snipers</option>
            <option value="warship">Warships</option>
          </select>
          <button className="p-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors text-slate-400">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-steel-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-800/30 text-slate-500 font-bold uppercase tracking-widest border-b border-slate-800">
              <th className="px-6 py-4">Nama Unit</th>
              <th className="px-6 py-4">Kategori / Sub</th>
              <th className="px-6 py-4">Asal & Tahun</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <Loader2 className="w-8 h-8 text-neon-green animate-spin mx-auto" />
                </td>
              </tr>
            ) : (
              <AnimatePresence mode='popLayout'>
                {filteredUnits.map((unit) => (
                  <motion.tr 
                    key={unit.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-slate-800/20 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                          {unit.image_url ? (
                            <img src={unit.image_url} alt={unit.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-900">
                              <Database className="w-4 h-4 text-slate-600" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-200">{unit.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">#{unit.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-neon-green/80 font-bold uppercase text-[10px] tracking-wider">{unit.category}</span>
                        <span className="text-slate-500 text-[10px] uppercase">{unit.subcategory?.replace(/-/g, ' ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-300">{unit.country}</span>
                        <span className="text-slate-500 font-mono">{unit.year}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {unit.featured ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 text-[9px] font-bold uppercase border border-amber-400/20">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 text-[9px] font-bold uppercase border border-slate-700">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/units/${unit.id}`}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(unit.id, unit.image_url)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <Link 
                          href={`/unit/${unit.slug}`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-neon-green hover:bg-neon-green/10 rounded-lg transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
