import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/pages/PageShell';
import { contactHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';
import { cityIndustryPath, getSeoCity, seoCities, seoIndustries } from '@/data/seo-pages';

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return seoCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { city } = await params;
  const cityData = getSeoCity(city);
  if (!cityData) return {};

  return pageMetadata({
    title: `Firmy ${cityData.name} — darmowa baza online`,
    description: `Przeglądaj darmową bazę firm z miasta ${cityData.name}. Dane po branżach, kontakty, social media i strony WWW, jeśli są dostępne publicznie.`,
    path: `/leady/${city}`,
  });
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const cityData = getSeoCity(city);
  if (!cityData) notFound();

  const featuredIndustries = seoIndustries.slice(0, 12);

  return (
    <PageShell>
      <section className="bg-slate-950 px-5 py-20 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[.2em] text-cyan-200">Dane lokalne</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black tracking-[-.06em] md:text-7xl">
            Firmy {cityData.name} — baza po branżach
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
            Przeglądaj uporządkowaną bazę firm z miasta {cityData.name}. Jeśli brakuje konkretnej branży lub zakresu danych, wyślij zgłoszenie przez formularz.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={contactHref({ source: 'landing miejski', city: cityData.name, topic: 'brakująca branża lub zakres danych' })} className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-black text-white">
              Zgłoś brakujące dane
            </Link>
            <a href="#branze" className="rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white">
              Zobacz branże
            </a>
          </div>
        </div>
      </section>

      <section id="branze" className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="text-4xl font-black tracking-[-.05em]">Strony SEO dla branż w mieście {cityData.name}</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Te linki prowadzą do osobnych landing pages typu miasto + branża. Nie muszą być widoczne w głównym menu, ale są dostępne dla Google przez linkowanie wewnętrzne i sitemapę.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredIndustries.map((industry) => (
              <Link key={industry.slug} href={cityIndustryPath(cityData.slug, industry.slug)} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 font-bold transition hover:border-indigo-200 hover:bg-indigo-50">
                {industry.name} — {cityData.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8 shadow-sm md:p-12">
          <h2 className="text-4xl font-black tracking-[-.05em]">Co może zawierać baza firm z miasta {cityData.name}?</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {['nazwa firmy, adres i kategoria', 'telefon, strona WWW i social media', 'publicznie dostępne dane firmowe'].map((item) => (
              <div key={item} className="rounded-3xl bg-slate-50 p-6 text-xl font-black text-slate-900">{item}</div>
            ))}
          </div>
          <p className="mt-8 max-w-4xl leading-8 text-slate-600">
            Zakres zależy od dostępności publicznych danych w danej branży i lokalizacji. Brakujące miasta lub branże możesz zgłosić przez formularz albo na kontakt@localleads.pl.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
