'use client';

import React, { useCallback, useMemo, useState } from 'react';
import campaignsData, { Campaign } from '@/lib/campaigns';
import { CampaignCard, VideoModal } from '@/components/campaigns';

export function Projects() {
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [initialAssetIndex, setInitialAssetIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allCampaigns = useMemo(() => campaignsData, []);

  const openCampaignModal = useCallback((campaign: Campaign, assetIndex: number) => {
    setActiveCampaign(campaign);
    setInitialAssetIndex(assetIndex);
    setIsModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    setActiveCampaign(null);
    setInitialAssetIndex(0);
  }, []);

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-gradient-to-b from-[#f9fafb] to-[#ffffff] py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6 pb-12">
          <span className="inline-flex items-center rounded-full border border-[#fed7aa] bg-[#fff7ed] px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-[#c2410c]">
            Case Studies
          </span>
          <h2 className="text-4xl font-semibold tracking-tight text-[#111827] sm:text-5xl">
            Integrated Campaign Portfolio
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-[#4b5563] sm:text-lg">
            A curated selection of high-impact campaigns, showcasing strategic thinking and measurable results across various clients and channels. Click to view the full case study.
          </p>
        </div>

        <div className="mt-14">
          {allCampaigns.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} onOpen={openCampaignModal} />
              ))}
            </div>
          )}
        </div>
      </div>

      <VideoModal
        campaign={activeCampaign}
        initialAssetIndex={initialAssetIndex}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </section>
  );
}
