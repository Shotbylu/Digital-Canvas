'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { type Campaign } from '@/lib/campaigns';

interface VideoModalProps {
  campaign: Campaign | null;
  initialAssetIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ campaign, initialAssetIndex, isOpen, onClose }: VideoModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialAssetIndex);

  useEffect(() => {
    setActiveIndex(initialAssetIndex);
  }, [initialAssetIndex, campaign]);

  const activeAsset = useMemo(() => campaign?.assets?.[activeIndex], [campaign, activeIndex]);
  const hasMultipleAssets = (campaign?.assets?.length ?? 0) > 1;

  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${campaign.title} case study`}
        className="relative z-10 w-full max-h-[90vh] rounded-t-3xl sm:rounded-3xl bg-background overflow-y-auto p-4 sm:p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              {campaign.employer} • {campaign.period}
            </p>
            <h3 className="text-lg sm:text-xl font-semibold leading-tight text-foreground">{campaign.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-5">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-zinc-900">
            {activeAsset?.type === 'video' ? (
              <video
                key={activeAsset.src}
                controls
                playsInline
                poster={activeAsset.poster}
                className="h-full w-full object-contain bg-black"
              >
                <source src={activeAsset.src} type="video/mp4" />
              </video>
            ) : activeAsset ? (
              <Image
                src={activeAsset.src}
                alt={activeAsset.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 70vw, 560px"
                className="object-contain"
              />
            ) : null}
          </div>

          {hasMultipleAssets && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {campaign.assets.map((asset, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={asset.src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-16 w-12 overflow-hidden rounded-md border ${
                      isActive ? 'border-primary ring-2 ring-primary/40' : 'border-zinc-800'
                    }`}
                    aria-label={`View asset ${index + 1}`}
                    aria-current={isActive}
                  >
                    {asset.type === 'image' ? (
                      <Image src={asset.poster ?? asset.src} alt={asset.alt} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-[10px] text-white/70">
                        Video
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {campaign.summary && <p className="text-sm leading-relaxed text-muted-foreground">{campaign.summary}</p>}

          {campaign.responsibilities?.length ? (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Strategy</h4>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-foreground/90">
                {campaign.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {campaign.kpis?.length ? (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Outcomes</h4>
              <div className="flex flex-wrap gap-2">
                {campaign.kpis.map((kpi) => (
                  <span
                    key={kpi.label}
                    className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200"
                  >
                    {kpi.label}: {kpi.value}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {campaign.tech?.length ? (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Tools</h4>
              <div className="flex flex-wrap gap-2">
                {campaign.tech.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white border border-zinc-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
