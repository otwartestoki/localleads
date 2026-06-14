import type { MetadataRoute } from 'next';
import { content } from '@/config/content';
import { siteUrl } from '@/lib/seo';
import { getSeoCombinations, seoCities, seoIndustries } from '@/data/seo-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ['/', '/uslugi', '/oferta', '/cennik', '/o-mnie', '/faq', '/kontakt', '/blog', '/polityka-prywatnosci', '/regulamin', '/polityka-cookies'];
  const servicePaths = content.services.map((service) => `/uslugi/${service.slug}`);
  const cityPaths = seoCities.map((city) => `/leady/${city.slug}`);
  const industryPaths = seoIndustries.map((industry) => `/branze/${industry.slug}`);
  const cityIndustryPaths = getSeoCombinations().map(({ city, industry }) => `/leady/${city}/${industry}`);

  return [...staticPaths, ...servicePaths, ...cityPaths, ...industryPaths, ...cityIndustryPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/leady/') ? 0.85 : path.startsWith('/branze/') ? 0.8 : 0.7,
  }));
}
