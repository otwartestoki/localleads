import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageShell from '@/components/pages/PageShell';
import { content } from '@/config/content';
import { pages } from '@/config/pages';
import { site } from '@/config/site';
import { contactHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';

export const metadata = pageMetadata({
  title: 'O LocalLeads — darmowa baza firm i eksport CSV',
  description:
    'LocalLeads to darmowa baza firm do przeglądania online. Płatny jest tylko eksport danych do CSV lub przygotowanie indywidualnego zakresu.',
  path: '/o-mnie',
});

const ABOUT_IMAGE = '/media/about/about-person.webp';

type AboutCard = {
  title: string;
  text: string;
};

export default function AboutPage() {
  const aboutPage = pages.about as {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    intro?: string;
  };

  const aboutContent = content.about as {
    title?: string;
    text?: string;
    pageTitle?: string;
    pageLead?: string;
    paragraphs?: readonly string[];
    cards?: readonly AboutCard[];
  };

  if (aboutPage.enabled === false) notFound();

  const title = aboutContent.pageTitle || aboutPage.title || aboutContent.title || 'O LocalLeads';

  const lead =
    aboutContent.pageLead ||
    aboutPage.subtitle ||
    aboutPage.intro ||
    aboutContent.text ||
    site.description;

  const paragraphs =
    aboutContent.paragraphs && aboutContent.paragraphs.length > 0
      ? aboutContent.paragraphs
      : [aboutContent.text || lead];

  const cards = aboutContent.cards || [];

  return (
    <PageShell>
      <section className="section bg-[#06111f] text-white">
        <div className="container grid gap-8 md:grid-cols-[.72fr_1fr]">
          <div>
            <p
              className="text-sm font-black uppercase tracking-[.2em]"
              style={{ color: site.colors.primary }}
            >
              O LocalLeads
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-5xl">
              {title}
            </h1>

            <p className="mt-5 text-lg leading-8 opacity-75">{lead}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/baza-firm" className={getButtonClass({ tone: 'primary' })}>
                Przeglądaj bazę firm
              </Link>
              <Link
                href={contactHref({ source: 'podstrona O mnie', topic: 'eksport danych do CSV' })}
                className={getButtonClass({ tone: 'secondary' })}
              >
                Zapytaj o eksport CSV
              </Link>
            </div>

            <div className={`${radiusClass()} card mt-8 overflow-hidden p-3`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius)-.5rem)] bg-[var(--secondary)]">
                <Image
                  src={ABOUT_IMAGE}
                  alt={`O LocalLeads - ${site.business?.name || site.name}`}
                  fill
                  sizes="(min-width: 768px) 36vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className={`${radiusClass()} card grid gap-5 self-start p-7 md:p-9`}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 opacity-75">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {cards.length > 0 ? (
          <div className="container mt-10 grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <div key={card.title} className={`${radiusClass()} card p-6`}>
                <h2 className="text-xl font-black">{card.title}</h2>
                <p className="mt-3 leading-7 opacity-75">{card.text}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </PageShell>
  );
}
