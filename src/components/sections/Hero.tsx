"use client";

import Image from 'next/image';
import Link from 'next/link';

import { content } from '@/config/content';
import { media } from '@/config/media';
import { preset } from '@/config/presets';
import { site } from '@/config/site';
import { getButtonClass } from '@/lib/uiStyles';
import { contactHref } from '@/lib/contact';

type HeroPreset = {
  eyebrowStyle?: 'line' | 'pill' | 'plain';
  image?: string;
  imageAlt?: string;
  heroVariant?: string;
  variant?: string;
  heroFixedCover?: FixedCoverOptions;
};

type FixedCoverOptions = {
  enabled?: boolean;
  height?: string;
  overlayStrength?: number;
  imageScale?: number;
};

type FlexiblePreset = {
  heroVariant?: string;
  heroFixedCover?: FixedCoverOptions;
  layout?: {
    heroVariant?: string;
  };
  hero?: HeroPreset;
  eyebrowStyle?: 'line' | 'pill' | 'plain';
};

type CtaValue =
  | string
  | {
      label?: string;
      href?: string;
    }
  | undefined;

const flexiblePreset = preset as FlexiblePreset;
const heroPreset = (preset.hero || {}) as HeroPreset;

function getCta(value: CtaValue, fallbackLabel: string, fallbackHref: string) {
  if (typeof value === 'string') {
    return {
      label: value,
      href: fallbackHref,
    };
  }

  return {
    label: value?.label || fallbackLabel,
    href: value?.href || fallbackHref,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getHeroVariant() {
  return (
    flexiblePreset.heroVariant ||
    flexiblePreset.layout?.heroVariant ||
    heroPreset.heroVariant ||
    heroPreset.variant ||
    'background-photo'
  );
}

function getFixedCoverOptions(): FixedCoverOptions {
  return flexiblePreset.heroFixedCover || heroPreset.heroFixedCover || {};
}

function isFixedCover() {
  const options = getFixedCoverOptions();
  const variant = getHeroVariant();

  return variant === 'fixed-cover' || variant === 'cover-scroll' || options.enabled === true;
}

function getHeroImage() {
  return heroPreset.image || media.images.hero || '/media/hero.webp';
}

function getHeroImageAlt() {
  return (
    heroPreset.imageAlt ||
    media.logo?.alt ||
    site.business?.name ||
    site.name ||
    'Hero image'
  );
}

function getHeroContent() {
  return content.hero as {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta?: CtaValue;
    primaryHref?: string;
    secondaryCta?: CtaValue;
    secondaryHref?: string;
  };
}

function getHeroCtas() {
  const heroContent = getHeroContent();

  const primaryCta = getCta(
    heroContent.primaryCta,
    'Przeglądaj bazę firm',
    heroContent.primaryHref && heroContent.primaryHref !== '/kontakt' ? heroContent.primaryHref : contactHref({ source: 'hero', topic: 'eksport CSV lub brakujące dane' }),
  );

  const secondaryCta = getCta(
    heroContent.secondaryCta,
    'Skontaktuj się',
    heroContent.secondaryHref || '/kontakt',
  );

  return { primaryCta, secondaryCta };
}

function getEyebrowStyle() {
  return heroPreset.eyebrowStyle || flexiblePreset.eyebrowStyle || 'plain';
}

function Eyebrow({ light = false }: { light?: boolean }) {
  const style = getEyebrowStyle();

  if (style === 'line') {
    return (
      <div
        className={`mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[.2em] ${
          light ? 'text-[var(--brand-primary-soft)]' : 'text-[var(--brand-primary-soft)]'
        }`}
      >
        <span className="h-px w-12 bg-current" />
        <span>{content.hero.eyebrow}</span>
      </div>
    );
  }

  if (style === 'pill') {
    return (
      <div
        className="mb-5 inline-flex rounded-full px-4 py-2 text-sm font-black uppercase tracking-[.18em]"
        style={{
          backgroundColor: 'rgba(56,189,248,.10)',
          color: 'var(--brand-primary-soft)',
        }}
      >
        {content.hero.eyebrow}
      </div>
    );
  }

  return (
    <p
      className="mb-5 text-sm font-black uppercase tracking-[.2em]"
      style={{ color: 'var(--brand-primary-soft)' }}
    >
      {content.hero.eyebrow}
    </p>
  );
}

function HeroFixedCover() {
  const heroContent = getHeroContent();
  const { primaryCta, secondaryCta } = getHeroCtas();

  const image = getHeroImage();
  const imageAlt = getHeroImageAlt();

  const options = getFixedCoverOptions();
  const height = String(options.height ?? '100vh');
  const overlayStrength = clamp(Number(options.overlayStrength ?? 0.58), 0, 0.85);
  const imageScale = Number(options.imageScale ?? 1.04);

  return (
    <section id="top" className="relative z-0" style={{ height }}>
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ transform: `scale(${imageScale})` }}
        />
        <div className="absolute inset-0 bg-slate-950" style={{ opacity: overlayStrength }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/86 via-slate-950/48 to-slate-950/14" />

        <div className="container relative z-10 flex h-full items-center py-24 text-white">
          <div className="max-w-3xl">
            <Eyebrow light />

            <h1 className="text-5xl font-black tracking-[-.06em] md:text-7xl">
              {heroContent.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              {heroContent.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryCta.href} className={getButtonClass({ tone: 'primary' })}>
                {primaryCta.label}
              </Link>

              <Link href={secondaryCta.href} className={getButtonClass({ tone: 'secondary' })}>
                {secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const heroContent = getHeroContent();
  const { primaryCta, secondaryCta } = getHeroCtas();
  const image = getHeroImage();
  const imageAlt = getHeroImageAlt();

  const variant = getHeroVariant();

  if (isFixedCover()) {
    return <HeroFixedCover />;
  }

  if (variant === 'background-photo' || variant === 'background' || variant === 'hero-background') {
    return (
      <section id="top" className="relative flex min-h-[90vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/10" />
        </div>

        <div className="container relative z-10 py-24 text-white">
          <div className="max-w-3xl">
            <Eyebrow light />

            <h1 className="text-5xl font-black tracking-[-.06em] md:text-7xl">
              {heroContent.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              {heroContent.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryCta.href} className={getButtonClass({ tone: 'primary' })}>
                {primaryCta.label}
              </Link>

              <Link href={secondaryCta.href} className={getButtonClass({ tone: 'secondary' })}>
                {secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section hero-section bg-[var(--soft)]" id="top">
      <div className="container grid items-center gap-10 md:grid-cols-[1.05fr_.95fr]">
        <div>
          <Eyebrow />

          <h1 className="max-w-4xl text-5xl font-black tracking-[-.06em] md:text-7xl">
            {heroContent.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 opacity-75">
            {heroContent.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryCta.href} className={getButtonClass({ tone: 'primary' })}>
              {primaryCta.label}
            </Link>

            <Link href={secondaryCta.href} className={getButtonClass({ tone: 'secondary' })}>
              {secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="card overflow-hidden rounded-[var(--radius)] p-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius)-.5rem)] bg-[var(--secondary)]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
