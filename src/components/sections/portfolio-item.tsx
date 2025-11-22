import Image from 'next/image';

type PortfolioItemProps = {
  title: string;
  category: string;
  tech: string[];
  image: string;
  description: string;
  imageHint: string;
};

export function PortfolioItem({
  title,
  category,
  tech,
  image,
  description,
  imageHint
}: PortfolioItemProps) {
  return (
    <div className="group relative overflow-hidden cursor-pointer border border-transparent hover:border-zinc-800/10 transition-all h-full flex flex-col rounded-md">
      <div className="aspect-[16/10] w-full overflow-hidden bg-gray-200">
        <Image
          src={image}
          alt={title}
          width={800}
          height={500}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
          data-ai-hint={imageHint}
        />
      </div>
      <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-8">
        <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2">
          {category}
        </span>
        <h3 className="text-white text-2xl font-light tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-gray-300 text-xs mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex gap-2 flex-wrap">
          {tech.map((t, i) => (
            <span
              key={i}
              className="text-xs text-white border border-white/30 px-2 py-1 rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
