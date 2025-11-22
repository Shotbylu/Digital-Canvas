'use client';

import React, { useMemo, useState } from 'react';
import { projects } from '@/lib/data';
import { PortfolioItem } from '@/components/sections/portfolio-item';

export function Projects() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((project) => project.category)))],
    [],
  );

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-gradient-to-b from-[#f9fafb] to-[#ffffff] py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6 pb-12">
          <span className="inline-flex items-center rounded-full border border-[#fed7aa] bg-[#fff7ed] px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-[#c2410c]">
            Work
          </span>
          <h2 className="text-4xl font-semibold tracking-tight text-[#111827] sm:text-5xl">
            Featured Projects
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-[#4b5563] sm:text-lg">
            Browse a selection of campaigns, builds, and strategic initiatives organized by focus area. Use the filters to jump
            to the work that interests you most.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'border-black bg-black text-white shadow'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-black hover:text-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <PortfolioItem
              key={project.id}
              title={project.title}
              category={project.category}
              tech={project.tech}
              image={project.image}
              description={project.description}
              imageHint={project.imageHint}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
