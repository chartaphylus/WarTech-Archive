import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TrafficTracker from '@/components/TrafficTracker';
import ContentWrapper from '@/components/ContentWrapper';
import ToastContainer from '@/components/Toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'WarTech Archive — Military Technology, History & Specifications',
    template: '%s · WarTech Archive',
  },
  description:
    'An educational archive exploring military technology, history, and specifications of the world\'s most significant weapons systems.',
  keywords: ['military', 'tank', 'warship', 'gun', 'weapons', 'defense', 'history'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <body className="bg-steel-950 text-white antialiased bg-tech-motif bg-fixed">
        <div className="scanline-overlay" />
        <TrafficTracker />
        <ToastContainer />
        <ContentWrapper>{children}</ContentWrapper>
      </body>
    </html>
  );
}
