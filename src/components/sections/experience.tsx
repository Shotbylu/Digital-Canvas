import {
  education,
  experiences,
  timelineIcons,
  certifications,
} from '@/lib/data';
import { cn } from '@/lib/utils';
import { Award } from 'lucide-react';
import { bodyText, paddingX, paddingY, sectionHeadText } from '@/lib/responsive';

export function Experience() {
  const WorkIcon = timelineIcons.work;
  const EducationIcon = timelineIcons.education;

  return (
    <section id="background" className={`bg-white border-t border-gray-100 ${paddingY}`}>
      <div className={`mx-auto max-w-5xl ${paddingX}`}>
        <div className="mb-16 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <WorkIcon className="text-primary" />
            <h2 className={`${sectionHeadText} text-gray-900`}>Professional Journey</h2>
          </div>

          <div className="space-y-8">
            {experiences.map((job, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-gray-50/60 p-6 transition-colors md:flex-row md:gap-10 md:border-0 md:bg-transparent"
              >
                <div className="text-sm font-mono text-gray-400 md:w-1/4 md:pt-1">
                  {job.date}
                </div>
                <div className="flex-1 border-l-2 border-gray-100 pl-6 md:pl-8">
                  <h3 className="text-xl font-bold text-gray-900">{job.role}</h3>
                  <p className="mb-2 text-gray-500">{job.company}</p>
                  <p className={`${bodyText} text-gray-600 leading-relaxed`}>{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <EducationIcon className="text-primary" />
            <h2 className={`${sectionHeadText} text-gray-900`}>Education</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {education.map((edu, index) => (
              <div
                key={index}
                className={cn(
                  'rounded-lg border border-gray-100 bg-gray-50 p-6 shadow-sm',
                  edu.borderColor
                )}
              >
                <div className="mb-1 text-sm font-mono text-gray-400">{edu.date}</div>
                <h3 className="text-lg font-bold text-gray-900">{edu.title}</h3>
                <p className={`${bodyText} text-gray-600`}>{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Award className="text-primary" />
            <h2 className={`${sectionHeadText} text-gray-900`}>Certifications &amp; Training</h2>
          </div>
          <div className={cn('grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3', bodyText)}>
            {certifications.map((cert, index) => (
              <div key={index} className="flex flex-col text-gray-800">
                <span className="font-bold">{cert.issuer}</span>
                <span className="text-gray-600">{cert.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
