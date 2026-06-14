import Link from 'next/link';
import { site } from '@/config/site';

const legalLinks = [
  { label: 'Regulamin', href: '/regulamin' },
  { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
  { label: 'Polityka cookies', href: '/polityka-cookies' },
];

export default function Footer() {
  const legal = (site as any).legal || {};
  const companyName = legal.companyName || site.brand.name;
  const nip = legal.nip ? `NIP ${legal.nip}` : '';

  return (
    <footer className="relative z-40 border-t border-white/10 bg-[#020617] py-10 text-slate-400">
      <div className="container grid gap-6 text-sm md:grid-cols-[1fr_auto] md:items-start">
        <div className="grid gap-2">
          <p className="font-bold text-white">© {new Date().getFullYear()} {site.brand.name}</p>
          <p>{companyName}{nip ? ` • ${nip}` : ''}</p>
          <p>{legal.address || site.contact.address}</p>
          <p>{site.contact.email} • {site.contact.phone}</p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end" aria-label="Dokumenty prawne">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[var(--brand-primary-soft)]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
