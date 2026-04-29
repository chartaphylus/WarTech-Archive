'use client';

import { 
  Users, 
  Eye, 
  Database, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: 'Total Tayangan', value: '0', trend: '0%', up: true, icon: Eye },
    { label: 'Unit Terdaftar', value: '0', trend: '0', up: true, icon: Database },
    { label: 'Pengunjung Unik', value: '0', trend: '0%', up: false, icon: Users },
    { label: 'Avg. Retention', value: '0m 0s', trend: '0%', up: true, icon: Clock },
  ]);
  const [recentTraffic, setRecentTraffic] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        // Fetch total units
        const { count: unitCount } = await supabase
          .from('units')
          .select('*', { count: 'exact', head: true });

        // Fetch total traffic
        const { data: trafficData } = await supabase
          .from('traffic_stats')
          .select('view_count, path');
        
        const totalViews = trafficData?.reduce((acc, curr) => acc + (curr.view_count || 0), 0) || 0;
        const totalPages = trafficData?.length || 0;

        // Get most visited
        const mostVisited = trafficData?.sort((a, b) => b.view_count - a.view_count)[0];

        // Fetch categories (unique)
        const { data: categoryData } = await supabase
          .from('units')
          .select('category');
        const uniqueCategories = new Set(categoryData?.map(u => u.category)).size;

        // Fetch recent traffic logs
        const { data: recent } = await supabase
          .from('traffic_stats')
          .select('*')
          .order('last_viewed', { ascending: false })
          .limit(5);

        setStats([
          { label: 'Total Tayangan', value: totalViews.toLocaleString(), trend: '+14%', up: true, icon: Eye },
          { label: 'Unit Terdaftar', value: (unitCount || 0).toString(), trend: 'Active', up: true, icon: Database },
          { label: 'Kategori Aktif', value: uniqueCategories.toString(), trend: 'Live', up: true, icon: TrendingUp },
        ]);

        // Fetch Real Activity Logs (Combined updates from units and site_config)
        const { data: unitLogs } = await supabase
          .from('units')
          .select('name, updated_at')
          .order('updated_at', { ascending: false })
          .limit(3);

        const { data: configLogs } = await supabase
          .from('site_config')
          .select('id, updated_at')
          .order('updated_at', { ascending: false })
          .limit(3);

        const combinedLogs = [
          ...(unitLogs?.map(u => ({ action: `Update Unit: ${u.name}`, time: u.updated_at, type: 'unit' })) || []),
          ...(configLogs?.map(c => ({ action: `Update Config: ${c.id}`, time: c.updated_at, type: 'config' })) || []),
        ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 5);

        setActivityLogs(combinedLogs);
        if (recent) setRecentTraffic(recent);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tight text-white">Dashboard Overview</h2>
        <p className="text-sm text-slate-500 mt-1">Status sistem dan ringkasan aktivitas penggunaan.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-steel-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-neon-green/10 transition-colors">
                <stat.icon className="w-5 h-5 text-slate-400 group-hover:text-neon-green" />
              </div>
              <div className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded text-neon-green bg-neon-green/10">
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-black text-white mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Traffic */}
        <div className="lg:col-span-2 bg-steel-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300">Traffic Terkini</h3>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-800/30 text-slate-500 font-bold uppercase tracking-widest border-b border-slate-800">
                  <th className="px-6 py-4">Halaman</th>
                  <th className="px-6 py-4">Kunjungan</th>
                  <th className="px-6 py-4 text-right">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {recentTraffic.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 font-mono text-neon-green/80">{log.path}</td>
                    <td className="px-6 py-4 text-slate-300 font-bold">{log.view_count}</td>
                    <td className="px-6 py-4 text-right text-slate-500">
                      {log.last_viewed ? new Date(log.last_viewed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-steel-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300">Log Aktivitas</h3>
          </div>
          <div className="p-6 space-y-6">
            {activityLogs.map((log, i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== activityLogs.length - 1 && <div className="absolute left-1.5 top-6 bottom-[-24px] w-px bg-slate-800" />}
                <div className={cn(
                  "w-3 h-3 rounded-full mt-1.5 z-10",
                  log.type === 'unit' ? "bg-neon-green" : "bg-blue-400"
                )} />
                <div>
                  <p className="text-xs font-bold text-slate-200">{log.action}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {new Date(log.time).toLocaleDateString()} • {new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {activityLogs.length === 0 && (
              <p className="text-[10px] text-slate-600 uppercase text-center font-bold tracking-widest py-10">Tidak ada aktivitas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
