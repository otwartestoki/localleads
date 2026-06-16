import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageShell from '@/components/pages/PageShell';
import { contactHref } from '@/lib/contact';
import { getCityLanding } from '@/lib/leadsSeo';
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
  const landing = await getCityLanding(slug);
  if (!landing) return {};

  return pageMetadata({
    title: `Baza firm: ${landing.name} — darmowe dane online`,
    description: `Przeglądaj firmy z miasta ${landing.name}. Darmowa baza online, branże, przykładowe firmy i eksport CSV na zamówienie.`,
    path: `/miasto/${slug}`,
  });
}

export default async function CityLandingPage({ params }: Props) {
  const { slug } = await params;
  const landing = await getCityLanding(slug);
  if (!landing) notFound();

  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container">
          <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
            Miasto w bazie
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black tracking-[-.06em] md:text-7xl">
            Baza firm: {landing.name}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">
            Zobacz firmy z tej lokalizacji dostępne do darmowego przeglądania online. Ta strona powstaje tylko wtedy, gdy rekordy mają uzupełnioną kolumnę <code>city</code>.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/baza-firm" className={getButtonClass({ tone: 'primary' })}>
              Przejdź do bazy
            </Link>
            <Link href="/indeks-bazy" className={getButtonClass({ tone: 'secondary' })}>
              Indeks bazy
            </Link>
            <Link href={contactHref({ source: `miasto ${landing.name}`, topic: 'eksport CSV' })} className={getButtonClass({ tone: 'secondary' })}>
              Zapytaj o CSV
            </Link>
          </div>
        </div>
      </section>

      <section className="section brand-section-soft">
        <div className="container grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className={`${radiusClass()} border border-[var(--brand-line)] bg-[var(--brand-surface)]/75 p-6 md:p-8`}>
            <h2 className="text-3xl font-black tracking-[-.04em]">Podsumowanie</h2>
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[.04] p-5">
              <div className="text-sm font-bold text-[var(--brand-muted)]">Firmy w tej lokalizacji</div>
              <div className="mt-2 text-5xl font-black text-white">{formatNumber(landing.count)}</div>
            </div>
          </div>

          <div className={`${radiusClass()} border border-[var(--brand-line)] bg-[var(--brand-surface)]/75 p-6 md:p-8`}>
            <h2 className="text-3xl font-black tracking-[-.04em]">Branże w tej lokalizacji</h2>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {landing.categories.map((category) => (
                <Link key={category.slug} href={`/branza/${category.slug}/${landing.slug}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm font-bold text-[var(--brand-muted)] transition hover:border-[var(--brand-primary)]/50 hover:text-white">
                  <span>{category.name}</span>
                  <span className="text-[var(--brand-primary-soft)]">{formatNumber(category.count)}</span>
                </Link>
              ))}
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
                <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">{String(lead.category || 'Branża dostępna w bazie')}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">{String(lead.address || 'Adres dostępny w bazie')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
