import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/pages/PageShell';
import { contactHref } from '@/lib/contact';
import { pageMetadata, productJsonLd } from '@/lib/seo';
import { getSeoCity, getSeoCombinations, getSeoIndustry, seoCities, seoIndustries } from '@/data/seo-pages';

type Props = { params: Promise<{ city: string; industry: string }> };

export function generateStaticParams() {
  return getSeoCombinations();
}

export async function generateMetadata({ params }: Props) {
  const { city, industry } = await params;
  const cityData = getSeoCity(city);
  const industryData = getSeoIndustry(industry);
  if (!cityData || !industryData) return {};

  return pageMetadata({
    title: `Leady ${industryData.name} ${cityData.name} — baza firm CSV`,
    description: `Baza firm: ${industryData.name} w mieście ${cityData.name}. Kontakty B2B, telefony, strony WWW, social media i eksport CSV/XLSX.`,
    path: `/leady/${city}/${industry}`,
  });
}

export default async function CityIndustryPage({ params }: Props) {
  const { city, industry } = await params;
  const cityData = getSeoCity(city);
  const industryData = getSeoIndustry(industry);
  if (!cityData || !industryData) notFound();

  const nearbyCities = seoCities.filter((item) => item.slug !== cityData.slug).slice(0, 8);
  const relatedIndustries = seoIndustries.filter((item) => item.slug !== industryData.slug).slice(0, 8);
  const title = `Leady ${industryData.name} ${cityData.name}`;

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd({ name: title, description: `Baza firm ${industryData.name} w lokalizacji ${cityData.name} w formacie CSV/XLSX.`, path: `/leady/${cityData.slug}/${industryData.slug}`, lowPrice: '99', highPrice: '599' })) }} />

      <section className="bg-slate-950 px-5 py-20 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[.2em] text-cyan-200">Landing SEO miasto + branża</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black tracking-[-.06em] md:text-7xl">
            {title} — baza firm CSV/XLSX
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
            Zamów paczkę kontaktów do firm z branży {industryData.name} w mieście {cityData.name}. To gotowa baza pod prospecting, kampanie sprzedażowe i ofertowanie lokalnych usług B2B.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={contactHref({ source: 'landing SEO miasto-branza', city: cityData.name, industry: industryData.name, topic: 'baza leadów CSV' })} className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-black text-white">
              Zapytaj o bazę
            </Link>
            <Link href={`/leady/${cityData.slug}`} className="rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white">
              Wszystkie branże: {cityData.name}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div className="rounded-[2rem] bg-slate-50 p-8">
            <h2 className="text-2xl font-black">Dla kogo?</h2>
            <p className="mt-4 leading-8 text-slate-600">Dla firm sprzedających usługi B2B do lokalnych biznesów, które chcą szybciej znaleźć potencjalnych klientów w mieście {cityData.name}.</p>
          </div>
          <div className="rounded-[2rem] bg-indigo-50 p-8">
            <h2 className="text-2xl font-black">Po co?</h2>
            <p className="mt-4 leading-8 text-slate-600">{industryData.useCase}.</p>
          </div>
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
            <h2 className="text-2xl font-black">Co dostajesz?</h2>
            <p className="mt-4 leading-8 text-white/70">Uporządkowany plik CSV/XLSX z danymi firm, który możesz zaimportować do CRM albo wykorzystać do ręcznego kontaktu.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8 shadow-sm md:p-12">
          <h2 className="text-4xl font-black tracking-[-.05em]">Zakres danych w paczce</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {['nazwa firmy', 'adres i miasto', 'telefon', 'strona WWW', 'Facebook', 'Instagram', 'kategoria firmy', 'eksport CSV/XLSX'].map((item) => (
              <div key={item} className="rounded-3xl bg-slate-50 p-5 font-bold text-slate-800">✓ {item}</div>
            ))}
          </div>
          <p className="mt-8 max-w-4xl leading-8 text-slate-600">
            Zakres zależy od dostępności danych dla konkretnej branży. Przed realizacją można ustalić minimalną liczbę rekordów, miasto, branżę oraz preferowany format pliku.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black tracking-[-.04em]">Inne branże w mieście {cityData.name}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {relatedIndustries.map((item) => (
                <Link key={item.slug} href={`/leady/${cityData.slug}/${item.slug}`} className="rounded-2xl border border-slate-200 p-4 font-bold hover:bg-slate-50">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-[-.04em]">{industryData.name} w innych miastach</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {nearbyCities.map((item) => (
                <Link key={item.slug} href={`/leady/${item.slug}/${industryData.slug}`} className="rounded-2xl border border-slate-200 p-4 font-bold hover:bg-slate-50">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
