"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "../ui/Reveal";

type StatItem = {
  value: number | string;
  suffix?: string;
  label: string;
};

type DatabaseStats = {
  total: number;
  categories: number;
  cities: number;
  websites: number;
  phones: number;
  emails: number;
  error?: string | null;
};

const fallbackStats: readonly StatItem[] = [
  { value: "—", label: "firm w darmowej bazie" },
  { value: "—", label: "branż" },
  { value: "—", label: "miast" },
];

function formatCounter(value: number) {
  return new Intl.NumberFormat("pl-PL").format(Math.round(value));
}

function AnimatedNumber({ value, suffix = "" }: { value: number | string; suffix?: string }) {
  const numericValue = typeof value === "number" ? value : Number(value);
  const canAnimate = Number.isFinite(numericValue);
  const [displayValue, setDisplayValue] = useState(canAnimate ? 0 : value);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    hasStarted.current = false;
    setDisplayValue(canAnimate ? 0 : value);
  }, [canAnimate, numericValue, value]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !canAnimate) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayValue(numericValue);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted.current) return;
        hasStarted.current = true;

        const duration = 1150;
        const start = performance.now();
        const target = numericValue;

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(target * eased);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplayValue(target);
          }
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [canAnimate, numericValue]);

  return (
    <div ref={ref} className="text-4xl font-black text-[var(--brand-primary-soft)] md:text-5xl">
      {canAnimate ? formatCounter(Number(displayValue)) : value}
      {suffix}
    </div>
  );
}

function buildStats(stats: DatabaseStats | null): readonly StatItem[] {
  if (!stats) return fallbackStats;

  return [
    { value: stats.total, label: "firm w darmowej bazie" },
    { value: stats.categories, label: "branż" },
    { value: stats.cities, label: "miast" },
  ];
}

export default function Stats() {
  const [databaseStats, setDatabaseStats] = useState<DatabaseStats | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadStats() {
      try {
        const response = await fetch("/api/leads/stats", { cache: "no-store" });
        const json = (await response.json()) as DatabaseStats;

        if (!ignore && response.ok) {
          setDatabaseStats(json);
        }
      } catch {
        if (!ignore) setDatabaseStats(null);
      }
    }

    loadStats();

    return () => {
      ignore = true;
    };
  }, []);

  const stats = buildStats(databaseStats);

  return (
    <section id="stats" className="section brand-section-soft">
      <div className="container">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
            Dane liczone automatycznie
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-.04em] md:text-4xl">
            Aktualny rozmiar bazy LocalLeads
          </h2>
          <p className="mt-4 text-[var(--brand-muted)]">
            Statystyki na stronie głównej są pobierane bezpośrednio z tabeli Supabase <strong>leads</strong>, więc zmieniają się razem z dodawaniem nowych firm.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 110}>
              <div className="rounded-3xl border border-[var(--brand-line)] bg-[var(--brand-surface)]/70 p-7 shadow-[0_20px_55px_rgba(0,0,0,.22)] transition-transform duration-300 hover:-translate-y-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-[var(--brand-muted)]">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
