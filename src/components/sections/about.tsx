import { bodyText, paddingX, paddingY, sectionHeadText } from '@/lib/responsive';

const skills = [
  'Full-funnel paid media',
  'SEO & content architecture',
  'Marketing automation',
  'A/B & multivariate testing',
  'Attribution & analytics',
  'Performance storytelling',
  'Email & CRM journeys',
  'Web optimization',
];

export function About() {
  return (
    <section id="about" className={`bg-white ${paddingY}`}>
      <div className={`mx-auto max-w-6xl space-y-8 ${paddingX}`}>
        <div className="space-y-4 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About</span>
          <h2 className={`${sectionHeadText} text-gray-900`}>A marketer who ships</h2>
          <p className={`${bodyText} text-gray-600 max-w-3xl mx-auto sm:mx-0`}>I mix strategy, creative, and code to deliver measurable outcomes for brands that need momentum. From media planning to landing page builds and automation, I keep every touchpoint connected and responsive.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm transition-transform hover:-translate-y-1"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
