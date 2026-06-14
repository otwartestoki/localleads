"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import { media } from "@/config/media";
import { getButtonClass } from "@/lib/uiStyles";
import { contactHref } from "@/lib/contact";

function getLogoSrc() {
  const logo = media?.logo as any;
  return logo?.light || logo?.dark || "/media/brand/logo.png";
}

function getCompanyName() {
  return (site as any)?.brand?.name || (site as any)?.name || "LocalLeads";
}

function getNavigationItems() {
  const pages = ((site as any)?.pages ?? {}) as Record<string, any>;
  const blogEnabled = (site as any)?.blog?.enabled === true || pages.blog?.enabled === true;

  const pageOrder = [
    "landing",
    "services",
    "pricing",
    "about",
    "gallery",
    "blog",
    "faq",
    "contact",
  ];

  const items = pageOrder
    .map((key) => {
      const page = pages[key];
      if (!page) return null;
      if (key === "blog" && !blogEnabled) return null;
      if (key !== "blog" && page.enabled === false) return null;
      return {
        label: page.label || (key === "landing" ? "Start" : key),
        href: page.href || (key === "landing" ? "/" : `/${key}`),
      };
    })
    .filter(Boolean) as Array<{ label: string; href: string }>;

  if (items.length > 0) return items;

  return [
    { label: "Start", href: "/" },
    { label: "Oferta", href: "/uslugi" },
    { label: "Cennik", href: "/cennik" },
    { label: "O mnie", href: "/o-mnie" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontakt", href: "/kontakt" },
  ];
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const nav = getNavigationItems();
  const name = getCompanyName();
  const ctaLabel = (site as any)?.navigation?.cta?.label || (site as any)?.ctaLabel || "Zamów CSV";
  const ctaHref = contactHref({ source: "nagłówek", topic: "zamówienie bazy leadów CSV" });

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--brand-line)] bg-[var(--brand-bg)]/90 text-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex min-h-16 items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3" aria-label={`${name} — strona główna`} onClick={() => setIsOpen(false)}>
            <img src={getLogoSrc()} alt={name} className="h-10 w-auto max-w-[190px] object-contain md:h-11" />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-[var(--brand-muted)] md:flex" aria-label="Menu główne">
            {nav.map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} className="transition hover:text-[var(--brand-primary-soft)]">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href={ctaHref} className={getButtonClass({ tone: "primary", className: "hidden shrink-0 md:inline-flex" })}>
            {ctaLabel}
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[var(--brand-primary)]/35 bg-[var(--brand-primary)]/10 px-4 py-2 text-sm font-bold text-[var(--brand-primary-soft)] md:hidden"
            aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? "Zamknij" : "Menu"}
          </button>
        </div>

        {isOpen ? (
          <nav className="grid gap-2 border-t border-white/10 py-4 md:hidden">
            {nav.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-base font-bold text-[var(--brand-muted)] hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href={ctaHref} className={getButtonClass({ tone: "primary", className: "mt-2 w-full" })} onClick={() => setIsOpen(false)}>
              {ctaLabel}
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
