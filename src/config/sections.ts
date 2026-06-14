import { preset } from './site';
import type { LandingSectionType } from './template';

export const sectionVisibility: Record<LandingSectionType, boolean> = {
  "hero": true,
  "partners": false,
  "stats": true,
  "services": true,
  "about": true,
  "process": true,
  "beforeAfter": false,
  "gallery": false,
  "blog": true,
  "reviews": false,
  "faq": true,
  "cta": true,
  "map": false,
  "contact": true,
};

export const sections = (preset.sectionOrder as readonly LandingSectionType[])
  .filter((type) => type in sectionVisibility)
  .map((type) => ({ type, enabled: sectionVisibility[type] }));
