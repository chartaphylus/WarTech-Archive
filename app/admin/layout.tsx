'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Database, 
  Settings, 
  LogOut, 
  Shield, 
  Menu, 
  X,
  Layout,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { showToast } from '@/components/Toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else if (session && pathname === '/admin/login') {
        router.push('/admin');
      }
      setCheckingAuth(false);
    }
    checkUser();
  }, [pathname, router]);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Unit Militer', href: '/admin/units', icon: Database },
    { name: 'Perang Dunia', href: '/admin/world-wars', icon: BookOpen },
    { name: 'Landing Page', href: '/admin/site-config', icon: Layout },
    { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
  ];

  // If we are on the login page, don't show the dashboard layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-steel-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-neon-green/20 border-t-neon-green rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showToast('Gagal logout: ' + error.message, 'error');
    } else {
      showToast('Sesi diakhiri. Kembali ke beranda.', 'success');
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-steel-950 text-slate-200">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-steel-900 border-r border-slate-800 transition-transform duration-300 transform lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-neon-green/20 rounded flex items-center justify-center">
              <Shield className="w-5 h-5 text-neon-green" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tighter uppercase">WarTech</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Admin Terminal</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                  pathname === item.href 
                    ? "bg-neon-green/10 text-neon-green" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5",
                  pathname === item.href ? "text-neon-green" : "text-slate-500 group-hover:text-slate-400"
                )} />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Keluar Sesi
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-steel-900/80 backdrop-blur-md sticky top-0 z-30 px-4 flex items-center justify-between">
          <button 
            className="p-2 -ml-2 lg:hidden text-slate-400"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-slate-200">Administrator</span>
              <span className="text-[10px] text-neon-green font-mono">ID: WT-001</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=admin" alt="Admin" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
