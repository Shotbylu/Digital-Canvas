'use client';
import { useCallback, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
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
    <section id="work" className="work-section">
      <div className="section-shell">
        <div className="section-heading">
          <div><span className="eyebrow">Selected work <span className="eyebrow__divider">/</span> 2022—2025</span><h2>Ideas in motion.</h2></div>
          <p>A selection of campaigns and stories built to connect with people—and make a measurable difference.</p>
        </div>
        <div className="work-grid">
          {campaignData.map((campaign, index) => (
            <div className={index === 0 ? 'work-card work-card--featured' : 'work-card'} key={campaign.id}>
              <CampaignCard campaign={campaign} onOpen={openCampaignModal} />
            </div>
          ))}
        </div>
        <a className="work-footnote" href="#contact">Have a project in mind? Let&apos;s make it count <ArrowUpRight size={16} /></a>
      </div>
      <VideoModal campaign={activeCampaign} initialAssetIndex={initialAssetIndex} isOpen={isModalOpen} onClose={closeCampaignModal} />
    </section>
  );
}
