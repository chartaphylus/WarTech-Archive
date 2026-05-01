import { Metadata } from 'next';
import { fetchLandingPageSections } from '@/lib/data';
import Hero from '@/components/Hero';
import AnimatedHome from '@/components/AnimatedHome';
import BriefingSection from '@/components/BriefingSection';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'WarTech Archive — Military Technology, History & Specifications',
  description: 'Jelajahi sejarah dan spesifikasi teknologi militer dunia — tank, senjata presisi, dan kapal perang.',
};

export default async function HomePage() {
  const allSections = await fetchLandingPageSections();
  
  const heroData = allSections.find(s => s.id === 'home_hero');
  const dossiers = allSections.filter(s => s.id !== 'home_hero');

  return (
    <>
      <Hero />

      {heroData?.content && (
        <BriefingSection content={heroData.content} />
      )}
      
      <AnimatedHome sections={dossiers} />
    </>
  );
}
