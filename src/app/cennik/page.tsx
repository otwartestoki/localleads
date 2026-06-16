import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageShell from '@/components/pages/PageShell';
import { pages } from '@/config/pages';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';
import { contactHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';

const freePaidCards = [
  {
    title: 'Darmowe korzystanie',
    description: 'Przeglądanie bazy na stronie, wyszukiwanie po danych i sprawdzanie dostępnych firm bez rejestracji.',
  },
  {
    title: 'Płatny tylko eksport CSV',
    description: 'Płacisz dopiero wtedy, gdy chcesz dostać wybrany zakres danych w pliku CSV do pracy poza stroną.',
  },
  {
    title: 'Brakujące dane',
    description: 'Jeżeli w bazie nie ma jeszcze potrzebnej branży lub miasta, możesz zapytać o przygotowanie takiego zakresu.',
  },
] as const;

const priceRows = [
  { leads: 'do 100 leadów', price: 'od 99 zł', note: 'mały eksport, test kampanii, jedna nisza' },
  { leads: 'do 250 leadów', price: 'od 199 zł', note: 'najczęstszy zakres: branża + miasto' },
  { leads: 'do 500 leadów', price: 'od 349 zł', note: 'większy eksport, kilka miast lub region' },
  { leads: '500+ leadów', price: 'wycena indywidualna', note: 'większe zakresy i niestandardowe kryteria' },
] as const;

const included = [
  'plik CSV z ustalonym zakresem danych',
  'nazwa firmy, adres, miasto i branża',
  'telefon, strona WWW i social media, jeśli są publicznie dostępne',
  'czyszczenie duplikatów i podstawowa kontrola rekordów',
  'możliwość przygotowania brakującego miasta lub branży',
] as const;

export const metadata = pageMetadata({
  title: 'Eksport CSV z bazy firm — LocalLeads',
  description: 'Baza firm LocalLeads jest darmowa na stronie. Płatny jest tylko eksport CSV albo przygotowanie eksportu dla zakresu, którego jeszcze nie ma w bazie.',
  path: '/cennik',
});

export default function PricingPage() {
  if (!pages.pricing.enabled) notFound();

  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[.9fr_.7fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
                Eksport CSV
              </p>
              <h1 className="mt-4 text-5xl font-black tracking-[-.06em] md:text-7xl">
                Dane na stronie są darmowe. Płatny jest tylko eksport CSV.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">
                LocalLeads możesz przeglądać bez kupowania paczek. Jeśli chcesz dostać dane w pliku CSV albo potrzebujesz
                konkretnego miasta, branży lub liczby leadów, której jeszcze nie ma w bazie, napisz i ustalimy zakres eksportu.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/baza-firm" className={getButtonClass({ tone: 'primary' })}>
                  Przeglądaj darmową bazę
                </Link>
                <Link href={contactHref({ source: 'eksport CSV', topic: 'wycena eksportu CSV' })} className={getButtonClass({ tone: 'secondary' })}>
                  Zapytaj o eksport CSV
                </Link>
              </div>
            </div>

            <div className={`${radiusClass()} card p-7 md:p-8`}>
              <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
                Od czego zależy cena
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.04em]">
                Liczba leadów i zakres eksportu
              </h2>
              <p className="mt-4 leading-7 text-[var(--brand-muted)]">
                Cena zależy od liczby rekordów, dostępności danych, miasta, branży i tego, czy zakres trzeba dopiero przygotować.
                Nie płacisz za samo przeglądanie bazy na stronie.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section brand-section-soft">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              Jak działa płatność
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.05em] md:text-6xl">
              Baza jest darmowa. Eksport CSV jest usługą dodatkową.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              Najpierw możesz sprawdzić dane na stronie. Dopiero jeśli chcesz pracować na pliku, zamawiasz eksport CSV dla konkretnego zakresu.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {freePaidCards.map((item) => (
              <article key={item.title} className={`${radiusClass()} border border-[var(--brand-line)] bg-[var(--brand-surface)]/75 p-7`}>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-[var(--brand-muted)]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section brand-section-dark">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
                Co obejmuje eksport
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-.05em] md:text-6xl">
                Tylko plik CSV, bez abonamentu i ukrytych dodatków
              </h2>
              <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
                Eksport jest dodatkiem do darmowej bazy. Zamawiasz go tylko wtedy, gdy chcesz wygodnie pracować na danych poza stroną.
              </p>
            </div>
            <div className={`${radiusClass()} card p-7 md:p-8`}>
              <ul className="grid gap-3">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-bold text-white">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section brand-section-soft">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              Podstawowy cennik eksportu
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.05em] md:text-6xl">
              Cena zależy głównie od liczby leadów
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              To orientacyjny cennik dla eksportu CSV. Finalna cena zależy od dostępności danych, zakresu kolumn i ewentualnego przygotowania brakującej branży lub miasta.
            </p>
          </div>

          <div className={`${radiusClass()} overflow-hidden border border-[var(--brand-line)] bg-[var(--brand-surface)]/75`}>
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-white/[.06] text-xs uppercase tracking-[.14em] text-[var(--brand-primary-soft)]">
                <tr>
                  <th className="px-5 py-4 font-black">Liczba leadów</th>
                  <th className="px-5 py-4 font-black">Cena</th>
                  <th className="px-5 py-4 font-black">Dla kogo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {priceRows.map((row) => (
                  <tr key={row.leads} className="align-top">
                    <td className="px-5 py-5 font-black text-white">{row.leads}</td>
                    <td className="px-5 py-5 text-2xl font-black text-[var(--brand-primary-soft)]">{row.price}</td>
                    <td className="px-5 py-5 text-[var(--brand-muted)]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section brand-section-soft">
        <div className="container">
          <div className={`${radiusClass()} card flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between md:p-9`}>
            <div>
              <h2 className="text-3xl font-black tracking-[-.04em]">
                Potrzebujesz CSV z konkretnym zakresem?
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[var(--brand-muted)]">
                Napisz, jaka branża, miasto i orientacyjna liczba leadów Cię interesują. Przygotuję prostą wycenę eksportu.
              </p>
            </div>
            <Link href={contactHref({ source: 'eksport CSV - CTA', topic: 'wycena eksportu CSV' })} className={getButtonClass({ tone: 'primary' })}>
              Skontaktuj się
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
