import {
  education,
  experiences,
  timelineIcons,
} from '@/lib/data';
import { cn } from '@/lib/utils';

export function Experience() {
  const WorkIcon = timelineIcons.work;
  const EducationIcon = timelineIcons.education;

  return (
    <section id="background" className="py-24 bg-background border-t">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12">
            <WorkIcon className="text-primary" />
            <h2 className="text-3xl font-light">Professional Journey</h2>
          </div>

          <div className="space-y-8">
            {experiences.map((job, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 md:gap-10 group"
              >
                <div className="md:w-1/4 text-muted-foreground text-sm font-mono pt-1">
                  {job.date}
                </div>
                <div className="md:w-3/4 border-l-2 border-gray-100 pl-8 pb-8 group-hover:border-primary transition-colors">
                  <h3 className="text-xl font-bold">{job.role}</h3>
                  <p className="text-muted-foreground mb-2">{job.company}</p>
                  <p className="text-foreground/80 leading-relaxed text-sm">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-12">
            <EducationIcon className="text-primary" />
            <h2 className="text-3xl font-light">Education</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className={cn(
                  'bg-muted/50 p-8 rounded-sm border-l-4',
                  edu.borderColor
                )}
              >
                <div className="text-sm text-muted-foreground font-mono mb-1">
                  {edu.date}
                </div>
                <h3 className="text-lg font-bold">{edu.title}</h3>
                <p className="text-foreground/80 text-sm">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
