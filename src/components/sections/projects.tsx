'use client';
import { useCallback, useState } from 'react';
import { CampaignCard, VideoModal } from '@/components/campaigns';
import { campaigns as campaignData, type Campaign } from '@/lib/campaigns';

export function Projects() {
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [initialAssetIndex, setInitialAssetIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCampaignModal = useCallback((campaign: Campaign, assetIndex: number) => {
    setActiveCampaign(campaign);
    setInitialAssetIndex(assetIndex);
    setIsModalOpen(true);
  }, []);

  const closeCampaignModal = useCallback(() => {
    setIsModalOpen(false);
    setActiveCampaign(null);
    setInitialAssetIndex(0);
  }, []);

  return (
    <section id="work" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              Case Studies
            </span>
            <h2 className="text-4xl md:text-5xl font-light mt-4 text-black">
              Campaign Impact
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              Explore recent work across paid media, CRM, web and integrated communications. Each case study opens directly to
              campaign storytelling, assets, KPIs, and links without extra filtering.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {campaignData.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} onOpen={openCampaignModal} />
          ))}
        </div>
      </div>

      <VideoModal
        campaign={activeCampaign}
        initialAssetIndex={initialAssetIndex}
        isOpen={isModalOpen}
        onClose={closeCampaignModal}
      />
    </section>
  );
}
