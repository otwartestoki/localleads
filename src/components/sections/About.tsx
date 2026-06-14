import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/config/site';
import { content } from '@/data/content';
import { getButtonClass } from '@/lib/uiStyles';
import { contactHref } from '@/lib/contact';
const ABOUT_IMAGE='/media/about/about-person.webp';
export default function About(){const aboutTitle=content.about?.title||site.about?.title||`O ${site.brand.name}`;const aboutText=content.about?.text||site.about?.text||site.description;return <section id="about" className="section brand-section-dark"><div className="container grid items-center gap-10 md:grid-cols-[1fr_.78fr]"><div><p className="text-sm font-black uppercase tracking-[.22em] text-[var(--brand-primary-soft)]">O LocalLeads</p><h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-.05em] md:text-6xl">{aboutTitle}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--brand-muted)]">{aboutText}</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/o-mnie" className={getButtonClass({tone:'primary'})}>Poznaj podejście</Link><Link href={contactHref({ source: 'sekcja O mnie', topic: 'zamówienie bazy leadów' })} className={getButtonClass({tone:'secondary'})}>Zamów bazę</Link></div></div><div className="rounded-3xl border border-[var(--brand-line)] bg-[var(--brand-surface)]/70 p-3 shadow-[0_24px_70px_rgba(0,0,0,.28)]"><div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-slate-950"><Image src={ABOUT_IMAGE} alt={`O ${site.brand.name}`} fill sizes="(min-width: 768px) 38vw, 100vw" className="object-cover"/></div></div></div></section>}
