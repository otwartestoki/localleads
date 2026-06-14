"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { content } from "@/data/content";

export function Gallery({ mode = "full" }: { mode?: "full" | "preview" }) {
  const items = mode === "preview" ? content.gallery.items.slice(0, 6) : content.gallery.items;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) return;
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((activeIndex + 1) % items.length);
      if (event.key === "ArrowLeft") setActiveIndex((activeIndex - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, items.length]);

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Galeria</div>
            <h2>{content.gallery.title}</h2>
            <p className="lead">{content.gallery.description}</p>
          </div>
          {mode === "preview" && <Link className="btn secondary" href="/galeria">Zobacz pełną galerię</Link>}
        </div>

        <div className={`modern-gallery ${mode === "preview" ? "modern-gallery-preview" : ""}`}>
          {items.map((item, index) => (
            <button className={`modern-gallery-card modern-gallery-card-${index + 1}`} type="button" key={item.title} onClick={() => setActiveIndex(index)}>
              <span className={`gallery-photo gallery-photo-${item.image}`} />
              <span className="gallery-card-caption">
                <small>{item.category}</small>
                <strong>{item.title}</strong>
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeItem && activeIndex !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Powiększone zdjęcie">
          <button className="lightbox-backdrop" type="button" onClick={() => setActiveIndex(null)} aria-label="Zamknij galerię" />
          <div className="lightbox-panel">
            <button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Zamknij">×</button>
            <button className="lightbox-nav lightbox-prev" type="button" onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)} aria-label="Poprzednie zdjęcie">‹</button>
            <div className={`lightbox-photo gallery-photo gallery-photo-${activeItem.image}`} />
            <button className="lightbox-nav lightbox-next" type="button" onClick={() => setActiveIndex((activeIndex + 1) % items.length)} aria-label="Następne zdjęcie">›</button>
            <div className="lightbox-caption">
              <small>{activeItem.category}</small>
              <strong>{activeItem.title}</strong>
              <span>{activeIndex + 1} / {items.length}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
