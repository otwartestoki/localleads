import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageShell from '@/components/pages/PageShell';
import { contactHref } from '@/lib/contact';
import { getIndustryLanding } from '@/lib/leadsSeo';
import { pageMetadata } from '@/lib/seo';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';

type Props = { params: Promise<{ slug: string }> };

export const dynamic = 'force-dynamic';

function formatNumber(value: number) {
  return new Intl.NumberFormat('pl-PL').format(value);
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const landing = await getIndustryLanding(slug);
  if (!landing) return {};

  return pageMetadata({
    title: `Baza firm: ${landing.name} — darmowe dane online`,
    description: `Przeglądaj firmy z branży ${landing.name}. Darmowa baza online, przykładowe firmy i lokalizacje. Jeśli czegoś brakuje, zgłoś to przez formularz.`,
    path: `/branza/${slug}`,
  });
}

export default async function IndustryLandingPage({ params }: Props) {
  const { slug } = await params;
  const landing = await getIndustryLanding(slug);
  if (!landing) notFound();

  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container">
          <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
            Branża w bazie
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black tracking-[-.06em] md:text-7xl">
            Baza firm: {landing.name}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">
            W LocalLeads znajdziesz firmy z tej branży dostępne do darmowego przeglądania online. Przejdź do bazy, żeby
            filtrować wyniki po mieście, kontakcie, stronie WWW i social media.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/baza-firm?category=${encodeURIComponent(landing.name)}`} className={getButtonClass({ tone: 'primary' })}>
              Zobacz w bazie
            </Link>
            <Link href="/indeks-bazy" className={getButtonClass({ tone: 'secondary' })}>
              Indeks bazy
            </Link>
            <Link href={contactHref({ source: `branza ${landing.name}`, topic: 'brakująca lokalizacja lub zakres danych' })} className={getButtonClass({ tone: 'secondary' })}>
              Zgłoś brakujące dane
            </Link>
          </div>
        </div>
      </section>

      <section className="section brand-section-soft">
        <div className="container grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className={`${radiusClass()} border border-[var(--brand-line)] bg-[var(--brand-surface)]/75 p-6 md:p-8`}>
            <h2 className="text-3xl font-black tracking-[-.04em]">Podsumowanie</h2>
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[.04] p-5">
              <div className="text-sm font-bold text-[var(--brand-muted)]">Firmy w tej branży</div>
              <div className="mt-2 text-5xl font-black text-white">{formatNumber(landing.count)}</div>
            </div>
            <p className="mt-5 leading-8 text-[var(--brand-muted)]">
              To aktualny zakres firm przypisanych do tej branży. Jeżeli brakuje lokalizacji lub typu danych, możesz
              zgłosić to przez formularz.
            </p>
          </div>

          <div className={`${radiusClass()} border border-[var(--brand-line)] bg-[var(--brand-surface)]/75 p-6 md:p-8`}>
            <h2 className="text-3xl font-black tracking-[-.04em]">Miasta w tej branży</h2>
            <p className="mt-4 leading-7 text-[var(--brand-muted)]">
              Miasta, w których są już widoczne firmy z tej branży. Rekordy bez przypisanej lokalizacji mogą być dostępne
              w głównej bazie, ale nie pojawiają się na tej liście.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {landing.cities.length ? landing.cities.map((city) => (
                <Link key={city.slug} href={`/branza/${landing.slug}/${city.slug}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm font-bold text-[var(--brand-muted)] transition hover:border-[var(--brand-primary)]/50 hover:text-white">
                  <span>{city.name}</span>
                  <span className="text-[var(--brand-primary-soft)]">{formatNumber(city.count)}</span>
                </Link>
              )) : <p className="text-sm text-[var(--brand-muted)]">Brak miast do wyświetlenia dla tej branży.</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="section brand-section-dark">
        <div className="container">
          <h2 className="text-4xl font-black tracking-[-.05em]">Przykładowe firmy</h2>
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
