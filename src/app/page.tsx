import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionRenderer from '@/components/SectionRenderer';
import { site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: site.seo?.title || 'LocalLeads — baza leadów B2B CSV',
  description: site.seo?.description || site.description,
  path: '/',
});

export default function Page() {
  return (
    <>
      <Header />
      <SectionRenderer />
      <Footer />
    </>
  );
}
