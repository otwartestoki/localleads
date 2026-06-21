import PageShell from '@/components/pages/PageShell';
import { pages } from '@/config/pages';
import { site } from '@/config/site';
import { radiusClass } from '@/lib/style';
import { pageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

export const metadata = pageMetadata({
  title: 'FAQ — darmowa baza firm',
  description: 'Najczęstsze pytania o LocalLeads: darmowa baza firm, wyszukiwanie danych, brakujące branże i miasta oraz zgłaszanie błędów.',
  path: '/faq',
});

export default function FAQPage() {
  if (!pages.faq.enabled) notFound();

  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container">
          <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
            LocalLeads
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-[-.06em]">{pages.faq.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 opacity-75">{pages.faq.subtitle}</p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {site.faq.map(([question, answer]) => (
              <details key={question} className={`${radiusClass()} card p-6`}>
                <summary className="cursor-pointer font-black">{question}</summary>
                <p className="mt-3 leading-7 opacity-70">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
