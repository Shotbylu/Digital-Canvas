import { Globe, Database, BarChart3 } from 'lucide-react';
import { bodyText, paddingX, paddingY, sectionHeadText } from '@/lib/responsive';

export function Stats() {
  return (
    <section className={`bg-black border-t border-zinc-800 text-white ${paddingY}`}>
      <div className={`mx-auto max-w-6xl space-y-8 ${paddingX}`}>
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <h2 className={`${sectionHeadText} text-white`}>Performance at a glance</h2>
          <p className={`${bodyText} text-gray-400 max-w-3xl mx-auto sm:mx-0`}>
            Data-led optimization across paid media, CRM, and web produces predictable results. Here are a few quick hits.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
          <div className="pt-4 sm:pt-0 sm:pr-6">
            <div className="text-4xl md:text-5xl font-bold text-primary">R350 000+</div>
            <div className="text-xs text-gray-500 uppercase mt-2 tracking-widest">Managed Ad Spend</div>
          </div>
          <div className="pt-4 sm:pt-0 sm:px-6">
            <div className="text-4xl md:text-5xl font-bold text-white">4.2:1</div>
            <div className="text-xs text-gray-500 uppercase mt-2 tracking-widest">Average ROAS</div>
          </div>
          <div className="pt-4 sm:pt-0 sm:px-6">
            <div className="text-4xl md:text-5xl font-bold text-white">R85</div>
            <div className="text-xs text-gray-500 uppercase mt-2 tracking-widest">Best CPL Achieved</div>
          </div>
          <div className="flex items-center justify-center gap-6 pt-4 sm:pt-0 sm:pl-6 text-gray-400">
            <Globe size={32} className="transition-colors hover:text-white" />
            <Database size={32} className="transition-colors hover:text-white" />
            <BarChart3 size={32} className="transition-colors hover:text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
