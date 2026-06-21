import Link from 'next/link';
import { contactHref } from '@/lib/contact';
import type { LeadDatabaseStats } from '@/lib/leadsSeo';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';

type Props = {
  stats: LeadDatabaseStats;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat('pl-PL').format(value);
}

export default function LeadDatabaseSummary({ stats }: Props) {
  return (
    <section className={`${radiusClass()} mt-10 border border-[var(--brand-line)] bg-[var(--brand-surface)]/70 p-6 md:p-8`}>
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
            Podsumowanie bazy
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-.04em] md:text-5xl">
            Co jest aktualnie w LocalLeads?
          </h2>
          <p className="mt-5 leading-8 text-[var(--brand-muted)]">
            Baza jest dostępna do darmowego przeglądania online. Jeśli nie widzisz potrzebnej branży, miasta albo zakresu, wyślij zgłoszenie przez formularz.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/landingi" className={getButtonClass({ tone: 'secondary' })}>
              Zobacz landingi SEO
            </Link>
            <Link href={contactHref({ source: 'podsumowanie bazy', topic: 'brakująca branża lub miasto' })} className={getButtonClass({ tone: 'primary' })}>
              Zgłoś brakujące dane
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-5">
            <div className="text-sm font-bold text-[var(--brand-muted)]">Firmy w bazie</div>
            <div className="mt-2 text-4xl font-black text-white">{formatNumber(stats.total)}</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-5">
            <div className="text-sm font-bold text-[var(--brand-muted)]">Branże</div>
            <div className="mt-2 text-4xl font-black text-white">{formatNumber(stats.totalCategories)}</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-5">
            <div className="text-sm font-bold text-[var(--brand-muted)]">Rekordy z WWW</div>
            <div className="mt-2 text-4xl font-black text-white">{formatNumber(stats.websites)}</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-5">
            <div className="text-sm font-bold text-[var(--brand-muted)]">Rekordy z telefonem</div>
            <div className="mt-2 text-4xl font-black text-white">{formatNumber(stats.phones)}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-black">Największe branże</h3>
          <div className="mt-4 grid gap-2">
            {stats.categories.length ? stats.categories.map((item) => (
              <Link key={item.slug} href={`/branza/${item.slug}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm font-bold text-[var(--brand-muted)] transition hover:border-[var(--brand-primary)]/50 hover:text-white">
                <span>{item.name}</span>
                <span className="text-[var(--brand-primary-soft)]">{formatNumber(item.count)}</span>
              </Link>
            )) : <p className="text-sm text-[var(--brand-muted)]">Brak danych do podsumowania.</p>}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black">Największe lokalizacje</h3>
          <div className="mt-4 grid gap-2">
            {stats.cities.length ? stats.cities.map((item) => (
              <Link key={item.slug} href={`/miasto/${item.slug}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm font-bold text-[var(--brand-muted)] transition hover:border-[var(--brand-primary)]/50 hover:text-white">
                <span>{item.name}</span>
                <span className="text-[var(--brand-primary-soft)]">{formatNumber(item.count)}</span>
              </Link>
            )) : <p className="text-sm text-[var(--brand-muted)]">Brak danych do podsumowania.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
