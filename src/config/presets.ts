export type IndustryPreset = {
  id: string;
  name: string;
  layout: {
    heroVariant: "image-card" | "split-photo" | "editorial" | "bold-banner" | "background-photo" | "framed-parallax";
    sectionBackgrounds: "soft-shapes" | "diagonal" | "cards" | "photo-panels";
    serviceCardVariant: "classic" | "numbered" | "image" | "compact";
    galleryVariant: "grid" | "masonry" | "before-after";
    sectionOrder: string[];
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  hero: {
    image: string;
    eyebrow: string;
  };
};

export const presets: Record<string, IndustryPreset> = {
  universal: {
    id: "universal",
    name: "Uniwersalny lokalny biznes",
    layout: {
      heroVariant: "image-card",
      sectionBackgrounds: "soft-shapes",
      serviceCardVariant: "classic",
      galleryVariant: "grid",
      sectionOrder: ["hero", "logos", "services", "stats", "beforeAfter", "reviews", "gallery", "faq", "contact"],
    },
    theme: {
      primary: "#38bdf8",
      secondary: "#f1f5f9",
      accent: "#f59e0b",
      background: "#ffffff",
      foreground: "#020617",
    },
    hero: {
      image: "/media/hero.webp",
      eyebrow: "Nowoczesna strona firmowa",
    },
  },
  beauty: {
    id: "beauty",
    name: "Beauty / kosmetologia",
    layout: {
      heroVariant: "editorial",
      sectionBackgrounds: "photo-panels",
      serviceCardVariant: "image",
      galleryVariant: "before-after",
      sectionOrder: ["hero", "services", "beforeAfter", "reviews", "gallery", "logos", "stats", "faq", "contact"],
    },
    theme: {
      primary: "#be7c74",
      secondary: "#f8ede9",
      accent: "#8f5f58",
      background: "#fffaf8",
      foreground: "#2f2523",
    },
    hero: {
      image: "/media/hero.webp",
      eyebrow: "Spokojna, elegancka prezentacja usług",
    },
  },
  dental: {
    id: "dental",
    name: "Gabinet stomatologiczny / medyczny",
    layout: {
      heroVariant: "split-photo",
      sectionBackgrounds: "cards",
      serviceCardVariant: "compact",
      galleryVariant: "grid",
      sectionOrder: ["hero", "stats", "services", "reviews", "logos", "gallery", "faq", "contact"],
    },
    theme: {
      primary: "#0ea5e9",
      secondary: "#e0f2fe",
      accent: "#14b8a6",
      background: "#f8fbff",
      foreground: "#0f172a",
    },
    hero: {
      image: "/media/hero.webp",
      eyebrow: "Profesjonalny gabinet blisko Ciebie",
    },
  },
  automotive: {
    id: "automotive",
    name: "Serwis samochodowy",
    layout: {
      heroVariant: "bold-banner",
      sectionBackgrounds: "diagonal",
      serviceCardVariant: "numbered",
      galleryVariant: "masonry",
      sectionOrder: ["hero", "services", "stats", "gallery", "reviews", "logos", "faq", "contact"],
    },
    theme: {
      primary: "#dc2626",
      secondary: "#020617",
      accent: "#f97316",
      background: "#0b0f19",
      foreground: "#f9fafb",
    },
    hero: {
      image: "/media/hero.webp",
      eyebrow: "Konkretny serwis dla wymagających klientów",
    },
  },
};

const selectedPreset = process.env.NEXT_PUBLIC_LUMINSO_PRESET || "universal";

export const activePreset = presets[selectedPreset] ?? presets.universal;

// Compatibility export for newer section components.
// Keep this object shape aligned with src/config/site.ts.
export { preset } from "./site";
