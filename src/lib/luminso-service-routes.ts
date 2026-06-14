import { site } from "@/config/site";

type LuminsoService = (typeof site.services)[number];

const FALLBACK_SERVICE_IMAGES = [
  "/media/service-1.webp",
  "/media/service-2.webp",
  "/media/service-3.webp",
  "/media/service-4.webp",
  "/media/service-5.webp",
  "/media/service-6.webp",
];

export function getServices(): LuminsoService[] {
  return [...site.services];
}

export function slugifyService(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getServiceSlug(service: LuminsoService, index?: number): string {
  const explicitSlug = "slug" in service ? service.slug : undefined;

  if (typeof explicitSlug === "string" && explicitSlug.trim().length > 0) {
    return explicitSlug;
  }

  const title = "title" in service ? service.title : undefined;

  if (typeof title === "string" && title.trim().length > 0) {
    return slugifyService(title);
  }

  return `usluga-${typeof index === "number" ? index + 1 : 1}`;
}

export function getServiceSlugs(): string[] {
  return getServices().map((service, index) => getServiceSlug(service, index));
}

export function findServiceBySlug(slug: string): { service: LuminsoService; index: number } | undefined {
  return getServices()
    .map((service, index) => ({ service, index }))
    .find(({ service, index }) => getServiceSlug(service, index) === slug);
}

export function getServiceBySlug(slug: string): LuminsoService | undefined {
  return findServiceBySlug(slug)?.service;
}

export function getServiceImage(service: LuminsoService, index?: number): string {
  const possibleImage =
    ("image" in service && typeof service.image === "string" ? service.image : undefined) ||
    ("imageSrc" in service && typeof service.imageSrc === "string" ? service.imageSrc : undefined) ||
    ("media" in service && typeof service.media === "string" ? service.media : undefined);

  if (possibleImage && possibleImage.trim().length > 0) {
    return possibleImage;
  }

  const safeIndex = typeof index === "number" && index >= 0 ? index : 0;
  return FALLBACK_SERVICE_IMAGES[safeIndex % FALLBACK_SERVICE_IMAGES.length];
}
