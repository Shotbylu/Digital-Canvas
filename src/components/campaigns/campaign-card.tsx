'use client';

import Image from 'next/image';
import { Campaign } from '@/lib/campaigns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  onOpen: (campaign: Campaign, assetIndex: number) => void;
}

export function CampaignCard({ campaign, onOpen }: CampaignCardProps) {
  const preview = campaign.assets[0];

  return (
    <Card className="group h-full overflow-hidden border-gray-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        {preview.type === 'image' ? (
          <Image
            src={preview.src}
            alt={preview.alt}
            width={preview.width}
            height={preview.height}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <video
            poster={preview.poster}
            className="h-full w-full object-cover"
            muted
            playsInline
            loop
            autoPlay
          >
            <source src={preview.src} />
          </video>
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
            View Gallery
          </Button>
          {campaign.externalUrl && (
            <Button asChild variant="outline">
              <a href={campaign.externalUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
