'use client';
import { useState } from 'react';
import { projects } from '@/lib/data';
import { PortfolioItem } from './portfolio-item';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(
          (p) =>
            p.category === activeFilter ||
            (activeFilter === 'Marketing' && p.category === 'Strategy')
        );

  const filters = ['All', 'Marketing', 'Data Science', 'Development'];

  return (
    <section id="work" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-light mt-4 text-foreground">
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
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProjects.map((project) => (
            <PortfolioItem key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
