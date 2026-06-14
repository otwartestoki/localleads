import Link from 'next/link';

import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';

const examples = [
  'fryzjerzy Łódź',
  'barberzy Warszawa',
  'dentyści Kraków',
  'restauracje Poznań',
  'firmy budowlane woj. łódzkie',
  'salony kosmetyczne Wrocław',
] as const;

export default function Services() {
  return (
    <section id="uslugi" className="section brand-section-dark">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[.22em] text-[var(--brand-primary-soft)]">
              Oferta LocalLeads
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.05em] md:text-6xl">
              Leady według branży i lokalizacji
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              Główny produkt to paczka firm w CSV: dane kontaktowe oraz social media,
              jeśli są publicznie dostępne. Wybierasz branżę, miasto lub region — nie
              kupujesz przypadkowej listy rekordów.
            </p>
          </div>

          <div className={`${radiusClass()} border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/8 p-6`}>
            <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
              Przykłady paczek
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {examples.map((example) => (
                <span key={example} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-sm font-bold text-white/85">
                  {example}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className={`${radiusClass()} card p-7`}>
            <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
              Jednorazowo
            </p>
            <h3 className="mt-3 text-3xl font-black">Paczka Start</h3>
            <p className="mt-3 text-4xl font-black text-[var(--brand-primary-soft)]">99 zł</p>
            <p className="mt-4 leading-7 text-[var(--brand-muted)]">
              Do 100 firm z wybranej branży i lokalizacji. Dobre do testu kampanii.
            </p>
          </article>

          <article className={`${radiusClass()} border border-[var(--brand-primary)]/55 bg-[var(--brand-primary)]/10 p-7 shadow-[0_24px_80px_rgba(56,189,248,.14)]`}>
            <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
              Najczęściej wybierane
            </p>
            <h3 className="mt-3 text-3xl font-black">Paczka Biznes</h3>
            <p className="mt-3 text-4xl font-black text-[var(--brand-primary-soft)]">199 zł</p>
            <p className="mt-4 leading-7 text-[var(--brand-muted)]">
              Do 250 firm. Sensowny rozmiar do lokalnej sprzedaży, SEO lub ofertowania stron.
            </p>
          </article>

          <article className={`${radiusClass()} card p-7`}>
            <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
              Abonament
            </p>
            <h3 className="mt-3 text-3xl font-black">Od 79 zł / mies.</h3>
            <p className="mt-4 leading-7 text-[var(--brand-muted)]">
              Stały dopływ nowych firm co miesiąc. Niższa cena za lead przy regularnej współpracy.
            </p>
          </article>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/oferta" className={getButtonClass({ tone: 'primary' })}>
            Zobacz ofertę
          </Link>
          <Link href="/cennik" className={getButtonClass({ tone: 'secondary' })}>
            Zobacz cennik
          </Link>
        </div>
      </div>
    </section>
  );
}
