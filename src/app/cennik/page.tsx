import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageShell from '@/components/pages/PageShell';
import { pages } from '@/config/pages';
import { site } from '@/config/site';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';
import { contactHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';

const oneTimePackages = [
  {
    name: 'Start',
    limit: 'do 100 firm',
    price: '99 zł',
    description: 'Mała paczka do testu kampanii albo szybkiego sprawdzenia jednej branży w mieście.',
  },
  {
    name: 'Biznes',
    limit: 'do 250 firm',
    price: '199 zł',
    description: 'Najbardziej uniwersalny pakiet dla lokalnej kampanii sprzedażowej lub prospectingu.',
    highlighted: true,
  },
  {
    name: 'Pro',
    limit: 'do 500 firm',
    price: '349 zł',
    description: 'Większa baza dla regionu, kilku miast albo szerszej analizy wybranej branży.',
  },
] as const;

const subscriptionPackages = [
  {
    name: 'Starter',
    limit: 'do 100 nowych firm / mies.',
    price: '79 zł / mies.',
  },
  {
    name: 'Growth',
    limit: 'do 250 nowych firm / mies.',
    price: '149 zł / mies.',
    highlighted: true,
  },
  {
    name: 'Pro',
    limit: 'do 500 nowych firm / mies.',
    price: '249 zł / mies.',
  },
] as const;

const included = [
  'nazwa firmy',
  'telefon',
  'adres lub miasto',
  'strona WWW, jeśli jest publicznie dostępna',
  'Facebook, jeśli jest publicznie dostępny',
  'Instagram, jeśli jest publicznie dostępny',
  'uporządkowany plik CSV gotowy do pracy',
] as const;

export const metadata = pageMetadata({
  title: 'Cennik baz leadów B2B CSV',
  description: 'Cennik baz leadów LocalLeads: jednorazowe paczki firm oraz abonament na cykliczne dostawy nowych leadów z wybranej branży i lokalizacji.',
  path: '/cennik',
});

export default function PricingPage() {
  if (!pages.pricing.enabled) notFound();

  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              Cennik LocalLeads
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-[-.06em] md:text-7xl">
              Prosty cennik baz leadów
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">
              Wybierasz branżę i lokalizację, a my przygotowujemy paczkę firm w CSV.
              Nie rozbijamy oferty na sztuczne wersje Standard i Premium — każdy pakiet
              zawiera dane kontaktowe oraz social media, jeśli są publicznie dostępne.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[.7fr_1fr]">
            <div className={`${radiusClass()} card p-7 md:p-8`}>
              <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
                Co zawiera baza
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.04em]">
                Jeden standard jakości
              </h2>
              <p className="mt-4 leading-7 text-[var(--brand-muted)]">
                Klient kupuje możliwość szybkiego kontaktu z firmami, dlatego social media
                nie są dodatkiem premium, tylko naturalną częścią wartości bazy.
              </p>
              <ul className="mt-6 grid gap-3">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-bold text-white">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${radiusClass()} border border-[var(--brand-primary)]/25 bg-[var(--brand-primary)]/8 p-7 md:p-8`}>
              <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
                Jak zamawiasz
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.04em]">
                Paczka = branża + lokalizacja
              </h2>
              <p className="mt-4 leading-7 text-[var(--brand-muted)]">
                Przykłady: fryzjerzy Łódź, barberzy Warszawa, dentyści Kraków,
                restauracje Poznań, firmy budowlane województwo łódzkie.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={contactHref({ source: 'cennik - jak zamawiasz', topic: 'próbka bazy leadów' })} className={getButtonClass({ tone: 'primary' })}>
                  Zamów próbkę
                </Link>
                <Link href="/oferta" className={getButtonClass({ tone: 'secondary' })}>
                  Zobacz ofertę
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section brand-section-dark">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[.55fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
                Przykład produktu
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-.05em] md:text-6xl">
                Zobacz, jak wygląda baza po zakupie
              </h2>
              <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
                To nie jest dashboard ani zamknięty system. Otrzymujesz prosty plik CSV
                z firmami, telefonami, stronami WWW oraz linkami do Facebooka i Instagrama,
                który możesz od razu otworzyć w Excelu, Google Sheets albo zaimportować do CRM.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-[var(--brand-primary-soft)]">
                <span className="rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 px-4 py-2">CSV</span>
                <span className="rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 px-4 py-2">Facebook</span>
                <span className="rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 px-4 py-2">Instagram</span>
                <span className="rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 px-4 py-2">Telefon i WWW</span>
              </div>
            </div>

            <div className={`${radiusClass()} overflow-hidden border border-[var(--brand-primary)]/25 bg-[var(--brand-surface)]/70 shadow-[0_24px_90px_rgba(56,189,248,.14)]`}>
              <Image
                src="/media/localleads-csv-preview.webp"
                alt="Przykładowy fragment bazy leadów CSV LocalLeads"
                width={1800}
                height={1000}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section brand-section-soft">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              Zakup jednorazowy
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.05em] md:text-6xl">
              Paczka leadów do konkretnej kampanii
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              Dobre rozwiązanie, gdy chcesz sprawdzić jedną branżę, jedno miasto albo
              przygotować konkretną akcję sprzedażową.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {oneTimePackages.map((item: any) => (
              <article
                key={item.name}
                className={`${radiusClass()} relative border p-7 ${
                  item.highlighted
                    ? 'border-[var(--brand-primary)]/55 bg-[var(--brand-primary)]/10 shadow-[0_24px_80px_rgba(56,189,248,.16)]'
                    : 'border-[var(--brand-line)] bg-[var(--brand-surface)]/75'
                }`}
              >
                {item.highlighted ? (
                  <div className="mb-5 inline-flex rounded-full border border-[var(--brand-primary)]/45 bg-[var(--brand-primary)]/12 px-3 py-1 text-xs font-black uppercase tracking-[.16em] text-[var(--brand-primary-soft)]">
                    Najczęściej wybierany
                  </div>
                ) : null}

                <h3 className="text-3xl font-black">{item.name}</h3>
                <p className="mt-2 text-sm font-black uppercase tracking-[.16em] text-[var(--brand-muted)]">
                  {item.limit}
                </p>
                <p className="mt-5 text-4xl font-black text-[var(--brand-primary-soft)]">
                  {item.price}
                </p>
                <p className="mt-5 leading-7 text-[var(--brand-muted)]">
                  {item.description}
                </p>
                <Link href={contactHref({ source: 'cennik - pakiet jednorazowy', packageName: item.name, topic: 'jednorazowa paczka leadów' })} className={getButtonClass({ tone: item.highlighted ? 'primary' : 'secondary', className: 'mt-7 w-full' })}>
                  Zamów pakiet
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section brand-section-dark">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              Abonament
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.05em] md:text-6xl">
              Niższa cena za lead przy stałej współpracy
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              Abonament ma sens, jeśli co miesiąc potrzebujesz świeżej bazy firm
              z wybranej branży, miasta lub regionu. To właściwie ten sam produkt,
              ale w niższej cenie za rekord.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {subscriptionPackages.map((item: any) => (
              <article
                key={item.name}
                className={`${radiusClass()} border p-7 ${
                  item.highlighted
                    ? 'border-[var(--brand-primary)]/55 bg-[var(--brand-primary)]/10'
                    : 'border-[var(--brand-line)] bg-[var(--brand-surface)]/75'
                }`}
              >
                <h3 className="text-3xl font-black">{item.name}</h3>
                <p className="mt-2 text-sm font-black uppercase tracking-[.16em] text-[var(--brand-muted)]">
                  {item.limit}
                </p>
                <p className="mt-5 text-4xl font-black text-[var(--brand-primary-soft)]">
                  {item.price}
                </p>
                <p className="mt-5 leading-7 text-[var(--brand-muted)]">
                  Stała dostawa nowych rekordów do pracy sprzedażowej, prospectingu lub kampanii lokalnej.
                </p>
                <Link href={contactHref({ source: 'cennik - abonament', packageName: item.name, topic: 'abonament na leady' })} className={getButtonClass({ tone: item.highlighted ? 'primary' : 'secondary', className: 'mt-7 w-full' })}>
                  Zapytaj o abonament
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section brand-section-soft">
        <div className="container">
          <div className={`${radiusClass()} card flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between md:p-9`}>
            <div>
              <h2 className="text-3xl font-black tracking-[-.04em]">
                Nie wiesz, który pakiet wybrać?
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[var(--brand-muted)]">
                Napisz, jaka branża i lokalizacja Cię interesuje. Przygotuję propozycję
                paczki oraz informację, ile realnie firm można znaleźć w danym obszarze.
              </p>
            </div>
            <Link href={contactHref({ source: 'cennik - dobór pakietu', topic: 'dobór pakietu leadów' })} className={getButtonClass({ tone: 'primary' })}>
              Skontaktuj się
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
