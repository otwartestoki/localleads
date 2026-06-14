import { content } from '@/config/content';
import { preset } from '@/config/presets';
import { site } from '@/config/site';
import GalleryView from './GalleryView';

export default function Gallery() {
  return (
    <section className="section brand-section-dark" id="gallery">
      <div className="container">
        <GalleryView
          images={[...site.gallery]}
          items={[...content.gallery.items]}
          settings={preset.gallery}
          title={content.gallery.title}
          description={content.gallery.description}
          compact
        />
      </div>
    </section>
  );
}
