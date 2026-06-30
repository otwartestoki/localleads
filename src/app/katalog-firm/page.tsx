import Link from 'next/link';

import LocalBusinessFinder from '@/components/LocalBusinessFinder';
import PageShell from '@/components/pages/PageShell';
import { pageMetadata } from '@/lib/seo';
import { getButtonClass } from '@/lib/uiStyles';

export const dynamic = 'force-dynamic';

export const metadata = pageMetadata({
  title: 'Katalog firm lokalnych — LocalLeads',
  description: 'Znajdź lokalne firmy najbliżej siebie. Filtruj po branży, dystansie, ocenie i liczbie opinii.',
  path: '/katalog-firm',
});

export default function LocalBusinessCatalogPage() {
  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              Katalog lokalny
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-[-.06em] md:text-7xl">
              Znajdź firmy najbliżej siebie
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">
              Widok B2C oparty na lokalizacji, dystansie, ocenach i liczbie opinii. Użyj swojej lokalizacji albo punktu startowego, wybierz promień i porównaj firmy na mapie.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#finder" className={getButtonClass({ tone: 'primary' })}>
                Otwórz finder
              </Link>
              <Link href="/baza-firm" className={getButtonClass({ tone: 'secondary' })}>
                Wersja B2B
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="finder" className="section brand-section-soft">
        <div className="container">
          <LocalBusinessFinder />
        </div>
      </section>
    </PageShell>
  );
}
