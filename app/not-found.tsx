import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-steel-950 flex flex-col items-center justify-center px-4">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" style={{ backgroundSize: '60px 60px' }} />

      <div className="relative z-10 text-center">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-neon-green mb-4">
          ── Error 404 ──
        </p>
        <h1
          className="text-8xl md:text-9xl font-black text-white uppercase leading-none mb-4"
          style={{ textShadow: '0 0 60px rgba(57,255,20,0.15)' }}
        >
          4<span className="text-neon-green">0</span>4
        </h1>
        <p className="text-steel-400 text-sm tracking-widest uppercase mb-10">
          Unit not found in database.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-neon-green text-steel-950 text-xs font-black tracking-widest uppercase rounded
            hover:bg-neon-lime hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-200"
        >
          Return to Archive
        </Link>
      </div>
    </div>
  );
}
