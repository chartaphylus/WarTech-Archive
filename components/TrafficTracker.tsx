'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function TrafficTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // We only log if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const logView = async () => {
      try {
        // Upsert logic: If path exists, increment. Otherwise insert.
        // This is a simple counter. For detailed logs, use a separate table with timestamps.
        const { error } = await supabase.rpc('increment_traffic', { page_path: pathname });
        
        if (error) {
          // If RPC is not setup, try a direct upsert as fallback
          const { data: existing } = await supabase
            .from('traffic_stats')
            .select('id, view_count')
            .eq('path', pathname)
            .single();

          if (existing) {
            await supabase
              .from('traffic_stats')
              .update({ 
                view_count: (existing.view_count || 0) + 1,
                last_viewed: new Date().toISOString()
              })
              .eq('id', existing.id);
          } else {
            await supabase
              .from('traffic_stats')
              .insert({ path: pathname, view_count: 1 });
          }
        }
      } catch (err) {
        // Silent fail
      }
    };

    logView();
  }, [pathname]);

  return null; // Invisible component
}
