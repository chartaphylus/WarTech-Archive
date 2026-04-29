import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-steel-800/60 bg-steel-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 border border-neon-green/40 bg-neon-green/10 rounded flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-neon-green rounded-full" />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-steel-400">
              WarTech Archive
            </span>
          </div>

          <p className="text-[10px] text-steel-600 tracking-wider text-center max-w-sm">
            Website ini dibuat untuk tujuan edukasi dan mengenalkan teknologi perang di seluruh dunia · Data sourced from public records
          </p>

          <div className="flex items-center gap-4">
            {[
              { href: '/', label: 'Home' },
              { href: '/category/tank', label: 'Tanks' },
              { href: '/category/sniper', label: 'Snipers' },
              { href: '/category/warship', label: 'Warships' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] font-semibold tracking-widest uppercase text-steel-500 hover:text-neon-green transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
