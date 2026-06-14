import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/pages/PageShell';
import { contactHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';
import { cityIndustryPath, getSeoIndustry, seoCities, seoIndustries } from '@/data/seo-pages';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seoIndustries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = getSeoIndustry(slug);
  if (!industry) return {};

  return pageMetadata({
    title: `Leady ${industry.name} — baza firm B2B CSV`,
    description: `Kup bazę firm z branży: ${industry.name}. Leady po miastach, dane kontaktowe, social media, strony WWW i eksport CSV/XLSX.`,
    path: `/branze/${slug}`,
  });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getSeoIndustry(slug);
  if (!industry) notFound();

  const featuredCities = seoCities.slice(0, 16);

  return (
    <PageShell>
      <section className="bg-slate-950 px-5 py-20 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[.2em] text-cyan-200">Leady branżowe</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black tracking-[-.06em] md:text-7xl">
            Leady: {industry.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
            Baza firm z branży {industry.name} przygotowana pod sprzedaż, prospecting i kampanie lokalne. Dane możesz wykorzystać do kontaktu z firmami w wybranych miastach.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={contactHref({ source: 'landing branżowy', industry: industry.name, topic: 'leady branżowe' })} className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-black text-white">
              Zapytaj o tę branżę
            </Link>
            <a href="#miasta" className="rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white">
              Zobacz miasta
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div className="rounded-[2rem] bg-slate-50 p-8">
            <h2 className="text-2xl font-black">Problem</h2>
            <p className="mt-4 leading-8 text-slate-600">{industry.pain}.</p>
          </div>
          <div className="rounded-[2rem] bg-indigo-50 p-8">
            <h2 className="text-2xl font-black">Zastosowanie</h2>
            <p className="mt-4 leading-8 text-slate-600">{industry.useCase}.</p>
          </div>
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
            <h2 className="text-2xl font-black">Format</h2>
            <p className="mt-4 leading-8 text-white/70">CSV/XLSX z nazwą firmy, lokalizacją, telefonem, stroną WWW i linkami do social media, zależnie od dostępności danych.</p>
          </div>
        </div>
      </section>

      <section id="miasta" className="bg-slate-50 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black tracking-[-.05em]">Dostępne miasta dla branży: {industry.name}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Każde miasto prowadzi do osobnej strony SEO typu miasto + branża. Dzięki temu Google może indeksować konkretne zapytania, np. baza firm dla fryzjerów w Łodzi.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {featuredCities.map((city) => (
              <Link key={city.slug} href={cityIndustryPath(city.slug, industry.slug)} className="rounded-3xl border border-slate-200 bg-white p-5 font-bold transition hover:border-indigo-200 hover:bg-indigo-50">
                {industry.name} — {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
