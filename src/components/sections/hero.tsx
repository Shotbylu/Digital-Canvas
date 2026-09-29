import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const profilePic = PlaceHolderImages.find((p) => p.id === 'profile-pic')!;

  return (
    <section id="top" className="portfolio-hero">
      <div className="portfolio-hero__inner">
        <div className="portfolio-hero__copy">
          <div className="eyebrow"><span className="eyebrow__dot" /> Johannesburg, South Africa <span className="eyebrow__divider">/</span> Digital marketing</div>
          <h1>Good ideas deserve <span>to grow.</span></h1>
          <p className="portfolio-hero__intro">I&apos;m Lungelo Sibisi—a digital marketing specialist turning thoughtful strategy, sharp creative and performance data into work that moves businesses forward.</p>
          <div className="portfolio-hero__actions">
            <a className="button-dark" href="#work">Explore my work <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#background">More about me <ArrowDown size={15} /></a>
          </div>
          <div className="portfolio-hero__note"><span>Currently</span> Building full-funnel growth across automotive, energy &amp; mining</div>
        </div>
        <div className="portfolio-hero__visual">
          <div className="portfolio-hero__image">
            <Image src={profilePic.imageUrl} alt="Lungelo Sibisi" fill priority sizes="(max-width: 800px) 80vw, 38vw" className="object-contain" data-ai-hint={profilePic.imageHint} />
          </div>
        </div>
      </div>
      <div className="portfolio-hero__bottom"><span>Independent thinking. Measurable momentum.</span><a href="#work">Scroll to explore <ArrowDown size={14} /></a></div>
    </section>
  );
}
