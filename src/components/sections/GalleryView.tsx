"use client";

import { ChevronLeft, ChevronRight, Grid3X3, Images, Maximize2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import Reveal from "../ui/Reveal";
import { radiusClass } from "@/lib/style";
import { getButtonClass } from "@/lib/uiStyles";

type GalleryItem = {
  src: string;
  title?: string;
  category?: string;
  description?: string;
  alt?: string;
};

type GallerySettings = {
  layout?: string;
  columns?: number;
  aspect?: string;
  showCaptions?: boolean;
  showCategories?: boolean;
  enableLightbox?: boolean;
  enableFilters?: boolean;
};

const aspectClass: Record<string, string> = {
  square: "aspect-square",
  photo: "aspect-[4/3]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/10]",
  portrait: "aspect-[3/4]",
};

function normalizeItems(images: string[], items?: Partial<GalleryItem>[]): GalleryItem[] {
  return images.map((src, index) => ({
    src,
    title: items?.[index]?.title || `Zdjęcie ${index + 1}`,
    category: items?.[index]?.category || "Galeria",
    description: items?.[index]?.description || "",
    alt: items?.[index]?.alt || items?.[index]?.title || `Zdjęcie ${index + 1}`,
  }));
}

export default function GalleryView({
  images,
  items,
  settings,
  title = "Galeria",
  description = "Zdjęcia, realizacje albo przykłady efektów.",
  compact = false,
}: {
  images: string[];
  items?: Partial<GalleryItem>[];
  settings?: GallerySettings;
  title?: string;
  description?: string;
  compact?: boolean;
}) {
  const galleryItems = useMemo(() => normalizeItems(images, items), [images, items]);
  const layout = ["featured", "masonry", "grid", "slider"].includes(settings?.layout || "") ? settings?.layout || "featured" : "featured";
  const aspect = ["square", "photo", "landscape", "wide", "portrait"].includes(settings?.aspect || "")
    ? settings?.aspect || "photo"
    : "photo";
  const safeSettings: Required<GallerySettings> = {
    layout,
    columns: [2, 3, 4].includes(settings?.columns || 0) ? settings?.columns || 3 : 3,
    aspect,
    showCaptions: settings?.showCaptions ?? true,
    showCategories: settings?.showCategories ?? true,
    enableLightbox: settings?.enableLightbox ?? true,
    enableFilters: settings?.enableFilters ?? true,
  };
  const [open, setOpen] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const railRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(galleryItems.map((item) => item.category || "Galeria")));
    return ["Wszystkie", ...unique];
  }, [galleryItems]);

  const visibleItems = activeCategory === "Wszystkie" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory);

  const move = (direction: number) => {
    setOpen((current) => {
      if (!visibleItems.length) return null;
      if (current === null) return 0;
      return (current + direction + visibleItems.length) % visibleItems.length;
    });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (open === null) return;
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, visibleItems.length]);

  const handleRailMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (!railRef.current) return;
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    dragStartXRef.current = event.pageX;
    dragStartScrollLeftRef.current = railRef.current.scrollLeft;
  };

  const handleRailMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !railRef.current) return;
    event.preventDefault();
    const delta = event.pageX - dragStartXRef.current;
    if (Math.abs(delta) > 6) dragMovedRef.current = true;
    railRef.current.scrollLeft = dragStartScrollLeftRef.current - delta;
  };

  const stopRailDrag = () => {
    isDraggingRef.current = false;
    window.setTimeout(() => {
      dragMovedRef.current = false;
    }, 80);
  };

  const openLightbox = (index: number) => {
    if (dragMovedRef.current) return;
    if (safeSettings.enableLightbox) setOpen(index);
  };

  const columnsClass = safeSettings.columns === 4 ? "lg:grid-cols-4" : safeSettings.columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  const cardAspect = aspectClass[safeSettings.aspect] || aspectClass.photo;

  const GalleryCard = ({ item, index, featured = false, slider = false }: { item: GalleryItem; index: number; featured?: boolean; slider?: boolean }) => (
    <button
      type="button"
      onClick={() => openLightbox(index)}
      className={`group relative w-full overflow-hidden text-left ${radiusClass()} border border-white/10 bg-slate-900/70 shadow-[0_24px_70px_rgba(0,0,0,.22)] transition hover:-translate-y-1 hover:border-sky-300/35 ${featured ? "h-full min-h-[360px]" : ""}`}
    >
      <div className={`relative overflow-hidden bg-[var(--secondary)] ${featured ? "h-full min-h-[360px]" : cardAspect}`}>
        <img src={item.src} alt={item.alt || item.title || "Galeria"} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-80" />
        {safeSettings.enableLightbox && (
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-white opacity-0 shadow-sm transition group-hover:opacity-100">
            <Maximize2 size={18} />
          </span>
        )}
        {safeSettings.showCaptions && (
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            {safeSettings.showCategories && item.category && <p className="text-xs font-black uppercase tracking-[.18em] opacity-80">{item.category}</p>}
            <h3 className="mt-1 text-lg font-black leading-tight">{item.title}</h3>
            {item.description && <p className="mt-2 line-clamp-2 text-sm leading-6 opacity-85">{item.description}</p>}
          </div>
        )}
      </div>
    </button>
  );

  return (
    <div>
      <div className={compact ? "" : "max-w-3xl"}>
        <Reveal>
          <p className="text-sm font-black uppercase tracking-[.2em]" style={{ color: "var(--primary)" }}>
            Galeria
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-.04em] md:text-5xl">{title}</h2>
          {description && <p className="mt-4 text-lg leading-8 opacity-75">{description}</p>}
        </Reveal>
      </div>

      {safeSettings.enableFilters && categories.length > 2 && safeSettings.layout !== "slider" && (
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={getButtonClass({ tone: activeCategory === category ? "primary" : "secondary", className: "px-4 py-2 text-sm" })}
              style={activeCategory === category ? { background: "var(--primary)" } : undefined}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {safeSettings.layout === "slider" ? (
        <div className="mt-8 mx-auto max-w-4xl">
          <div
            ref={railRef}
            onMouseDown={handleRailMouseDown}
            onMouseMove={handleRailMouseMove}
            onMouseUp={stopRailDrag}
            onMouseLeave={stopRailDrag}
            className="flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {visibleItems.map((item, index) => (
              <div key={`${item.src}-${index}`} className="w-full shrink-0 snap-center">
                <GalleryCard item={item} index={index} slider />
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[.18em] opacity-45">Przesuń galerię w bok</p>
        </div>
      ) : safeSettings.layout === "featured" && visibleItems.length > 0 ? (
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 lg:row-span-2">
            <Reveal><GalleryCard item={visibleItems[0]} index={0} featured /></Reveal>
          </div>
          {visibleItems.slice(1, 5).map((item, idx) => (
            <Reveal key={`${item.src}-${idx}`} from={idx % 2 ? "right" : "left"}>
              <GalleryCard item={item} index={idx + 1} />
            </Reveal>
          ))}
        </div>
      ) : safeSettings.layout === "masonry" ? (
        <div className={`mt-8 columns-1 gap-4 sm:columns-2 ${safeSettings.columns === 4 ? "lg:columns-4" : safeSettings.columns === 2 ? "lg:columns-2" : "lg:columns-3"}`}>
          {visibleItems.map((item, index) => (
            <div key={`${item.src}-${index}`} className="mb-4 break-inside-avoid">
              <Reveal><GalleryCard item={item} index={index} /></Reveal>
            </div>
          ))}
        </div>
      ) : (
        <div className={`mt-8 grid gap-4 sm:grid-cols-2 ${columnsClass}`}>
          {visibleItems.map((item, index) => (
            <Reveal key={`${item.src}-${index}`} from={index % 2 ? "right" : "left"}>
              <GalleryCard item={item} index={index} />
            </Reveal>
          ))}
        </div>
      )}

      {open !== null && visibleItems[open] && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4">
          <button className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white" onClick={() => setOpen(null)}><X size={30} /></button>
          <button className="absolute left-4 rounded-full bg-white/10 p-3 text-white md:left-10" onClick={() => move(-1)}><ChevronLeft size={38} /></button>
          <figure className="flex w-full max-w-6xl flex-col items-center">
            <div className={`${radiusClass()} max-h-[78vh] max-w-full overflow-hidden bg-transparent`}>
              <img
                src={visibleItems[open].src}
                alt={visibleItems[open].alt || visibleItems[open].title || "Galeria"}
                className="block max-h-[78vh] max-w-full object-contain"
              />
            </div>
            {safeSettings.showCaptions && (
              <figcaption className="mt-4 text-center text-white">
                <p className="font-black">{visibleItems[open].title}</p>
                {visibleItems[open].description && <p className="mt-1 opacity-80">{visibleItems[open].description}</p>}
              </figcaption>
            )}
          </figure>
          <button className="absolute right-4 rounded-full bg-white/10 p-3 text-white md:right-10" onClick={() => move(1)}><ChevronRight size={38} /></button>
        </div>
      )}
    </div>
  );
}
