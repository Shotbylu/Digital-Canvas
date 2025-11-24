'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { type Campaign } from '@/lib/campaigns';
import VideoModal from './VideoModal';

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const heroAsset = campaign.assets?.[0];

  const handleOpen = () => {
    setActiveIndex(0);
    setIsOpen(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpen();
    }
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-900/70 backdrop-blur-sm cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="relative aspect-[9/16] w-full overflow-hidden bg-zinc-900">
          {heroAsset ? (
            <>
              <Image
                src={heroAsset.poster ?? heroAsset.src}
                alt={heroAsset.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover"
                priority={false}
              />
              {heroAsset.type === 'video' && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur">
                    Case study video
                  </span>
                </span>
              )}
              <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                {campaign.employer}
              </span>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">No media available</div>
          )}
        </div>

        <div className="flex flex-col gap-3 p-4 sm:p-5">
          <div className="space-y-1.5">
            <h3 className="text-sm sm:text-base font-semibold leading-snug line-clamp-2 text-white">
              {campaign.title}
            </h3>
            {campaign.summary ? (
              <p className="text-xs text-muted-foreground line-clamp-2">{campaign.summary}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {campaign.channels.slice(0, 3).map((channel) => (
              <span
                key={channel}
                className="rounded-full bg-zinc-800 px-2.5 py-1 text-[10px] font-semibold text-white"
              >
                {channel}
              </span>
            ))}
          </div>

          {campaign.kpis?.length ? (
            <div className="flex flex-wrap gap-2">
              {campaign.kpis.slice(0, 2).map((kpi) => (
                <span
                  key={kpi.label}
                  className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-200 border border-emerald-500/20"
                >
                  {kpi.label}: {kpi.value}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-auto flex items-center justify-between pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <span className="rounded-full bg-black/40 px-2.5 py-1 text-white/80">{campaign.role}</span>
            <span className="text-primary flex items-center gap-1">
              View case study <Play className="h-3 w-3 fill-current" />
            </span>
          </div>
        </div>
      </div>

      <VideoModal
        campaign={isOpen ? campaign : null}
        initialAssetIndex={activeIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
