import { services } from '@/lib/data';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  number,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  number: string;
}) => (
  <div className="border-t border-gray-200 py-10 flex flex-col md:flex-row gap-6 md:gap-12 group hover:bg-gray-50 transition-colors px-4">
    <span className="text-xs font-bold text-gray-400 font-mono">
      0{number}
    </span>
    <div className="md:w-1/3">
      <h3 className="text-2xl font-light flex items-center gap-3">
        <Icon size={24} className="text-black" />
        {title}
      </h3>
    </div>
    <div className="md:w-1/2">
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
    <div className="md:w-1/6 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowRight className="text-black" />
    </div>
  </div>
);

export function Methodology() {
  return (
    <section id="expertise" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-light mb-4 text-center">My Methodology</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16">
          Combining strategy, content, and code to deliver full-funnel
          performance.
        </p>

        <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-sm border border-gray-100">
          {services.map((service) => (
            <ServiceCard key={service.number} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
