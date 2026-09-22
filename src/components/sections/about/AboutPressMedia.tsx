import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Compass } from 'lucide-react';
import { COMPANY } from '@/src/data/company';

type PerspectiveItem = {
  id: string;
  theme: string;
  headline: string;
  period: string;
  image: string;
  href: string;
  external?: boolean;
  cta: string;
};

/**
 * Editorial themes only — not claimed third-party press coverage.
 * Replace with verified article URLs when a media kit / clip list exists.
 */
const PERSPECTIVES: PerspectiveItem[] = [
  {
    id: 'theme-1',
    theme: 'Allocation',
    headline:
      'How family offices and private clients are reshaping institutional-style allocations in India.',
    period: 'Ongoing theme',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85',
    href: '/insights',
    cta: 'Explore insights',
  },
  {
    id: 'theme-2',
    theme: 'Macro',
    headline:
      'Monetary policy, yield moves, and what they imply for portfolio hedges across market cycles.',
    period: 'Research focus',
    image:
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1000&q=85',
    href: '/approach',
    cta: 'See our approach',
  },
  {
    id: 'theme-3',
    theme: 'Private markets',
    headline:
      'Private credit, structured debt, and succession planning for multi-generational wealth.',
    period: 'Advisory lens',
    image:
      'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1000&q=85',
    href: '/solutions',
    cta: 'View solutions',
  },
];

export function AboutPressMedia() {
  return (
    <section
      id="press-media"
      className="relative w-full bg-black py-24 text-white lg:py-32"
      aria-labelledby="perspectives-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-12 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-3 block font-mono text-xs uppercase tracking-[0.25em] text-white/60">
              Perspectives
            </span>
            <h2
              id="perspectives-heading"
              className="text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl"
            >
              Themes we watch with clients
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-white/80"
          >
            <a
              href={COMPANY.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <span>Company updates</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <span className="text-white/20" aria-hidden>
              |
            </span>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-1.5 text-white/50 transition-colors hover:text-white"
            >
              <span>Media enquiries</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-3">
          {PERSPECTIVES.map((item, index) => {
            const cardClassName =
              'group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40';

            const body = (
              <>
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center grayscale-[30%] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/90 backdrop-blur-md">
                    {item.theme}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="mb-3 flex items-center gap-2 font-mono text-xs text-white/40">
                      <Compass className="h-3.5 w-3.5 text-white/60" aria-hidden />
                      <span>{item.period}</span>
                    </div>
                    <h3 className="line-clamp-3 text-lg font-medium leading-snug tracking-tight text-white transition-colors group-hover:text-white/90 sm:text-xl">
                      {item.headline}
                    </h3>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-wider text-white/50 transition-colors group-hover:text-white">
                    <span>{item.cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </>
            );

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                  >
                    {body}
                  </a>
                ) : (
                  <Link to={item.href} className={cardClassName}>
                    {body}
                  </Link>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
