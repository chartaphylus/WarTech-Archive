const BADGE_META: Record<string, { label: string; color: string }> = {
  // Tank subcategories
  'main-battle-tank': { label: 'MBT', color: 'bg-amber-900/50 text-amber-300 border-amber-500/30' },
  'light-tank':       { label: 'Light Tank', color: 'bg-yellow-900/50 text-yellow-300 border-yellow-500/30' },
  'heavy-tank':       { label: 'Heavy Tank', color: 'bg-orange-900/50 text-orange-300 border-orange-500/30' },
  // Sniper subcategories
  'anti-materiel':        { label: 'Anti-Materiel', color: 'bg-red-900/40 text-red-300 border-red-400/30' },
  'designated-marksman':  { label: 'DMR', color: 'bg-rose-900/40 text-rose-300 border-rose-400/30' },
  'bolt-action':          { label: 'Bolt-Action', color: 'bg-pink-900/40 text-pink-300 border-pink-400/30' },
  // Warship subcategories
  'aircraft-carrier': { label: 'Carrier', color: 'bg-blue-900/40 text-blue-300 border-blue-400/30' },
  'destroyer':        { label: 'Destroyer', color: 'bg-cyan-900/40 text-cyan-300 border-cyan-400/30' },
  'cruiser':          { label: 'Cruiser', color: 'bg-sky-900/40 text-sky-300 border-sky-400/30' },
  'submarine':        { label: 'Submarine', color: 'bg-teal-900/40 text-teal-300 border-teal-400/30' },
  'frigate':          { label: 'Frigate', color: 'bg-indigo-900/40 text-indigo-300 border-indigo-400/30' },
};

interface CategoryBadgeProps {
  subcategory: string;
}

export default function CategoryBadge({ subcategory }: CategoryBadgeProps) {
  const meta = BADGE_META[subcategory] ?? {
    label: subcategory.replace(/-/g, ' '),
    color: 'bg-steel-700 text-steel-300 border-steel-500/30',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm ${meta.color}`}>
      {meta.label}
    </span>
  );
}
