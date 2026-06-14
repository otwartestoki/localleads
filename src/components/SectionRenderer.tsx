import { sections } from '@/config/sections';
import Hero from './sections/Hero';
import Partners from './sections/Partners';
import Stats from './sections/Stats';
import Services from './sections/Services';
import About from './sections/About';
import Process from './sections/Process';
import BeforeAfter from './sections/BeforeAfter';
import Gallery from './sections/Gallery';
import Reviews from './sections/Reviews';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Contact from './sections/Contact';
import GoogleMap from './sections/GoogleMap';
import Blog from './sections/Blog';
import Reveal from './ui/Reveal';

const map: any = {
  hero: Hero,
  partners: Partners,
  stats: Stats,
  services: Services,
  about: About,
  process: Process,
  beforeAfter: BeforeAfter,
  gallery: Gallery,
  blog: Blog,
  reviews: Reviews,
  faq: FAQ,
  cta: CTA,
  contact: Contact,
  map: GoogleMap,
};

const revealDirections = ['up', 'left', 'right', 'up', 'left', 'right'] as const;

export default function SectionRenderer() {
  const enabledSections = sections.filter((s: any) => s.enabled);
  const heroSection = enabledSections.find((s: any) => s.type === 'hero');
  const restSections = enabledSections.filter((s: any) => s.type !== 'hero');

  const HeroComponent = heroSection ? map[heroSection.type] : null;

  return (
    <>
      {HeroComponent ? <HeroComponent /> : null}

      <main className="relative z-20 overflow-hidden bg-[var(--background)] shadow-[0_-28px_90px_rgba(15,23,42,0.26)]">
        {restSections.map((s: any, index: number) => {
          const C = map[s.type];
          if (!C) return null;

          const from = revealDirections[index % revealDirections.length];

          return (
            <Reveal
              key={s.type}
              from={from}
              delay={0}
              threshold={0.06}
              className="section-slide-reveal"
            >
              <C />
            </Reveal>
          );
        })}
      </main>
    </>
  );
}
