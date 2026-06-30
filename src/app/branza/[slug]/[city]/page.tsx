import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageShell from '@/components/pages/PageShell';
import { contactHref } from '@/lib/contact';
import { getIndustryCityLanding } from '@/lib/leadsSeo';
import { pageMetadata } from '@/lib/seo';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';

type Props = { params: Promise<{ slug: string; city: string }> };

export const dynamic = 'force-dynamic';

function formatNumber(value: number) {
  return new Intl.NumberFormat('pl-PL').format(value);
}

export async function generateMetadata({ params }: Props) {
  const { slug, city } = await params;
  const landing = await getIndustryCityLanding(slug, city);
  if (!landing) return {};

  return pageMetadata({
    title: `${landing.industryName} — ${landing.cityName} | baza firm`,
    description: `Przeglądaj firmy: ${landing.industryName} w lokalizacji ${landing.cityName}. Darmowa baza online i zgłaszanie brakujących danych.`,
    path: `/branza/${slug}/${city}`,
  });
}

export default async function IndustryCityLandingPage({ params }: Props) {
  const { slug, city } = await params;
  const landing = await getIndustryCityLanding(slug, city);
  if (!landing) notFound();

  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container">
          <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
            Branża i miasto
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black tracking-[-.06em] md:text-7xl">
            {landing.industryName} — {landing.cityName}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">
            Zobacz firmy z tej branży w wybranym mieście. Możesz przejść do całej branży, sprawdzić lokalizację albo
            zgłosić brakujące dane, jeśli zakres jest jeszcze zbyt wąski.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/branza/${landing.industrySlug}`} className={getButtonClass({ tone: 'secondary' })}>
              Zobacz całą branżę
            </Link>
            <Link href={`/miasto/${landing.citySlug}`} className={getButtonClass({ tone: 'secondary' })}>
              Zobacz całe miasto
            </Link>
            <Link href={contactHref({ source: `${landing.industryName} ${landing.cityName}`, topic: 'brakujące dane' })} className={getButtonClass({ tone: 'primary' })}>
              Zgłoś brakujące dane
            </Link>
          </div>
        </div>
      </section>

      <section className="section brand-section-soft">
        <div className="container">
          <div className={`${radiusClass()} border border-[var(--brand-line)] bg-[var(--brand-surface)]/75 p-6 md:p-8`}>
            <h2 className="text-3xl font-black tracking-[-.04em]">Podsumowanie</h2>
            <p className="mt-5 leading-8 text-[var(--brand-muted)]">
              W tej kombinacji znajduje się obecnie <strong className="text-white">{formatNumber(landing.count)}</strong> rekordów.
              Lista rozwija się razem z bazą, więc nowe firmy z tej branży i lokalizacji będą widoczne w tym widoku.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {landing.samples.map((lead, index) => (
              <div key={index} className={`${radiusClass()} border border-[var(--brand-line)] bg-[var(--brand-surface)]/75 p-5`}>
                <h3 className="text-xl font-black">{String(lead.name || lead.company_name || 'Firma')}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">{String(lead.address || 'Adres dostępny w bazie')}</p>
                {lead.website ? <Link href={String(lead.website).startsWith('http') ? String(lead.website) : `https://${lead.website}`} target="_blank" className="mt-4 inline-flex text-sm font-black text-[var(--brand-primary-soft)]">otwórz WWW</Link> : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
