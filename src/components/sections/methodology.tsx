'use client';

import { useState } from 'react';
import { services } from '@/lib/data';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { MethodologyModal } from '@/components/ui/methodology-modal';
import type { MethodologyKey } from '@/lib/methodology-details';
import { bodyText, paddingX, paddingY, sectionHeadText } from '@/lib/responsive';

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  number,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  number: string;
  onClick: () => void;
}) => (
  <div
    className="bg-white p-8 border border-gray-100 rounded-sm hover:shadow-md transition-shadow flex flex-col h-full group cursor-pointer"
    onClick={onClick}
  >
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-gray-50 rounded-sm group-hover:bg-primary/10 transition-colors">
        <Icon size={24} className="text-black group-hover:text-primary transition-colors" />
      </div>
      <span className="text-xs font-bold text-gray-300 font-mono">
        0{number}
      </span>
    </div>

    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm flex-grow">{description}</p>

    <div className="mt-6 pt-6 border-t border-gray-50 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
      Learn more <ArrowRight size={16} className="ml-2" />
    </div>
  </div>
);

export function Methodology() {
  const [selectedMethodology, setSelectedMethodology] = useState<MethodologyKey | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (title: string) => {
    setSelectedMethodology(title as MethodologyKey);
    setIsModalOpen(true);
  };

  return (
    <section id="expertise" className={`bg-gray-50 ${paddingY}`}>
      <div className={`mx-auto max-w-6xl ${paddingX}`}>
        <div className="mb-14 text-center space-y-4">
          <h2 className={`${sectionHeadText} text-gray-900`}>My Methodology</h2>
          <p className={`${bodyText} text-gray-600 max-w-2xl mx-auto`}>
            Combining strategy, content, and code to deliver full-funnel performance with smooth transitions across every touchpoint.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.number}
              {...service}
              onClick={() => handleCardClick(service.title)}
            />
          ))}
        </div>
      </div>

      <MethodologyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        methodologyKey={selectedMethodology}
      />
    </section>
  );
}
