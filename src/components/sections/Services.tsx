import Link from 'next/link';

import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';
import { contactHref } from '@/lib/contact';

const audiences = [
  'agencje SEO i marketingowe',
  'freelancerzy tworzący strony WWW',
  'handlowcy B2B',
  'firmy szukające partnerów lokalnych',
  'osoby analizujące lokalny rynek',
  'twórcy kampanii cold mail / outreach',
] as const;

const useCases = [
  {
    title: 'Korzystasz z danych za darmo',
    description: 'Przeglądasz bazę na stronie, filtrujesz firmy po branży, mieście i frazie oraz sprawdzasz dostępne kontakty.',
  },
  {
    title: 'Sprawdzasz, czy baza Ci wystarcza',
    description: 'Jeśli dane są w bazie, nie musisz nic kupować. Możesz wykorzystać widok na stronie jako punkt startowy do researchu.',
  },
  {
    title: 'Zamawiasz tylko eksport CSV',
    description: 'Płatny jest wyłącznie eksport do pliku CSV albo przygotowanie zakresu, którego jeszcze nie ma w bazie.',
  },
] as const;

export default function Services() {
  return (
    <section id="uslugi" className="section brand-section-dark">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[.22em] text-[var(--brand-primary-soft)]">
              Dla kogo jest LocalLeads
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.05em] md:text-6xl">
              Darmowa baza firm dla osób, które pracują na danych
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              LocalLeads nie jest już sklepem z gotowymi paczkami. Podstawą jest darmowa baza firm dostępna na stronie.
              Płacisz tylko wtedy, gdy chcesz dostać eksport CSV albo potrzebujesz konkretnego miasta, branży lub zakresu,
              którego jeszcze nie ma w bazie.
            </p>
          </div>

          <div className={`${radiusClass()} border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/8 p-6`}>
            <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
              Najczęściej korzystają
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {audiences.map((audience) => (
                <span key={audience} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-sm font-bold text-white/85">
                  {audience}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {useCases.map((item) => (
            <article key={item.title} className={`${radiusClass()} card p-7`}>
              <h3 className="text-3xl font-black">{item.title}</h3>
              <p className="mt-4 leading-7 text-[var(--brand-muted)]">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/baza-firm" className={getButtonClass({ tone: 'primary' })}>
            Przeglądaj bazę firm
          </Link>
          <Link href={contactHref({ source: 'landing - oferta', topic: 'eksport CSV' })} className={getButtonClass({ tone: 'secondary' })}>
            Zapytaj o eksport CSV
          </Link>
        </div>
      </div>
    </section>
  );
}
