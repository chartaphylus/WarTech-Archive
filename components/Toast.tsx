'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  X,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'security';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

let toastCount = 0;
const listeners: Set<(toast: Toast) => void> = new Set();

export const showToast = (message: string, type: ToastType = 'success') => {
  const id = `toast-${toastCount++}`;
  const toast = { id, message, type };
  listeners.forEach(listener => listener(toast));
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Toast) => {
    setToasts(prev => [...prev, toast]);
    setTimeout(() => {
      removeToast(toast.id);
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    listeners.add(addToast);
    return () => {
      listeners.delete(addToast);
    };
  }, [addToast]);

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast, onRemove: (id: string) => void }) {
  const icons = {
    success: <ShieldCheck className="w-5 h-5 text-neon-green" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
    security: <ShieldCheck className="w-5 h-5 text-neon-green" />
  };

  const colors = {
    success: 'border-neon-green/30 bg-steel-950/90 text-neon-green shadow-neon-green/5',
    error: 'border-red-500/30 bg-steel-950/90 text-red-400 shadow-red-500/5',
    warning: 'border-amber-400/30 bg-steel-950/90 text-amber-400 shadow-amber-400/5',
    info: 'border-blue-400/30 bg-steel-950/90 text-blue-400 shadow-blue-400/5',
    security: 'border-neon-green/30 bg-steel-950/90 text-neon-green shadow-neon-green/5'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95, transition: { duration: 0.2 } }}
      className={cn(
        "pointer-events-auto flex items-center gap-4 px-5 py-4 rounded-lg border backdrop-blur-xl shadow-2xl min-w-[320px] max-w-md relative overflow-hidden group",
        colors[toast.type]
      )}
    >
      {/* HUD Scanner Line Animation */}
      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-current/5 to-transparent skew-x-12"
      />

      <div className="shrink-0">{icons[toast.type]}</div>
      <div className="flex-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-0.5">
          {toast.type === 'security' ? 'System Auth' : 'Notification'}
        </p>
        <p className="text-xs font-bold tracking-tight text-white/90 leading-relaxed">
          {toast.message}
        </p>
      </div>
      <button 
        onClick={() => onRemove(toast.id)}
        className="p-1 hover:bg-white/10 rounded-md transition-colors"
      >
        <X className="w-4 h-4 text-white/40" />
      </button>

      {/* Progress Bar */}
      <motion.div 
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: "linear" }}
        className={cn("absolute bottom-0 left-0 h-0.5 opacity-50", 
          toast.type === 'success' ? 'bg-neon-green' : 
          toast.type === 'error' ? 'bg-red-500' : 'bg-current'
        )}
      />
    </motion.div>
  );
}
