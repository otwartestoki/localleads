"use client";

import React, { useEffect, useRef, useState } from "react";

type RevealFrom = "left" | "right" | "up" | "down" | "none" | string;

type RevealProps = {
  children: React.ReactNode;
  from?: RevealFrom;
  className?: string;
  delay?: number;
  threshold?: number;
  once?: boolean;
};

function getFromClass(from: RevealFrom = "up") {
  switch (from) {
    case "left":
      return "reveal-from-left";
    case "right":
      return "reveal-from-right";
    case "down":
      return "reveal-from-down";
    case "none":
      return "reveal-from-none";
    case "up":
    default:
      return "reveal-from-up";
  }
}

export default function Reveal({
  children,
  from = "up",
  className = "",
  delay = 0,
  threshold = 0.08,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -14% 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      className={`reveal ${getFromClass(from)} ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
