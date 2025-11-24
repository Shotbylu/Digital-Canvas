import Image from 'next/image';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { heroHeadText, heroSubText, paddingX, paddingY } from '@/lib/responsive';

export function Hero() {
  const heroBg = PlaceHolderImages.find((p) => p.id === 'hero-bg')!;
  const profilePic = PlaceHolderImages.find((p) => p.id === 'profile-pic')!;

  return (
    <header
      className={
        'relative overflow-hidden bg-black h-40 sm:h-60 md:h-80 lg:min-h-[80vh]'
      }
    >
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

      <div
        className={`relative z-10 mx-auto flex max-w-6xl flex-col gap-10 ${paddingX} ${paddingY} pt-24 lg:pt-32 lg:pb-20`}
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="w-full text-center lg:w-2/3 lg:text-left space-y-6">
            <span className="text-primary font-bold tracking-[0.3em] text-[11px] xs:text-xs uppercase animate-pulse">
              JHB • Digital Marketing Specialist
            </span>
            <h1 className={`${heroHeadText} text-white leading-[1.1] tracking-tight`}>
              Converting Ad spend <br />
              into{' '}
              <span className="font-light italic text-gray-300">revenue</span>.
            </h1>
            <p
              className={`${heroSubText} text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed`}
            >
              I specialize in SEO, paid social across Meta, Google, and LinkedIn Ads.
              With experience in Automotive, Energy, and Mining, I don&apos;t just run
              ads, I engineer ROI.
            </p>

            <div className="flex flex-col items-stretch gap-4 xs:flex-row xs:items-center">
              <Button
                asChild
                size="lg"
                className="w-full xs:w-auto bg-white text-black font-bold hover:bg-primary transition-colors min-h-[44px]"
              >
                <a href="#work" className="flex items-center justify-center gap-2">
                  View Case Studies <ArrowRight size={18} />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full xs:w-auto border-2 border-white text-white font-semibold bg-white/5 hover:bg-white/15 transition-colors rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm min-h-[44px]"
              >
                <a href="#" className="flex items-center justify-center gap-2">
                  <Download size={18} /> Download CV
                </a>
              </Button>
            </div>
          </div>

          <div className="relative w-full max-w-sm self-center rounded-lg bg-zinc-900/60 p-6 shadow-lg ring-1 ring-white/10 lg:w-1/3">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-md border border-white/10 bg-zinc-800 grayscale transition-all duration-700 hover:grayscale-0">
              <Image
                src={profilePic.imageUrl}
                alt="Lungelo Sibisi"
                width={800}
                height={1067}
                className="h-full w-full object-cover"
                data-ai-hint={profilePic.imageHint}
              />
            </div>
            <div className="absolute -bottom-6 left-6 bg-primary text-primary-foreground px-5 py-4 font-mono text-xs shadow-lg">
              <div>LUNGELO SIBISI</div>
              <div className="mt-1 font-bold">SEO, CRM-ARCHITECT</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
