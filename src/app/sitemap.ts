import type { MetadataRoute } from 'next';
import { content } from '@/config/content';
import { getLandingIndex } from '@/lib/leadsSeo';
import { siteUrl } from '@/lib/seo';
import { getSeoCombinations, seoCities, seoIndustries } from '@/data/seo-pages';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPaths = ['/', '/baza-firm', '/indeks-bazy', '/uslugi', '/oferta', '/o-mnie', '/faq', '/kontakt', '/blog', '/polityka-prywatnosci', '/regulamin', '/polityka-cookies'];
  const servicePaths = content.services.map((service) => `/uslugi/${service.slug}`);

  const legacyCityPaths = seoCities.map((city) => `/leady/${city.slug}`);
  const legacyIndustryPaths = seoIndustries.map((industry) => `/branze/${industry.slug}`);
  const legacyCityIndustryPaths = getSeoCombinations().map(({ city, industry }) => `/leady/${city}/${industry}`);

  const index = await getLandingIndex();
  const categoryPaths = index.categories.slice(0, 300).map((category) => `/branza/${category.slug}`);
  const cityPaths = index.cities.slice(0, 300).map((city) => `/miasto/${city.slug}`);
  const categoryCityPaths = index.categories.slice(0, 80).flatMap((category) =>
    index.cities.slice(0, 80).map((city) => `/branza/${category.slug}/${city.slug}`),
  );

  const uniquePaths = Array.from(new Set([
    ...staticPaths,
    ...servicePaths,
    ...legacyCityPaths,
    ...legacyIndustryPaths,
    ...legacyCityIndustryPaths,
    ...categoryPaths,
    ...cityPaths,
    ...categoryCityPaths,
  ]));

  return uniquePaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === '/' || path === '/baza-firm' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/branza/') || path.startsWith('/miasto/') ? 0.85 : 0.7,
  }));
}
