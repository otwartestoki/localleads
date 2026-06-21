import Link from 'next/link';

import PageShell from '@/components/pages/PageShell';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';
import { contactHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';

const audiences = [
  {
    title: 'Agencje SEO i marketingowe',
    text: 'Szybko sprawdzają lokalne firmy, nisze i potencjalne kontakty do audytów, kampanii oraz analiz rynku.',
  },
  {
    title: 'Twórcy stron WWW',
    text: 'Mogą znaleźć firmy z wybranej branży i miasta, które warto sprawdzić pod kątem obecności online.',
  },
  {
    title: 'Sprzedaż B2B i outreach',
    text: 'Handlowcy mogą filtrować bazę i przygotowywać własne listy firm do dalszej kwalifikacji.',
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
  'publicznie dostępne informacje firmowe',
] as const;

const steps = [
  'Wchodzisz do darmowej bazy firm.',
  'Filtrujesz dane po mieście, branży, nazwie firmy albo dowolnej frazie.',
  'Korzystasz z dostępnych informacji od razu na stronie.',
  'Jeśli czegoś brakuje, zgłaszasz branżę lub miasto przez formularz albo kontakt@localleads.pl.',
] as const;

export const metadata = pageMetadata({
  title: 'Oferta LocalLeads - darmowa baza firm',
  description: 'LocalLeads to darmowa baza firm do przeglądania. Jeśli brakuje branży lub miasta, napisz na kontakt@localleads.pl albo użyj formularza.',
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
              Darmowa baza firm dostępna na stronie.
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">
              LocalLeads skupia się na udostępnianiu danych za darmo. Przeglądasz bazę online, filtrujesz firmy
              i sprawdzasz dostępne kontakty w jednym miejscu.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/baza-firm" className={getButtonClass({ tone: 'primary' })}>
                Przeglądaj bazę firm
              </Link>
              <Link href={contactHref({ source: 'strona oferta', topic: 'brakująca branża lub miasto' })} className={getButtonClass({ tone: 'secondary' })}>
                Zgłoś brakujące dane
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {audiences.map((item) => (
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
              Co jest dostępne
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-6xl">
              Dane firmowe do darmowego researchu
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              Na stronie pokazuję dane przydatne do sprawdzania lokalnego rynku, wyszukiwania firm i budowania własnych
              list roboczych. Jeśli nie widzisz potrzebnej branży albo miasta, napisz na kontakt@localleads.pl lub przez formularz.
            </p>
          </div>

          <div className={`${radiusClass()} card p-7 md:p-9`}>
            <h3 className="text-2xl font-black">Co może zawierać rekord?</h3>
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
              Od wyszukiwania do zgłoszenia braków
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
          <div className={`${radiusClass()} card flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between md:p-9`}>
            <div>
              <h2 className="text-3xl font-black tracking-[-.04em]">
                Brakuje branży albo miasta?
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[var(--brand-muted)]">
                Wyślij wiadomość na kontakt@localleads.pl albo przez formularz. Podaj branżę, miasto lub region oraz to,
                jakich danych szukasz.
              </p>
            </div>
            <Link href={contactHref({ source: 'strona oferta', topic: 'brakująca branża lub miasto' })} className={getButtonClass({ tone: 'primary' })}>
              Skontaktuj się
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
