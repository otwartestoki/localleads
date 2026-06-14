import PageShell from '@/components/pages/PageShell';
import GalleryView from '@/components/sections/GalleryView';
import { pages } from '@/config/pages';
import { content } from '@/config/content';
import { site } from '@/config/site';
import { preset } from '@/config/presets';
import { notFound } from 'next/navigation';

export default function GalleryPage() {
  if (!pages.gallery.enabled) notFound();

  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container">
          <GalleryView
            images={[...site.gallery]}
            items={[...content.gallery.items]}
            settings={preset.galleryPage || preset.gallery}
            title={pages.gallery.title || content.gallery.title}
            description={pages.gallery.subtitle || content.gallery.description}
          />
        </div>
      </section>
    </PageShell>
  );
}
