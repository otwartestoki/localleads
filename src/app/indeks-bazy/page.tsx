import Link from 'next/link';

import PageShell from '@/components/pages/PageShell';
import { getLandingIndex } from '@/lib/leadsSeo';
import { pageMetadata } from '@/lib/seo';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';

export const dynamic = 'force-dynamic';

export const metadata = pageMetadata({
  title: 'Indeks bazy firm — LocalLeads',
  description: 'Branże i lokalizacje dostępne w darmowej bazie firm LocalLeads. Sprawdź, gdzie są już firmy i przejdź do gotowego widoku bazy.',
  path: '/indeks-bazy',
});

function formatNumber(value: number) {
  return new Intl.NumberFormat('pl-PL').format(value);
}

export default async function DatabaseIndexPage() {
  const index = await getLandingIndex();
  const topCategories = index.categories.slice(0, 80);
  const topCities = index.cities.slice(0, 80);

  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container">
          <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
            Indeks bazy
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black tracking-[-.06em] md:text-7xl">
            Branże i miasta dostępne w LocalLeads
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">
            Ta podstrona pokazuje, jakie branże i lokalizacje są obecnie dostępne w bazie. Wybierz zakres, żeby szybciej
            przejść do firm z konkretnej branży albo miasta.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/baza-firm" className={getButtonClass({ tone: 'primary' })}>
              Wróć do bazy firm
            </Link>
            <Link href="#lista" className={getButtonClass({ tone: 'secondary' })}>
              Zobacz indeks
            </Link>
          </div>
        </div>
      </section>

      <section id="lista" className="section brand-section-soft">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div className={`${radiusClass()} border border-[var(--brand-line)] bg-[var(--brand-surface)]/75 p-6 md:p-8`}>
            <h2 className="text-3xl font-black tracking-[-.04em]">Branże</h2>
            <p className="mt-4 leading-7 text-[var(--brand-muted)]">
              Największe branże dostępne w LocalLeads. Liczba obok nazwy pokazuje, ile firm z danego zakresu możesz
              sprawdzić w bazie.
            </p>
            <div className="mt-6 grid gap-2">
              {topCategories.length ? topCategories.map((item) => (
                <Link key={item.slug} href={`/branza/${item.slug}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm font-bold text-[var(--brand-muted)] transition hover:border-[var(--brand-primary)]/50 hover:text-white">
                  <span>{item.name}</span>
                  <span className="text-[var(--brand-primary-soft)]">{formatNumber(item.count)}</span>
                </Link>
              )) : <p className="mt-5 text-[var(--brand-muted)]">Brak branż do wyświetlenia.</p>}
            </div>
          </div>

          <div className={`${radiusClass()} border border-[var(--brand-line)] bg-[var(--brand-surface)]/75 p-6 md:p-8`}>
            <h2 className="text-3xl font-black tracking-[-.04em]">Miasta</h2>
            <p className="mt-4 leading-7 text-[var(--brand-muted)]">
              Lokalizacje, dla których w bazie są już przypisane firmy. Rekordy bez miasta mogą być widoczne w głównej
              bazie, ale nie pojawiają się w tym lokalnym zestawieniu.
            </p>
            <div className="mt-6 grid gap-2">
              {topCities.length ? topCities.map((item) => (
                <Link key={item.slug} href={`/miasto/${item.slug}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm font-bold text-[var(--brand-muted)] transition hover:border-[var(--brand-primary)]/50 hover:text-white">
                  <span>{item.name}</span>
                  <span className="text-[var(--brand-primary-soft)]">{formatNumber(item.count)}</span>
                </Link>
              )) : <p className="mt-5 text-[var(--brand-muted)]">Brak miast do wyświetlenia.</p>}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
