'use client';
import { useCallback, useMemo, useState } from 'react';
import { CampaignCard, VideoModal } from '@/components/campaigns';
import { campaigns as campaignData, type Campaign } from '@/lib/campaigns';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [initialAssetIndex, setInitialAssetIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = useMemo(
    () => ['All', ...Array.from(new Set(campaignData.map((campaign) => campaign.employer)))],
    []
  );

  const filteredCampaigns = useMemo(
    () =>
      activeFilter === 'All'
        ? campaignData
        : campaignData.filter((campaign) => campaign.employer === activeFilter),
    [activeFilter]
  );

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
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-light mt-4 text-black">
              Featured Projects
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full border transition-all text-sm font-medium ${
                  activeFilter === cat
                    ? 'bg-black text-white border-black'
                    : 'border-gray-200 text-gray-500 hover:border-black hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
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
