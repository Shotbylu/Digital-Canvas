'use client';

import type { KeyboardEvent } from 'react';
import Image from 'next/image';
import { Campaign } from '@/lib/campaigns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Play } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  onOpen: (campaign: Campaign, assetIndex: number) => void;
}

export function CampaignCard({ campaign, onOpen }: CampaignCardProps) {
  const preview = campaign.assets[0];
  const previewSrc = preview.type === 'video' && preview.poster ? preview.poster : preview.src;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(campaign, 0);
    }
  };

  return (
    <Card className="group h-full overflow-hidden border-gray-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-within:ring-2 focus-within:ring-primary/50">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={() => onOpen(campaign, 0)}
        className="relative aspect-[4/5] w-full overflow-hidden bg-muted outline-none"
        aria-label={`Open case study for ${campaign.title}`}
      >
        <Image
          src={previewSrc}
          alt={preview.alt}
          width={preview.width}
          height={preview.height}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          priority={false}
        />
        {preview.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/10 via-black/20 to-black/40">
            <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition group-hover:bg-white">
              <Play className="h-4 w-4" />
              Play preview
            </span>
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {campaign.channels.map((channel) => (
            <Badge key={channel} variant="secondary" className="bg-white/90 text-xs font-semibold text-gray-800">
              {channel}
            </Badge>
          ))}
        </div>
      </div>

      <CardContent className="flex h-full flex-col gap-4 p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{campaign.period}</p>
          <h3 className="text-xl font-semibold text-foreground">{campaign.title}</h3>
          <p className="text-sm text-muted-foreground">{campaign.employer}</p>
          <p className="line-clamp-3 text-sm text-gray-600">{campaign.summary}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 text-xs text-muted-foreground">
          {campaign.tech.map((item) => (
            <Badge key={item} variant="outline" className="border-gray-200 text-gray-700">
              {item}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3">
          <Button className="flex-1" onClick={() => onOpen(campaign, 0)}>
            View Case Study
          </Button>
          {campaign.externalUrl && (
            <Button asChild variant="outline">
              <a
                href={campaign.externalUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
