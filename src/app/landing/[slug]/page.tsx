import Link from 'next/link';

import PageShell from '@/components/pages/PageShell';
import { getButtonClass } from '@/lib/uiStyles';

type Props = { params: Promise<{ slug: string }> };

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;

  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
            Baza firm LocalLeads
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-[-.05em]">
            {slug.replace(/-/g, ' ')}
          </h1>

          <p className="mt-6 text-lg leading-8 text-[var(--brand-muted)]">
            Ta podstrona porządkuje firmy i zastosowania wokół konkretnego tematu. Przejdź do głównej bazy, żeby
            filtrować rekordy, sprawdzać kontakty i oznaczać firmy do dalszej pracy.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/baza-firm" className={getButtonClass({ tone: 'primary' })}>
              Przejdź do bazy firm
            </Link>
            <Link href="/indeks-bazy" className={getButtonClass({ tone: 'secondary' })}>
              Zobacz indeks
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
