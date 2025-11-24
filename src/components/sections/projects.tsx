'use client';

import { useMemo, useState } from 'react';
import { CampaignCard, CampaignFilters } from '@/components/campaigns';
import { campaigns as campaignData } from '@/lib/campaigns';
import { FILTERS } from '@/components/campaigns/CampaignFilters';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredCampaigns = useMemo(() => {
    return campaignData.filter((campaign) => {
      switch (activeFilter) {
        case 'mazda':
          return campaign.employer === 'Mazda Southern Africa';
        case 'b2b':
          return campaign.employer === 'Initium Venture Solutions';
        case 'seo':
          return campaign.channels.includes('Web') || campaign.channels.includes('Digital Platforms');
        case 'paid':
          return campaign.channels.some((channel) => ['Meta', 'Google', 'YouTube', 'TikTok', 'Programmatic'].includes(channel));
        case 'comms':
          return campaign.channels.some((channel) =>
            ['Internal Comms', 'Media Relations', 'Stakeholder Engagement', 'Public Relations'].includes(channel)
          );
        default:
          return true;
      }
    });
  }, [activeFilter]);

  return (
    <section
      id="projects"
      className="scroll-mt-24 px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      aria-labelledby="campaigns-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Case Studies</span>
          <div className="space-y-2">
            <h2 id="campaigns-heading" className="text-3xl font-semibold leading-tight sm:text-4xl">
              Campaign Impact
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Mobile-first case studies spanning paid media, CRM, web, and communications. Tap a card to explore a focused 9:16
              view with KPIs and outcomes.
            </p>
          </div>
        </div>

        <CampaignFilters activeFilter={activeFilter} onChange={setActiveFilter} filters={FILTERS} />

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
}
