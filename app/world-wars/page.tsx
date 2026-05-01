import { Metadata } from 'next';
import { fetchWorldWarEvents } from '@/lib/data';
import WorldWarTimeline from '@/components/WorldWarTimeline';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sejarah Perang Dunia',
  description: 'Timeline lengkap Perang Dunia I (1914-1918) dan Perang Dunia II (1939-1945) — peristiwa, tokoh, dan momen penting.',
};

export default async function WorldWarPage() {
  const events = await fetchWorldWarEvents();

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-tech-motif opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <WorldWarTimeline events={events} />
    </div>
  );
}
