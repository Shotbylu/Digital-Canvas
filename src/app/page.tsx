import { Header } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { Projects } from '@/components/sections/projects';
import { Methodology } from '@/components/sections/methodology';
import { Skills } from '@/components/sections/skills';
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
        <Projects />
        <Methodology />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
