import Link from 'next/link';

import PageShell from '@/components/pages/PageShell';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';
import { contactHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';

const audiences = [
  {
    title: 'Agencje SEO i marketingowe',
    text: 'Szybko sprawdzają lokalne firmy, nisze i potencjalnych klientów do audytów, kampanii oraz ofert.',
  },
  {
    title: 'Twórcy stron WWW',
    text: 'Mogą znaleźć firmy z wybranej branży i miasta, które warto sprawdzić pod kątem obecności online.',
  },
  {
    title: 'Sprzedaż B2B i outreach',
    text: 'Handlowcy mogą filtrować bazę i przygotowywać listy firm do dalszej, własnej kwalifikacji.',
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
  'eksport CSV na życzenie',
] as const;

const steps = [
  'Korzystasz z darmowej bazy firm na stronie.',
  'Filtrujesz dane po mieście, branży i frazie.',
  'Jeśli baza Ci wystarcza, nie kupujesz niczego.',
  'Jeśli chcesz plik albo brakujący zakres, zamawiasz eksport CSV.',
] as const;

export const metadata = pageMetadata({
  title: 'Oferta LocalLeads — darmowa baza firm i eksport CSV',
  description: 'LocalLeads to darmowa baza firm do przeglądania. Płatny jest tylko eksport CSV albo przygotowanie danych z miasta lub branży, której jeszcze nie ma w bazie.',
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
              Darmowa baza firm. Płatny tylko eksport CSV.
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">
              LocalLeads ma działać jako praktyczne narzędzie, a nie sklep ukrywający dane za paywallem. Przeglądasz bazę za darmo.
              Kontaktujesz się dopiero wtedy, gdy potrzebujesz pliku CSV albo konkretnej branży, miasta lub liczby leadów, której jeszcze nie ma w bazie.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/baza-firm" className={getButtonClass({ tone: 'primary' })}>
                Przeglądaj bazę firm
              </Link>
              <Link href={contactHref({ source: 'strona oferta', topic: 'eksport CSV' })} className={getButtonClass({ tone: 'secondary' })}>
                Zapytaj o eksport CSV
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
              Dane na stronie + CSV na życzenie
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              Na stronie pokazuję dane przydatne do researchu i filtrowania. Eksport CSV jest opcją dla osób, które chcą pracować na pliku,
              zaimportować dane do CRM albo zamówić zakres, którego jeszcze nie ma w bazie.
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
              Od darmowego podglądu do pliku CSV
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
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              Eksport CSV
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-6xl">
              Cennik eksportu danych
            </h2>

            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              Przeglądanie bazy firm na stronie jest darmowe. Płatny jest wyłącznie eksport danych do pliku CSV
              albo przygotowanie indywidualnego zestawienia według wybranej branży, miasta lub liczby rekordów.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--brand-line)] bg-[var(--brand-surface)]/70">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="border-b border-[var(--brand-line)] bg-white/[.03]">
                  <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-[.16em] text-[var(--brand-muted)]">
                    Liczba leadów
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-[.16em] text-[var(--brand-muted)]">
                    Cena eksportu CSV
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-[.16em] text-[var(--brand-muted)]">
                    Dla kogo
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-[var(--brand-line)]">
                  <td className="px-6 py-5 font-bold">Do 100 firm</td>
                  <td className="px-6 py-5 text-xl font-black">49 zł</td>
                  <td className="px-6 py-5 text-[var(--brand-muted)]">Mały test branży, miasta lub niszy.</td>
                </tr>

                <tr className="border-b border-[var(--brand-line)]">
                  <td className="px-6 py-5 font-bold">Do 250 firm</td>
                  <td className="px-6 py-5 text-xl font-black">99 zł</td>
                  <td className="px-6 py-5 text-[var(--brand-muted)]">Większy research i przygotowanie kampanii.</td>
                </tr>

                <tr className="border-b border-[var(--brand-line)]">
                  <td className="px-6 py-5 font-bold">Do 500 firm</td>
                  <td className="px-6 py-5 text-xl font-black">149 zł</td>
                  <td className="px-6 py-5 text-[var(--brand-muted)]">Pełniejsza lista firm dla wybranego segmentu.</td>
                </tr>

                <tr>
                  <td className="px-6 py-5 font-bold">Powyżej 500 firm</td>
                  <td className="px-6 py-5 text-xl font-black">Wycena indywidualna</td>
                  <td className="px-6 py-5 text-[var(--brand-muted)]">Eksporty regionalne, branżowe lub niestandardowe.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <div className={`${radiusClass()} card p-7`}>
              <h3 className="text-2xl font-black">Co obejmuje eksport?</h3>
              <p className="mt-4 leading-8 text-[var(--brand-muted)]">
                Eksport może obejmować dane widoczne w bazie oraz indywidualnie przygotowany zakres, jeśli potrzebujesz
                konkretnej branży, miasta albo większej liczby rekordów niż aktualnie znajduje się na stronie.
              </p>
            </div>

            <div className={`${radiusClass()} card p-7`}>
              <h3 className="text-2xl font-black">Potrzebujesz pliku?</h3>
              <p className="mt-4 leading-8 text-[var(--brand-muted)]">
                Opisz branżę, miasto i przybliżoną liczbę leadów. Przygotuję odpowiedni eksport CSV.
              </p>
              <Link
                href={contactHref({ source: 'strona oferta', topic: 'wycena eksportu CSV' })}
                className={`${getButtonClass({ tone: 'primary' })} mt-6`}
              >
                Zapytaj o eksport CSV
              </Link>
            </div>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
