import Image from 'next/image';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroBg = PlaceHolderImages.find((p) => p.id === 'hero-bg')!;
  const profilePic = PlaceHolderImages.find((p) => p.id === 'profile-pic')!;

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 opacity-60">
        <Image
          src={heroBg.imageUrl}
          alt="Abstract Data"
          fill
          className="object-cover"
          priority
          data-ai-hint={heroBg.imageHint}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black z-0"></div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-16 sm:px-6 lg:px-20 lg:pt-32">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center">
          <div className="w-full lg:w-2/3 text-left">
            <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase animate-pulse">
              JHB • Digital Marketing Specialist
            </span>
            <h1 className="mt-6 mb-8 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Converting Ad spend <br />
              into{' '}
              <span className="font-light italic text-gray-300">
                revenue
              </span>
              .
            </h1>
            <p className="text-gray-400 max-w-xl text-lg mb-10 font-light leading-relaxed">
              I specialize in SEO, paid social across Meta, Google, and LinkedIn Ads.
              With experience in Automotive, Energy, and Mining, I don&apos;t just
              run ads, I engineer ROI.
            </p>

            <div className="flex w-full flex-col items-stretch space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                size="lg"
                className="w-full flex-1 bg-white text-black font-bold transition-colors hover:bg-primary"
              >
                <a href="#work">
                  View Case Studies <ArrowRight size={18} />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full flex-1 rounded-lg border-2 border-white bg-white/5 text-white font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                <a href="#">
                  <Download size={18} /> Download CV
                </a>
              </Button>
            </div>
          </div>

          <div className="relative w-full lg:w-1/3">
            <div className="mx-auto w-full max-w-sm overflow-hidden border-2 border-zinc-700 bg-zinc-800 grayscale transition-all duration-700 hover:grayscale-0 lg:ml-auto">
              <div className="aspect-[3/4] w-full">
                <Image
                  src={profilePic.imageUrl}
                  alt="Lungelo Sibisi"
                  width={800}
                  height={1067}
                  className="h-full w-full object-cover"
                  data-ai-hint={profilePic.imageHint}
                />
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 w-max -translate-x-1/2 bg-primary p-6 font-mono text-xs text-primary-foreground lg:left-auto lg:-bottom-6 lg:-left-6 lg:translate-x-0">
              <div>LUNGELO SIBISI</div>
              <div className="mt-1 font-bold">SEO, CRM-ARCHITECT</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
