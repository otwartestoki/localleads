import { site } from '@/config/site';
import ContactForm from '@/components/forms/ContactForm';

type SocialItem = { name?: string; label?: string; href?: string; icon?: string; image?: string };

function getVisibleSocialLinks(): SocialItem[] {
  const source = Array.isArray((site as any).social)
    ? (site as any).social
    : Array.isArray((site as any).socialLinks)
      ? (site as any).socialLinks
      : [];

  return source.filter((item: SocialItem) => {
    const href = String(item?.href || '').trim();
    return href.length > 0 && href !== '#';
  });
}

export default function Contact() {
  const socialLinks = getVisibleSocialLinks();

  return (
    <section id="contact" className="section brand-section-soft">
      <div className="container grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-black uppercase tracking-[.22em] text-[var(--brand-primary-soft)]">Kontakt</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-.04em] md:text-5xl">Eksport CSV lub brakujące dane</h2>
          <p className="mt-4 text-lg leading-8 text-[var(--brand-muted)]">
            Korzystanie z bazy na stronie jest darmowe. Napisz, jeśli potrzebujesz eksportu CSV, brakuje Ci konkretnej branży lub miasta albo chcesz zgłosić błąd w danych.
          </p>

          <div className="mt-7 rounded-3xl border border-[var(--brand-line)] bg-[var(--brand-surface)]/70 p-6 leading-8 text-[var(--brand-muted)]">
            <p><b className="text-white">Obszar:</b> {site.contact.address}</p>
            <p><b className="text-white">Telefon:</b> {site.contact.phone}</p>
            <p><b className="text-white">Email:</b> {site.contact.email}</p>
          </div>

          {socialLinks.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3" aria-label="Social media">
              {socialLinks.map((item) => {
                const label = item.label || item.name || 'Social media';
                const image = item.image || item.icon;

                return (
                  <a
                    key={`${label}-${item.href}`}
                    href={item.href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/10 transition hover:-translate-y-1"
                  >
                    {image ? <img src={image} alt={label} className="h-6 w-6 object-contain" /> : null}
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        <ContactForm source="sekcja kontakt na stronie głównej" topic="eksport CSV lub brakujące dane" compact />
      </div>
    </section>
  );
}
