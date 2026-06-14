import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageShell from '@/components/pages/PageShell';
import { site } from '@/config/site';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';
import { contactHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';
import { findServiceBySlug, getServiceImage, getServiceSlug, getServices } from '@/lib/luminso-service-routes';

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getServices().map((service, index) => ({
    slug: getServiceSlug(service, index),
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const found = findServiceBySlug(slug);

  return pageMetadata({
    title: found ? `${found.service.title} — baza leadów B2B CSV` : 'Oferta baz leadów B2B CSV',
    description: found?.service.short || site.description,
    path: `/uslugi/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const found = findServiceBySlug(slug);

  if (!found) notFound();

  const { service, index } = found;
  const image = getServiceImage(service, index);

  return (
    <PageShell>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-slate-950 py-24 text-white md:py-32">
        <Image
          src={image}
          alt={service.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-slate-950/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/78 via-slate-950/42 to-slate-950/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

        <div className="container relative z-10 max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
            Oferta
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-[-.06em] md:text-7xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/86">
            {service.short}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={contactHref({ source: 'szczegóły usługi', packageName: service.title, topic: 'zamówienie typu bazy' })} className={getButtonClass({ tone: 'primary' })}>
              Zamów ten typ bazy
            </Link>
            <Link href="/uslugi" className={getButtonClass({ tone: 'secondary' })}>
              Wróć do oferty
            </Link>
          </div>
        </div>
      </section>

      <section className="section brand-section-soft">
        <div className="container grid gap-6 md:grid-cols-[.72fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
              Szczegóły
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-5xl">
              Co zawiera paczka
            </h2>
          </div>

          <div className={`${radiusClass()} card p-7 md:p-9`}>
            <p className="text-lg leading-8 opacity-75">{service.details}</p>
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-sm font-black uppercase tracking-[.18em] opacity-50">Cena orientacyjna</p>
              <p className="mt-2 text-3xl font-black text-[var(--brand-primary-soft)]">
                {service.price}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section brand-section-dark">
        <div className="container">
          <div className={`${radiusClass()} card flex flex-col gap-5 p-7 md:flex-row md:items-center md:justify-between md:p-9`}>
            <div>
              <h2 className="text-3xl font-black tracking-[-.04em]">Chcesz zamówić podobną bazę?</h2>
              <p className="mt-2 leading-7 opacity-70">Przejdź do kontaktu i opisz branżę, miasto lub region, którego potrzebujesz.</p>
            </div>
            <Link href={contactHref({ source: 'szczegóły usługi - dolne CTA', packageName: service.title, topic: 'podobna baza leadów' })} className={getButtonClass({ tone: 'primary' })}>
              Kontakt
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
