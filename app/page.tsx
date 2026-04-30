import { Metadata } from 'next';
import { fetchLandingPageSections, fetchFeaturedUnits } from '@/lib/data';
import Hero from '@/components/Hero';
import AnimatedHome from '@/components/AnimatedHome';
import Section, { SectionHeader } from '@/components/Section';
import UnitCard from '@/components/UnitCard';

export const metadata: Metadata = {
  title: 'WarTech Archive — Military Technology, History & Specifications',
  description: 'Jelajahi sejarah dan spesifikasi teknologi militer dunia — tank, senjata presisi, dan kapal perang.',
};

export default async function HomePage() {
  const allSections = await fetchLandingPageSections();
  
  const heroData = allSections.find(s => s.id === 'home_hero') || {
    title: 'WarTech Archive',
    subtitle: 'Exploring Military Technology, History, and Specifications'
  };

  const dossiers = allSections.filter(s => s.id !== 'home_hero');
  const featuredUnits = await fetchFeaturedUnits();

  return (
    <>
      <Hero 
        title={heroData.title} 
        subtitle={heroData.subtitle} 
        description={heroData.content}
      />
      
      {featuredUnits.length > 0 && (
        <Section className="py-20 relative z-20">
          <SectionHeader 
            title="Featured Archive" 
            subtitle="Unit terpilih dengan sejarah dan spesifikasi paling berpengaruh."
            emoji="⭐"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {featuredUnits.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        </Section>
      )}

      <AnimatedHome sections={dossiers} />
    </>
  );
}
