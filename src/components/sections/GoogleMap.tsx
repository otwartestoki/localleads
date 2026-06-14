import { site } from '@/config/site';

function buildMapSrc() {
  const map = (site.map ?? {}) as { embedUrl?: string; query?: string; height?: number; title?: string; description?: string; showHeader?: boolean };

  if (map.embedUrl) return map.embedUrl;

  const query = encodeURIComponent(map.query || site.address || `${site.name} ${site.city || ''}`.trim());
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

export default function GoogleMap() {
  const map = (site.map ?? {}) as { embedUrl?: string; query?: string; height?: number; title?: string; description?: string; showHeader?: boolean };
  const height = map.height ?? 420;
  const title = map.title ?? `Mapa — ${site.name}`;

  return (
    <section id="map" className="w-full bg-white">
      {(map.showHeader ?? false) && (
        <div className="container py-10">
          <p className="text-sm font-black uppercase tracking-[.2em] text-slate-500">Lokalizacja</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">{title}</h2>
          {map.description && <p className="mt-3 max-w-2xl text-slate-600">{map.description}</p>}
        </div>
      )}
      <div className="w-full overflow-hidden border-y border-slate-200 bg-slate-100" style={{ height }}>
        <iframe
          title={title}
          src={buildMapSrc()}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-full w-full border-0"
          allowFullScreen
        />
      </div>
    </section>
  );
}
