import Image from "next/image";
import { site } from "@/config/site";

type Partner = {
  name: string;
  logo: string;
  url?: string;
  description?: string;
};

type PartnersSection = {
  showHeader?: boolean;
  showNames?: boolean;
  title?: string;
  description?: string;
  variant?: "carousel" | "grid" | "cards" | "strip";
  autoplay?: boolean;
  grayscale?: boolean;
  pauseOnHover?: boolean;
};

const partners = ((site as any).partners || []) as Partner[];
const section = (((site as any).partnersSection || {}) as PartnersSection);

function LogoItem({ partner, showNames, grayscale }: { partner: Partner; showNames?: boolean; grayscale?: boolean }) {
  const inner = (
    <div className="flex min-w-[160px] flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-6 py-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-10 w-32">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          sizes="128px"
          className={`object-contain transition ${grayscale ? "grayscale hover:grayscale-0" : ""}`}
        />
      </div>
      {showNames ? <span className="text-xs font-medium text-slate-500">{partner.name}</span> : null}
    </div>
  );

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noreferrer" aria-label={partner.name}>
        {inner}
      </a>
    );
  }

  return inner;
}

export default function Partners() {
  if (!partners.length) return null;

  const variant = section.variant || "carousel";
  const showNames = section.showNames ?? false;
  const grayscale = section.grayscale ?? true;
  const pauseOnHover = section.pauseOnHover ?? true;
  const doubled = [...partners, ...partners];

  return (
    <section id="partners" className="overflow-hidden bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {section.showHeader ? (
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">Współpraca</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              {section.title || "Partnerzy i współprace"}
            </h2>
            {section.description ? <p className="mt-3 text-slate-600">{section.description}</p> : null}
          </div>
        ) : null}

        {variant === "grid" ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner) => (
              <LogoItem key={partner.name} partner={partner} showNames={showNames} grayscale={grayscale} />
            ))}
          </div>
        ) : variant === "cards" ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div key={partner.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <LogoItem partner={partner} showNames={false} grayscale={grayscale} />
                <h3 className="mt-5 font-semibold text-slate-950">{partner.name}</h3>
                {partner.description ? <p className="mt-2 text-sm text-slate-600">{partner.description}</p> : null}
              </div>
            ))}
          </div>
        ) : variant === "strip" ? (
          <div className="flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            {partners.map((partner) => (
              <LogoItem key={partner.name} partner={partner} showNames={showNames} grayscale={grayscale} />
            ))}
          </div>
        ) : (
          <div className="relative -mx-4 overflow-hidden px-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
            <div className={`flex w-max gap-4 ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""} animate-[partnersMarquee_28s_linear_infinite]`}>
              {doubled.map((partner, index) => (
                <LogoItem key={`${partner.name}-${index}`} partner={partner} showNames={showNames} grayscale={grayscale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
