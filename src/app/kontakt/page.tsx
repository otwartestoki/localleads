import PageShell from '@/components/pages/PageShell';
import ContactForm from '@/components/forms/ContactForm';
import { pages } from '@/config/pages';
import { site } from '@/config/site';
import { radiusClass } from '@/lib/style';
import { pageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

export const metadata = pageMetadata({
  title: 'Kontakt — brakujące dane',
  description: 'Skontaktuj się, jeśli chcesz zgłosić brakującą branżę, miasto lub błąd w bazie firm.',
  path: '/kontakt',
});

type ContactSearchParams = {
  zrodlo?: string;
  temat?: string;
  zakres?: string;
  miasto?: string;
  branza?: string;
};

type Props = {
  searchParams?: Promise<ContactSearchParams>;
};

export default async function ContactPage({ searchParams }: Props) {
  if (!pages.contact.enabled) notFound();

  const params = (await searchParams) || {};

  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              LocalLeads
            </p>
            <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-[-.06em]">{pages.contact.title}</h1>
            <p className="mt-5 text-lg leading-8 opacity-75">{pages.contact.subtitle}</p>
            <div className={`${radiusClass()} card mt-8 p-7 leading-8`}>
              <p><b>Adres:</b> {site.contact.address}</p>
              <p><b>Telefon:</b> {site.contact.phone}</p>
              <p><b>Email:</b> {site.contact.email}</p>
            </div>
          </div>

          <ContactForm
            source={params.zrodlo}
            topic={params.temat}
            packageName={params.zakres}
            city={params.miasto}
            industry={params.branza}
          />
        </div>
      </section>
    </PageShell>
  );
}
