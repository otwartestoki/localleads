import Link from 'next/link';

import PageShell from '@/components/pages/PageShell';
import { site } from '@/config/site';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';
import { contactHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';

const useCases = [
  {
    title: 'Branża + miasto',
    text: 'Najprostszy wariant: np. barberzy Warszawa, dentyści Kraków albo salony kosmetyczne Łódź.',
  },
  {
    title: 'Branża + region',
    text: 'Paczka dla większego obszaru: kilka miast, województwo albo wybrany region Polski.',
  },
  {
    title: 'Stała dostawa leadów',
    text: 'Abonament dla firm, które co miesiąc potrzebują nowych rekordów do prospectingu.',
  },
] as const;

const fields = [
  'nazwa firmy',
  'branża / kategoria',
  'adres lub miasto',
  'telefon',
  'strona WWW',
  'Facebook, jeśli dostępny',
  'Instagram, jeśli dostępny',
  'plik CSV gotowy do filtrowania',
] as const;

const steps = [
  'Podajesz branżę i lokalizację.',
  'Sprawdzam realną dostępność firm w danym obszarze.',
  'Przygotowuję i porządkuję bazę w CSV.',
  'Otrzymujesz plik gotowy do pracy sprzedażowej.',
] as const;

export const metadata = pageMetadata({
  title: 'Oferta baz leadów B2B CSV',
  description: 'Oferta LocalLeads: bazy leadów firmowych według branży i lokalizacji, jednorazowo lub w abonamencie.',
  path: '/oferta',
});

export default function OfferPage() {
  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              Oferta LocalLeads
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-[-.06em] md:text-7xl">
              Bazy leadów według branży i lokalizacji
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">
              Nie sprzedajemy przypadkowych rekordów. Przygotowujemy paczki firm
              pod konkretny cel: branżę, miasto, region albo stały dopływ nowych kontaktów.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={contactHref({ source: 'strona oferta', topic: 'próbka CSV' })} className={getButtonClass({ tone: 'primary' })}>
                Zamów próbkę CSV
              </Link>
              <Link href="/cennik" className={getButtonClass({ tone: 'secondary' })}>
                Zobacz cennik
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map((item) => (
              <article key={item.title} className={`${radiusClass()} card p-7`}>
                <h2 className="text-2xl font-black">{item.title}</h2>
                <p className="mt-4 leading-7 text-[var(--brand-muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section brand-section-soft">
        <div className="container grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              Produkt
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-6xl">
              Jeden standard danych
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              Standardowe leady bez social mediów są zbyt słabym produktem. Dlatego
              w głównej ofercie każdy pakiet zawiera dane kontaktowe oraz profile
              social media, jeśli są publicznie dostępne.
            </p>
          </div>

          <div className={`${radiusClass()} card p-7 md:p-9`}>
            <h3 className="text-2xl font-black">Co zawiera rekord?</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field} className="rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm font-bold">
                  ✓ {field}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section brand-section-dark">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              Jak to działa
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.05em] md:text-6xl">
              Od pomysłu do gotowego CSV
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step} className={`${radiusClass()} border border-[var(--brand-line)] bg-[var(--brand-surface)]/70 p-6`}>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-primary)] text-sm font-black text-[var(--brand-on-primary)]">
                  {index + 1}
                </div>
                <p className="font-bold leading-7">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section brand-section-soft">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className={`${radiusClass()} card p-7 md:p-9`}>
              <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
                Zakup jednorazowy
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.04em]">
                Paczka do jednej kampanii
              </h2>
              <p className="mt-4 leading-7 text-[var(--brand-muted)]">
                Wybierasz liczbę firm: do 100, do 250 albo do 500. To dobre rozwiązanie,
                gdy chcesz sprawdzić konkretną niszę lub przygotować jedną akcję sprzedażową.
              </p>
              <Link href="/cennik" className={getButtonClass({ tone: 'secondary', className: 'mt-7' })}>
                Zobacz ceny jednorazowe
              </Link>
            </article>

            <article className={`${radiusClass()} border border-[var(--brand-primary)]/35 bg-[var(--brand-primary)]/10 p-7 md:p-9`}>
              <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
                Abonament
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.04em]">
                Stały dopływ nowych firm
              </h2>
              <p className="mt-4 leading-7 text-[var(--brand-muted)]">
                W abonamencie otrzymujesz regularne paczki nowych rekordów. Cena za lead
                jest niższa, bo współpraca jest powtarzalna i łatwiejsza do zaplanowania.
              </p>
              <Link href="/cennik" className={getButtonClass({ tone: 'primary', className: 'mt-7' })}>
                Zobacz abonament
              </Link>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
