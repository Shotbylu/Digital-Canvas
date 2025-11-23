import { Suspense } from 'react';
import { Header } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { PortfolioAssistant } from '@/components/ui/portfolio-assistant';
import { Projects } from '@/components/sections/projects';
import { Methodology } from '@/components/sections/methodology';
import { Experience } from '@/components/sections/experience';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="font-body text-foreground bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <PortfolioAssistant />
        <Suspense fallback={<div className="py-20 text-center">Loading Projects...</div>}>
          <Projects />
        </Suspense>
        <Methodology />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
