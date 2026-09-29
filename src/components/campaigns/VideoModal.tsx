import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, ExternalLink } from 'lucide-react';
import type { Campaign } from '../../data/campaigns';
import { trackAnalyticsEvent } from './utils/analytics';

interface VideoModalProps {
  campaign: Campaign | null;
  initialAssetIndex: number;
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

const focusableSelectors =
  'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

const VideoModal: React.FC<VideoModalProps> = ({
  campaign,
  initialAssetIndex,
  isOpen,
  onClose,
  triggerRef
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const assetContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(initialAssetIndex);
  const [assetVisible, setAssetVisible] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Reset on open
  useEffect(() => {
    if (isOpen) setCurrentIndex(initialAssetIndex);
  }, [initialAssetIndex, isOpen]);

  // Clamp index
  useEffect(() => {
    if (!campaign) return;
    if (currentIndex >= campaign.assets.length) setCurrentIndex(0);
  }, [campaign, currentIndex]);

  // Lazy load
  useEffect(() => {
    if (!isOpen) {
      setAssetVisible(false);
      return;
    }
    setAssetVisible(false);
    setVideoError(false);

    const node = assetContainerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry?.isIntersecting && setAssetVisible(true),
      { root: null, threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isOpen, currentIndex]);

  // Initial focus
  const campaignId = campaign?.id;

  useEffect(() => {
    if (!isOpen || !campaignId) return;
    const modalNode = modalRef.current;
    if (!modalNode) return;
    const focusable = Array.from(
      modalNode.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter((el) => !el.hasAttribute('data-focus-guard'));
    focusable[0]?.focus();
  }, [campaignId, isOpen]);

  const assets = campaign?.assets ?? [];
  const assetsLength = assets.length;
  const activeAsset = assets[currentIndex];
  const isVideoPlaceholder = activeAsset?.type === 'video' && activeAsset.src.endsWith('.txt');

  const analyticsContext = useMemo(
    () => ({
      campaignId: campaign?.id,
      campaignTitle: campaign?.title,
      assetIndex: currentIndex,
      assetType: activeAsset?.type,
      assetSrc: activeAsset?.src
    }),
    [activeAsset?.src, activeAsset?.type, campaign?.id, campaign?.title, currentIndex]
  );

  const goToPrevious = useCallback(() => {
    if (!assetsLength) return;
    setCurrentIndex((prev) => (prev - 1 + assetsLength) % assetsLength);
    setVideoError(false);
  }, [assetsLength]);

  const goToNext = useCallback(() => {
    if (!assetsLength) return;
    setCurrentIndex((prev) => (prev + 1) % assetsLength);
    setVideoError(false);
  }, [assetsLength]);

  const handleClose = useCallback(() => {
    onClose();
    if (triggerRef?.current) {
      window.setTimeout(() => {
        triggerRef.current?.focus();
      }, 0);
    }
  }, [onClose, triggerRef]);

  // Keyboard support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNext();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevious();
      }
      if (event.key === 'Tab') {
        const modalNode = modalRef.current;
        if (!modalNode) return;
        const focusable = Array.from(
          modalNode.querySelectorAll<HTMLElement>(focusableSelectors)
        ).filter((el) => !el.hasAttribute('data-focus-guard'));
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, goToNext, goToPrevious, isOpen]);

  const hasMultipleAssets = assetsLength > 1;
  const techList = useMemo(() => campaign?.tech.join(', ') ?? '', [campaign]);

  return (
    <AnimatePresence>
      {isOpen && campaign && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-[rgba(23,23,21,0.58)] px-3 py-4 backdrop-blur-sm sm:px-6 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`campaign-${campaign.id}-title`}
          data-analytics="campaign-modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            ref={modalRef}
            className="relative flex w-full max-w-6xl flex-col gap-0 overflow-hidden rounded-sm border border-[#deded9] bg-[#f8f8f6] shadow-[0_28px_90px_rgba(23,23,21,0.22)] lg:max-h-[90vh] lg:flex-row"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#deded9] bg-[#f8f8f6]/95 text-[#171715] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#68a83e]"
              aria-label="Close campaign detail"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex min-w-0 flex-col gap-3 border-b border-[#deded9] p-4 sm:p-6 lg:w-1/2 lg:border-b-0 lg:border-r lg:p-8">
              <div
                ref={assetContainerRef}
                className="relative flex h-[34vh] min-h-[230px] w-full items-center justify-center overflow-hidden bg-[#ecece7] sm:h-[48vh] lg:h-[68vh] lg:max-h-[700px]"
              >
                <AnimatePresence mode="wait">
                  {activeAsset && (
                    <motion.div
                      key={`${campaign.id}-${currentIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full w-full"
                    >
                      {activeAsset.type === 'video' ? (
                        assetVisible && !videoError && !isVideoPlaceholder ? (
                          <video
                            key={activeAsset.src}
                            className="h-full w-full object-contain"
                            controls
                            autoPlay
                            muted
                            playsInline
                            preload="none"
                            poster={activeAsset.poster}
                            onError={() => setVideoError(true)}
                          >
                            <source src={activeAsset.src} type="video/mp4" />
                          </video>
                        ) : (
                          <div className="relative flex h-full w-full items-center justify-center bg-[#ecece7] text-center text-[#555550]">
                            <img
                              src={activeAsset.poster ?? activeAsset.src}
                              alt={activeAsset.alt}
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-contain opacity-40"
                            />
                            <div className="relative mx-6 border border-[#deded9] bg-[#f8f8f6]/95 px-4 py-3 text-sm shadow-sm">
                              <p className="font-medium">Video preview unavailable in this workspace.</p>
                              <p>
                                Replace the placeholder file in <code>public/assets/campaigns/{campaign.id}</code> with a
                                1080×1920 MP4 and update the dataset.
                              </p>
                            </div>
                          </div>
                        )
                      ) : (
                        <img
                          src={activeAsset.src}
                          alt={activeAsset.alt}
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {hasMultipleAssets && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
                    <button
                      type="button"
                      onClick={goToPrevious}
                      className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#deded9] bg-[#f8f8f6]/90 text-[#171715] shadow-sm transition hover:bg-white"
                      aria-label="Previous asset"
                      data-analytics="campaign-modal-previous"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur"
                      aria-label="Next asset"
                      data-analytics="campaign-modal-next"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              {hasMultipleAssets && (
                <div className="flex items-center justify-center gap-2 pb-1">
                  {assets.map((asset, index) => (
                    <button
                      key={asset.src}
                      type="button"
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1.5 w-7 rounded-full transition ${currentIndex === index ? 'bg-[#68a83e]' : 'bg-[#deded9] hover:bg-[#b6b6ae]'
                        }`}
                      aria-label={`View asset ${index + 1} of ${assets.length}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 pt-14 sm:gap-6 sm:p-7 sm:pt-14 lg:w-1/2 lg:p-9 lg:pt-14">
              <div>
                <span className="inline-flex items-center border border-[#deded9] bg-white/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#686862]">
                  {campaign.employer}
                </span>
                <h2 id={`campaign-${campaign.id}-title`} className="mt-3 max-w-xl text-3xl font-medium leading-tight tracking-[-0.045em] text-[#171715] sm:text-4xl">
                  {campaign.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-[#555550]">{campaign.role}</p>
                <p className="text-xs uppercase tracking-[0.1em] text-[#8a8a83]">{campaign.period}</p>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#777770]">Summary</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#555550]">{campaign.summary}</p>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#777770]">Responsibilities</h3>
                <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-[#555550]">
                  {campaign.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-[#68a83e]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#777770]">Channels</h3>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {campaign.channels.map((channel) => (
                    <span key={channel} className="rounded-sm border border-[#deded9] bg-white/70 px-2.5 py-1 text-[#555550]">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#777770]">Key Results</h3>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {campaign.kpis.map((kpi) => (
                    <span
                      key={kpi.label}
                      className="flex min-h-[70px] flex-col justify-between border border-[#deded9] bg-white/65 p-3"
                    >
                      <strong className="text-lg font-medium tracking-[-0.04em] text-[#171715]">{kpi.value}</strong>
                      <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-[#777770]">{kpi.label}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#777770]">Tech Stack</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#555550]">{techList}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {campaign.caseStudyUrl && (
                  <a
                    href={campaign.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm bg-[#171715] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#3a3a34] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#68a83e]"
                    data-analytics="campaign-modal-download"
                    onClick={() =>
                      trackAnalyticsEvent('campaign_modal_download_click', {
                        ...analyticsContext,
                        href: campaign.caseStudyUrl
                      })
                    }
                  >
                    <Download className="h-4 w-4" />
                    Download Case Study
                  </a>
                )}
                {campaign.externalUrl && (
                  <a
                    href={campaign.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm border border-[#b6b6ae] px-4 py-2.5 text-xs font-medium text-[#171715] transition hover:border-[#171715] hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#68a83e]"
                    data-analytics="campaign-modal-external"
                    onClick={() =>
                      trackAnalyticsEvent('campaign_modal_external_click', {
                        ...analyticsContext,
                        href: campaign.externalUrl
                      })
                    }
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Link
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
