'use client';
import { useCallback, useState } from 'react';
import { CampaignCard, VideoModal } from '@/components/campaigns';
import { campaigns as campaignData, type Campaign } from '@/lib/campaigns';
import { bodyText, paddingX, paddingY, sectionHeadText } from '@/lib/responsive';

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
    <section id="work" className={`border-t border-gray-100 bg-white ${paddingY}`}>
      <div className={`mx-auto max-w-6xl ${paddingX}`}>
        <div className="mx-auto mb-16 max-w-5xl space-y-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Case Studies</span>
          <div className="space-y-3">
            <h2 className={`${sectionHeadText} text-black`}>Campaign Impact</h2>
            <p className={`${bodyText} mx-auto max-w-3xl leading-relaxed text-muted-foreground`}>
              Explore recent work across paid media, CRM, web and integrated communications. Each case study opens directly to
              campaign storytelling, assets, KPIs, and links without extra filtering.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
