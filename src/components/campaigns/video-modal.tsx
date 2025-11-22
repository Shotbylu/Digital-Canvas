'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Campaign } from '@/lib/campaigns';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  campaign: Campaign | null;
  initialAssetIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ campaign, initialAssetIndex, isOpen, onClose }: VideoModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialAssetIndex);

  useEffect(() => {
    setActiveIndex(initialAssetIndex);
  }, [initialAssetIndex, campaign]);

  const activeAsset = useMemo(() => campaign?.assets[activeIndex], [campaign, activeIndex]);

  const handlePrev = () => {
    if (!campaign) return;
    setActiveIndex((prev) => (prev - 1 + campaign.assets.length) % campaign.assets.length);
  };

  const handleNext = () => {
    if (!campaign) return;
    setActiveIndex((prev) => (prev + 1) % campaign.assets.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="max-w-6xl gap-6 overflow-hidden p-0">
        {campaign && activeAsset && (
          <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
            <div className="relative bg-black">
              {activeAsset.type === 'image' ? (
                <Image
                  src={activeAsset.src}
                  alt={activeAsset.alt}
                  width={activeAsset.width}
                  height={activeAsset.height}
                  className="h-full w-full object-contain bg-black"
                />
              ) : (
                <video
                  key={activeAsset.src}
                  poster={activeAsset.poster}
                  controls
                  className="h-full w-full bg-black"
                >
                  <source src={activeAsset.src} />
                </video>
              )}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                <Button variant="secondary" size="icon" onClick={handlePrev}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  {campaign.channels.map((channel) => (
                    <Badge key={channel} variant="secondary" className="bg-white/20 text-white">
                      {channel}
                    </Badge>
                  ))}
                </div>
                <Button variant="secondary" size="icon" onClick={handleNext}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-6">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-2xl font-semibold">{campaign.title}</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  {campaign.summary}
                </DialogDescription>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="border-gray-200 text-gray-700">
                    {campaign.role}
                  </Badge>
                  <Badge variant="outline" className="border-gray-200 text-gray-700">
                    {campaign.employer}
                  </Badge>
                  <Badge variant="outline" className="border-gray-200 text-gray-700">
                    {campaign.period}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Responsibilities</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                  {campaign.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">KPIs</h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  {campaign.kpis.map((kpi) => (
                    <div key={kpi.label} className="rounded-md border border-gray-200 bg-gray-50 p-3">
                      <p className="text-xs text-muted-foreground">{kpi.label}</p>
                      <p className="text-lg font-semibold text-foreground">{kpi.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Tech & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {campaign.tech.map((item) => (
                    <Badge key={item} variant="outline" className="border-gray-200 text-gray-700">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {(campaign.highlights?.length || campaign.industries?.length) && (
                <div className="grid gap-4 border-t border-gray-100 pt-4">
                  {campaign.highlights?.length ? (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Highlights</h4>
                      <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                        {campaign.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {campaign.industries?.length ? (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Industries</h4>
                      <div className="flex flex-wrap gap-2">
                        {campaign.industries.map((industry) => (
                          <Badge key={industry} variant="secondary" className="bg-gray-100 text-gray-800">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Assets</h4>
                <ScrollArea className="h-36 rounded-md border border-gray-200">
                  <div className="flex gap-3 p-3">
                    {campaign.assets.map((asset, index) => (
                      <button
                        key={asset.src}
                        onClick={() => setActiveIndex(index)}
                        className={`relative h-24 w-20 overflow-hidden rounded-md border transition ${
                          index === activeIndex
                            ? 'border-primary ring-2 ring-primary/50'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        {asset.type === 'image' ? (
                          <Image
                            src={asset.src}
                            alt={asset.alt}
                            width={asset.width}
                            height={asset.height}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <video
                            poster={asset.poster}
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                          >
                            <source src={asset.src} />
                          </video>
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="flex items-center justify-end gap-3">
                {campaign.caseStudyUrl && (
                  <Button asChild variant="outline">
                    <a href={campaign.caseStudyUrl} target="_blank" rel="noreferrer">
                      Download Case Study
                    </a>
                  </Button>
                )}
                {campaign.externalUrl && (
                  <Button asChild>
                    <a href={campaign.externalUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> View Live
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
