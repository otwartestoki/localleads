import PageShell from '@/components/pages/PageShell';
import { site } from '@/config/site';
import { radiusClass } from '@/lib/style';

type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  sections: readonly LegalSection[];
  children?: React.ReactNode;
};

const legal = (site as any).legal || {};

export function LegalCompanyBox() {
  return (
    <aside className={`${radiusClass()} card p-6 text-sm leading-7 text-white/75`}>
      <p className="font-black text-white">Administrator / Usługodawca</p>
      <p className="mt-3">{legal.companyName || 'Jacek Smętkowski ProjektJS'}</p>
      <p>NIP: {legal.nip || '8882867477'}</p>
      <p>{legal.address || 'Apteczna 10A, 87-860 Chodecz'}</p>
      <p>{legal.country || 'Polska'}</p>
      <p className="mt-3">E-mail: {legal.email || site.contact?.email}</p>
      <p>Telefon: {legal.phone || site.contact?.phone}</p>
      <p className="mt-3 text-white/50">Data obowiązywania: {legal.effectiveDate || '13 czerwca 2026'}</p>
    </aside>
  );
}

export default function LegalPage({ eyebrow, title, lead, sections, children }: LegalPageProps) {
  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-[-.06em] md:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
              {lead}
            </p>
          </div>
          <LegalCompanyBox />
        </div>
      </section>

      <section className="section bg-[#020617] text-white">
        <div className="container max-w-5xl">
          <div className="grid gap-5">
            {sections.map((section, index) => (
              <article key={`${section.title}-${index}`} className={`${radiusClass()} card p-7 md:p-9`}>
                <h2 className="text-2xl font-black tracking-[-.03em] md:text-3xl">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-8 text-white/72">
                    {paragraph}
                  </p>
                ))}
                {section.items?.length ? (
                  <ul className="mt-5 grid gap-3 text-white/75">
                    {section.items.map((item) => (
                      <li key={item} className="leading-7">
                        <span className="mr-2 text-[var(--brand-primary-soft)]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
          {children ? <div className="mt-8 text-center">{children}</div> : null}
        </div>
      </section>
    </PageShell>
  );
}
