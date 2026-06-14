"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/config/site";
import Reveal from "../ui/Reveal";

type StatItem = {
  value: number | string;
  suffix?: string;
  label: string;
};

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

export default function Stats() {
  const stats = useMemo(() => site.stats as readonly StatItem[], []);

  return (
    <section id="stats" className="section brand-section-soft">
      <div className="container grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 110}>
            <div className="rounded-3xl border border-[var(--brand-line)] bg-[var(--brand-surface)]/70 p-7 shadow-[0_20px_55px_rgba(0,0,0,.22)] transition-transform duration-300 hover:-translate-y-1">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-[var(--brand-muted)]">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
