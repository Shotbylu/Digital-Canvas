'use client';

import { cn } from '@/lib/utils';

export const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'mazda', label: 'Mazda' },
  { id: 'paid', label: 'Paid Media' },
  { id: 'seo', label: 'SEO & Web' },
  { id: 'b2b', label: 'B2B' },
  { id: 'comms', label: 'Comms' },
];

interface CampaignFiltersProps {
  activeFilter: string;
  onChange: (id: string) => void;
  filters?: { id: string; label: string }[];
}

export default function CampaignFilters({ activeFilter, onChange, filters = FILTERS }: CampaignFiltersProps) {
  return (
    <div className="relative mt-6 -mx-4 sm:mx-0">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background via-background/80 to-transparent" />

      <div className="no-scrollbar overflow-x-auto px-4">
        <div className="flex items-center gap-2 whitespace-nowrap snap-x snap-mandatory pb-1">
          {filters.map((filter) => {
            const isActive = filter.id === activeFilter;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => onChange(filter.id)}
                className={cn(
                  'snap-start rounded-full px-3 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  isActive
                    ? 'bg-primary text-black shadow-sm'
                    : 'bg-zinc-900/80 text-white border border-zinc-800 hover:border-primary/70 hover:text-primary'
                )}
                aria-pressed={isActive}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
