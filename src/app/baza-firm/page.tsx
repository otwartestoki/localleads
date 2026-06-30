import Link from 'next/link';

import PageShell from '@/components/pages/PageShell';
import LeadDatabaseTable from '@/components/LeadDatabaseTable';
import { contactHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';
import { getButtonClass } from '@/lib/uiStyles';
import { radiusClass } from '@/lib/style';

export const dynamic = 'force-dynamic';

export const metadata = pageMetadata({
  title: 'Darmowa baza firm — LocalLeads',
  description: 'Przeglądaj darmową bazę firm LocalLeads. Filtruj po branży, mieście, frazie i dostępnych kanałach kontaktu, kopiuj dane i oznaczaj rekordy do dalszej pracy.',
  path: '/baza-firm',
});

export default function BusinessDatabasePage() {
  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[.9fr_.7fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
                Darmowa baza firm
              </p>
              <h1 className="mt-4 text-5xl font-black tracking-[-.06em] md:text-7xl">
                Przeglądaj i kwalifikuj firmy za darmo
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">
                Szukaj firm do prospectingu, lokalnego SEO, sprzedaży usług i analizy rynku. Filtruj rekordy po branży,
                mieście, frazie oraz dostępnych danych kontaktowych, otwieraj WWW i social media, kopiuj dane i oznaczaj
                status pracy w tej przeglądarce.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="#tabela" className={getButtonClass({ tone: 'primary' })}>
                  Przejdź do bazy
                </Link>
                <Link href="/indeks-bazy" className={getButtonClass({ tone: 'secondary' })}>
                  Indeks bazy
                </Link>
                <Link href="/katalog-firm" className={getButtonClass({ tone: 'secondary' })}>
                  Katalog lokalny
                </Link>
                <Link href={contactHref({ source: 'baza firm', topic: 'brakująca branża lub miasto' })} className={getButtonClass({ tone: 'secondary' })}>
                  Zgłoś brakujące dane
                </Link>
              </div>
            </div>

            <div className={`${radiusClass()} border border-[var(--brand-primary)]/25 bg-[var(--brand-primary)]/8 p-7`}>
              <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
                Jak korzystać
              </p>
              <ul className="mt-5 grid gap-4 text-sm font-bold leading-6 text-white">
                <li>1. Wpisz frazę, firmę, miasto albo branżę.</li>
                <li>2. Zawęź wyniki do rekordów z WWW, telefonem, e-mailem lub social media.</li>
                <li>3. Skopiuj dane, otwórz mapę albo oznacz firmę jako do kontaktu.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="tabela" className="section brand-section-soft">
        <div className="container">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              Darmowa tabela firm
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.05em] md:text-6xl">
              Firmy dostępne w bazie
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              Poniżej wyświetlane są rekordy dostępne w bazie. Możesz je sortować, filtrować po jakości danych, kopiować
              wybrane pola i zapisywać prosty status pracy lokalnie w przeglądarce.
            </p>
          </div>

          <LeadDatabaseTable />
        </div>
      </section>
    </PageShell>
  );
}
