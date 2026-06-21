export type LandingSectionType =
  | 'hero'
  | 'partners'
  | 'stats'
  | 'services'
  | 'about'
  | 'process'
  | 'beforeAfter'
  | 'gallery'
  | 'blog'
  | 'reviews'
  | 'faq'
  | 'cta'
  | 'map'
  | 'contact';

export type StandalonePageType = 'about' | 'services' | 'pricing' | 'gallery' | 'blog' | 'faq' | 'contact';

export const landingSections = [
  {
    "type": "hero",
    "enabled": true,
    "navLabel": "Hero",
    "anchor": "hero"
  },
  {
    "type": "stats",
    "enabled": true,
    "navLabel": "Stats",
    "anchor": "stats"
  },
  {
    "type": "services",
    "enabled": true,
    "navLabel": "Services",
    "anchor": "services"
  },
  {
    "type": "process",
    "enabled": true,
    "navLabel": "Process",
    "anchor": "process"
  },
  {
    "type": "about",
    "enabled": true,
    "navLabel": "About",
    "anchor": "about"
  },
  {
    "type": "gallery",
    "enabled": false,
    "navLabel": "Gallery",
    "anchor": "gallery"
  },
  {
    "type": "faq",
    "enabled": true,
    "navLabel": "Faq",
    "anchor": "faq"
  },
  {
    "type": "cta",
    "enabled": true,
    "navLabel": "Cta",
    "anchor": "cta"
  },
  {
    "type": "contact",
    "enabled": true,
    "navLabel": "Contact",
    "anchor": "contact"
  }
] as const;
export const standalonePages = [
  {
    "type": "about",
    "enabled": true,
    "href": "/o-mnie",
    "path": "/o-mnie",
    "label": "O mnie",
    "navLabel": "O mnie"
  },
  {
    "type": "services",
    "enabled": true,
    "href": "/oferta",
    "path": "/oferta",
    "label": "Oferta",
    "navLabel": "Oferta"
  },
  {
    "type": "pricing",
    "enabled": false,
    "href": "/kontakt",
    "path": "/kontakt",
    "label": "Kontakt",
    "navLabel": "Kontakt"
  },
  {
    "type": "gallery",
    "enabled": false,
    "href": "/galeria",
    "path": "/galeria",
    "label": "Przykłady",
    "navLabel": "Przykłady"
  },
  {
    "type": "blog",
    "enabled": true,
    "href": "/blog",
    "path": "/blog",
    "label": "Blog",
    "navLabel": "Blog"
  },
  {
    "type": "faq",
    "enabled": true,
    "href": "/faq",
    "path": "/faq",
    "label": "FAQ",
    "navLabel": "FAQ"
  },
  {
    "type": "contact",
    "enabled": true,
    "href": "/kontakt",
    "path": "/kontakt",
    "label": "Kontakt",
    "navLabel": "Kontakt"
  }
] as const;
export const navigation = {
  "menuStyle": "dark",
  "menuLayout": "default",
  "logoMode": "mark-text",
  "logoHref": "/",
  "showCtaInHeader": true,
  "cta": {
    "label": "Zgłoś brakujące dane",
    "href": "/kontakt"
  },
  "items": [
    {
      "label": "Start",
      "href": "/#hero",
      "enabled": true
    },
    {
      "label": "Oferta",
      "href": "/uslugi",
      "enabled": true
    },
    {
      "label": "Kontakt",
      "href": "/kontakt",
      "enabled": true
    },
    {
      "label": "O mnie",
      "href": "/o-mnie",
      "enabled": true
    },
    {
      "label": "FAQ",
      "href": "/faq",
      "enabled": true
    },
    {
      "label": "Kontakt",
      "href": "/kontakt",
      "enabled": true,
      "highlight": true
    }
  ],
  "showLandingSectionsInMenu": false,
  "maxLandingLinks": 4,
  "showStandalonePagesInMenu": true,
  "ctaHref": "/kontakt"
} as const;
