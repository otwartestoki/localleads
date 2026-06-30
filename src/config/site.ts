export const preset = {
  "name": "LocalLeads premium dark",
  "description": "Ciemna strona sprzedażowa dla baz leadów CSV.",
  "radius": "rounded",
  "decorative": "gradient",
  "heroVariant": "fixed-cover",
  "heroFixedCover": {
    "enabled": true,
    "height": "100vh",
    "overlayStrength": 0.48,
    "imageScale": 1.02
  },
  "eyebrowStyle": "line",
  "serviceCardVariant": "classic",
  "galleryVariant": "square",
  "gallery": {
    "layout": "featured",
    "columns": 3,
    "aspect": "landscape",
    "showCaptions": true,
    "showCategories": true,
    "enableLightbox": true,
    "enableFilters": false
  },
  "galleryPage": {
    "layout": "masonry",
    "columns": 3,
    "aspect": "wide",
    "showCaptions": true,
    "showCategories": true,
    "enableLightbox": true,
    "enableFilters": true
  },
  "sectionOrder": [
    "hero",
    "stats",
    "services",
    "process",
    "about",
    "gallery",
    "faq",
    "cta",
    "contact"
  ],
  "sectionBackgrounds": {
    "hero": "bg-[#020617]",
    "stats": "bg-[#06111f]",
    "services": "bg-[#020617]",
    "process": "bg-[#06111f]",
    "about": "bg-[#020617]",
    "beforeAfter": "bg-[#06111f]",
    "gallery": "bg-[#020617]",
    "blog": "bg-[#06111f]",
    "reviews": "bg-[#06111f]",
    "faq": "bg-[#020617]",
    "cta": "bg-[#06111f]",
    "map": "bg-[#020617]",
    "contact": "bg-[#06111f]"
  },
  "hero": {
    "image": "/media/hero.webp",
    "imageAlt": "LocalLeads — baza leadów firmowych CSV"
  }
} as const;

export const site = {
  "business": {
    "name": "LocalLeads",
    "type": "baza leadów B2B CSV",
    "city": "Polska",
    "address": "cała Polska",
    "phone": "+48 506 105 098",
    "email": "kontakt@localleads.pl",
    "logoText": "LL",
    "facebookUrl": "",
    "instagramUrl": "",
    "whatsappUrl": "",
    "messengerUrl": ""
  },
  "description": "LocalLeads to darmowa baza firm do przeglądania i filtrowania. Pomaga agencjom, handlowcom i twórcom stron szybciej znaleźć lokalne firmy. Jeśli brakuje konkretnej branży albo miasta, napisz na kontakt@localleads.pl lub przez formularz.",
  "ctaLabel": "Przeglądaj bazę firm",
  "theme": {
    "primary": "#38bdf8",
    "secondary": "#1e40af",
    "accent": "#8b5cf6",
    "background": "#020617",
    "foreground": "#eef6ff",
    "buttonStyle": "rounded",
    "buttonRadius": "rounded",
    "buttonShadow": "soft",
    "inputStyle": "minimal",
    "inputRadius": "rounded",
    "inputShadow": "none"
  },
  "preset": {
    "name": "LocalLeads premium dark",
    "description": "Ciemna strona sprzedażowa dla baz leadów CSV.",
    "radius": "rounded",
    "decorative": "gradient",
    "heroVariant": "fixed-cover",
    "heroFixedCover": {
      "enabled": true,
      "height": "100vh",
      "overlayStrength": 0.48,
      "imageScale": 1.02
    },
    "eyebrowStyle": "line",
    "serviceCardVariant": "classic",
    "galleryVariant": "square",
    "gallery": {
      "layout": "featured",
      "columns": 3,
      "aspect": "landscape",
      "showCaptions": true,
      "showCategories": true,
      "enableLightbox": true,
      "enableFilters": false
    },
    "galleryPage": {
      "layout": "masonry",
      "columns": 3,
      "aspect": "wide",
      "showCaptions": true,
      "showCategories": true,
      "enableLightbox": true,
      "enableFilters": true
    },
    "sectionOrder": [
      "hero",
      "stats",
      "services",
      "process",
      "about",
      "gallery",
      "faq",
      "cta",
      "contact"
    ],
    "sectionBackgrounds": {
      "hero": "bg-[#020617]",
      "stats": "bg-[#06111f]",
      "services": "bg-[#020617]",
      "process": "bg-[#06111f]",
      "about": "bg-[#020617]",
      "beforeAfter": "bg-[#06111f]",
      "gallery": "bg-[#020617]",
      "blog": "bg-[#06111f]",
      "reviews": "bg-[#06111f]",
      "faq": "bg-[#020617]",
      "cta": "bg-[#06111f]",
      "map": "bg-[#020617]",
      "contact": "bg-[#06111f]"
    },
    "hero": {
      "image": "/media/hero.webp",
      "imageAlt": "LocalLeads — baza leadów firmowych CSV"
    }
  },
  "media": {
    "logo": {
      "light": "/media/brand/logo.png",
      "dark": "/media/brand/logo.png",
      "alt": "Logo LocalLeads"
    },
    "openGraph": {
      "default": "/media/hero.webp"
    },
    "images": {
      "hero": "/media/hero.webp",
      "about": "/media/about.webp",
      "services": "/media/hero.webp",
      "pricing": "/media/pricing.webp",
      "contact": "/media/contact.webp",
      "before": "/media/before.webp",
      "after": "/media/after.webp"
    },
    "gallery": [
      "/media/gallery-1.webp",
      "/media/gallery-2.webp",
      "/media/gallery-3.webp"
    ]
  },
  "sections": {
    "order": [
      "hero",
      "stats",
      "services",
      "process",
      "about",
      "gallery",
      "faq",
      "cta",
      "contact"
    ],
    "enabled": {
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
      "contact": true
    },
    "backgrounds": {
      "hero": "bg-[#020617]",
      "stats": "bg-[#06111f]",
      "services": "bg-[#020617]",
      "process": "bg-[#06111f]",
      "about": "bg-[#020617]",
      "beforeAfter": "bg-[#06111f]",
      "gallery": "bg-[#020617]",
      "blog": "bg-[#06111f]",
      "reviews": "bg-[#06111f]",
      "faq": "bg-[#020617]",
      "cta": "bg-[#06111f]",
      "map": "bg-[#020617]",
      "contact": "bg-[#06111f]"
    }
  },
  "pages": {
    "landing": {
      "enabled": true,
      "href": "/",
      "label": "Start"
    },
    "about": {
      "enabled": true,
      "href": "/o-mnie",
      "label": "O mnie",
      "title": "O LocalLeads",
      "subtitle": "Buduję praktyczne bazy leadów dla firm, które chcą szybciej znaleźć klientów, partnerów lub lokalne kontakty biznesowe.",
      "lead": "LocalLeads powstało z potrzeby uporządkowania procesu szukania firm: bez przypadkowych list, pustych rekordów i danych, których nikt nie weryfikuje.",
      "blocks": []
    },
    "services": {
      "enabled": true,
      "href": "/oferta",
      "label": "Oferta",
      "title": "Darmowa baza firm",
      "subtitle": "Korzystasz z otwartej bazy na stronie. Jeśli brakuje branży lub miasta, zgłaszasz to przez formularz albo kontakt@localleads.pl."
    },
    "database": {
      "enabled": true,
      "href": "/baza-firm",
      "label": "Baza firm",
      "title": "Darmowa baza firm",
      "subtitle": "Przeglądaj i filtruj firmy z bazy online."
    },
    "localCatalog": {
      "enabled": true,
      "href": "/katalog-firm",
      "label": "Katalog lokalny",
      "title": "Katalog lokalny",
      "subtitle": "Znajdź firmy najbliżej wybranej lokalizacji."
    },
    "index": {
      "enabled": true,
      "href": "/indeks-bazy",
      "label": "Indeks bazy",
      "title": "Indeks bazy firm",
      "subtitle": "Automatyczny indeks branż i miast tworzony z kolumn category oraz city."
    },
    "pricing": {
      "enabled": false,
      "href": "/kontakt",
      "label": "Kontakt",
      "title": "Zgłoś brakujące dane",
      "subtitle": "Jeśli w darmowej bazie brakuje branży, miasta lub zakresu danych, napisz do LocalLeads.",
      "intro": "Podaj branżę, miasto lub region oraz krótki opis tego, czego szukasz.",
      "packages": []
    },
    "gallery": {
      "enabled": false,
      "href": "/galeria",
      "label": "Przykłady",
      "title": "Przykłady danych i zasięgu",
      "subtitle": "Zobacz przykładowe dane i pokrycie miast w Polsce."
    },
    "blog": {
      "enabled": true,
      "href": "/blog",
      "label": "Blog",
      "title": "Wiedza o leadach B2B",
      "subtitle": "Poradniki o prospektingu, lokalnym SEO i sprzedaży B2B."
    },
    "faq": {
      "enabled": true,
      "href": "/faq",
      "label": "FAQ",
      "title": "Najczęstsze pytania",
      "subtitle": "Najważniejsze informacje o darmowej bazie i zgłaszaniu brakujących danych."
    },
    "contact": {
      "enabled": true,
      "href": "/kontakt",
      "label": "Kontakt",
      "title": "Brakujące dane i kontakt",
      "subtitle": "Napisz, jeśli brakuje konkretnej branży, miasta albo chcesz zgłosić błąd w bazie."
    }
  },
  "navigation": {
    "menuStyle": "dark",
    "logoMode": "mark-text",
    "logoHref": "",
    "showCtaInHeader": true,
    "cta": {
      "label": "Baza firm",
      "href": "/baza-firm"
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
        "label": "Baza firm",
        "href": "/baza-firm",
        "enabled": true
      },
      {
        "label": "Kontakt",
        "href": "/kontakt",
        "enabled": false
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
    "showStandalonePagesInMenu": true,
    "maxLandingLinks": 4,
    "ctaHref": "/kontakt"
  },
  "hero": {
    "eyebrow": "Darmowa baza firm do przeglądania",
    "title": "Otwarta baza firm dla sprzedaży, SEO i lokalnego prospectingu",
    "description": "LocalLeads udostępnia bazę firm za darmo, żebyś mógł szybko sprawdzić lokalne biznesy, branże i dane kontaktowe. To narzędzie dla agencji SEO, twórców stron, handlowców B2B i osób budujących kampanie lokalne. Jeśli czegoś brakuje, napisz na kontakt@localleads.pl lub przez formularz.",
    "primaryCta": "Przeglądaj bazę firm",
    "primaryHref": "/baza-firm",
    "secondaryCta": "Skontaktuj się",
    "secondaryHref": "/kontakt",
    "floatingCardTitle": "Darmowy dostęp",
    "floatingCardText": "Podstawą LocalLeads jest otwarta baza do przeglądania. Brakujące branże i miasta można zgłosić przez formularz.",
    "stats": [
      {
        "value": "CSV",
        "label": "baza dostępna na stronie"
      },
      {
        "value": "PL",
        "label": "miasta i regiony Polski"
      },
      {
        "value": "manual",
        "label": "ręczna kontrola danych"
      }
    ]
  },
  "stats": [
    {
      "value": 300,
      "suffix": "+",
      "label": "miast w bazie danych"
    },
    {
      "value": 30,
      "suffix": "+",
      "label": "branż"
    },
    {
      "value": 500,
      "suffix": "k+",
      "label": "firm w bazie"
    }
  ],
  "servicesSection": {
    "eyebrow": "Oferta LocalLeads",
    "previewTitle": "Dla kogo jest LocalLeads?",
    "fullTitle": "Darmowa baza firm dla osób, które pracują na danych",
    "lead": "LocalLeads jest dla agencji SEO, freelancerów od stron WWW, handlowców B2B i firm, które chcą szybko sprawdzić lokalny rynek. Dane na stronie są dostępne za darmo, a brakujące miasta lub branże możesz zgłosić kontaktowo.",
    "previewCta": "Zobacz bazę firm",
    "cardCta": "Sprawdź szczegóły"
  },
  "services": [
    {
      "slug": "darmowa-baza-firm",
      "title": "Darmowe przeglądanie bazy",
      "short": "Korzystasz z bazy firm na stronie. Filtrujesz dane po mieście, branży i frazie.",
      "shortText": "Podstawowa wartość LocalLeads jest dostępna za darmo.",
      "description": "Otwarta baza firm dostępna na stronie.",
      "details": "Wybierasz branżę i lokalizację w bazie online, a następnie przeglądasz publicznie dostępne informacje o firmach.",
      "price": "darmowe",
      "image": "/media/services-1.webp",
      "category": "Darmowa baza",
      "duration": "od razu",
      "heroLead": "Firmy z konkretnej branży i lokalizacji dostępne do przeglądania online.",
      "sections": [],
      "bullets": [
        "branża + miasto lub region",
        "dane kontaktowe",
        "social media jeśli dostępne"
      ],
      "faq": []
    },
    {
      "slug": "research-lokalny",
      "title": "Dla SEO, stron WWW i sprzedaży",
      "short": "Baza pomaga znaleźć firmy do audytów SEO, ofert stron internetowych, prospectingu B2B i analizy lokalnego rynku.",
      "shortText": "Dane jako punkt startowy do realnej pracy.",
      "description": "Dla osób, które pracują na lokalnych danych firmowych.",
      "details": "Baza pomaga sprawdzić większy rynek, przygotować research lokalny albo porównać kilka lokalizacji.",
      "price": "darmowe",
      "image": "/media/services-2.webp",
      "category": "Region",
      "duration": "online",
      "heroLead": "Kilka miast, region lub województwo do przeglądania online.",
      "sections": [],
      "bullets": [
        "kilka miast lub województwo",
        "dane do filtrowania na stronie",
        "dane kontaktowe i social media"
      ],
      "faq": []
    },
    {
      "slug": "zglos-brakujace-dane",
      "title": "Brakujące branże i miasta",
      "short": "Gdy w bazie brakuje konkretnej branży, miasta lub regionu, możesz zgłosić taki zakres do uzupełnienia.",
      "shortText": "Napisz, czego szukasz.",
      "description": "Zgłoszenia brakujących danych przez formularz.",
      "details": "Jeśli nie widzisz potrzebnego zakresu, wyślij wiadomość na kontakt@localleads.pl albo przez formularz. Podaj branżę, miasto lub region oraz krótki opis danych, których szukasz.",
      "price": "kontakt",
      "image": "/media/gallery-1.webp",
      "category": "Kontakt",
      "duration": "formularz",
      "heroLead": "Zgłoś branżę lub miasto, którego nie ma jeszcze w bazie.",
      "sections": [],
      "bullets": [
        "brakujące branże",
        "brakujące miasta",
        "kontakt@localleads.pl"
      ],
      "faq": []
    }
  ],
  "about": {
    "title": "Po co powstało LocalLeads",
    "text": "LocalLeads ma być praktycznym, darmowym miejscem do sprawdzania lokalnych firm. Baza ma budować użyteczność i zaufanie przez łatwy dostęp do danych.",
    "pageTitle": "O mnie",
    "pageLead": "Za LocalLeads stoi praktyczne podejście: baza ma być użyteczna, czytelna i gotowa do pracy, a nie tylko długa.",
    "paragraphs": [
      "Pomysł na LocalLeads powstał przy pracy nad lokalną sprzedażą usług internetowych. Szybko okazało się, że największym problemem nie jest sama oferta, ale uporządkowane znalezienie firm, sprawdzenie kontaktów i przygotowanie danych w formacie, który da się wykorzystać w CRM.",
      "Dlatego baza jest budowana wokół realnego zastosowania: agencja SEO może szukać firm bez widoczności w Google, twórca stron może znaleźć biznesy z przestarzałą witryną, handlowiec B2B może zebrać kontakty z wybranego regionu, a firma usługowa może znaleźć partnerów lokalnych.",
      "Nie obiecuję magicznej sprzedaży. Udostępniam uporządkowany punkt startowy: dane firmowe, sensowny podział i możliwość zgłoszenia brakującej branży lub regionu Polski."
    ]
  },
  "process": [
    "Przeglądasz darmową bazę firm na stronie",
    "Filtrujesz rekordy po branży, mieście i danych kontaktowych",
    "Gdy czegoś brakuje, zgłaszasz konkretną branżę lub miasto",
    "Jeśli czegoś brakuje, wysyłasz zgłoszenie przez formularz"
  ],
  "partnersSection": {
    "showHeader": false,
    "showNames": false,
    "title": "Dla kogo",
    "description": "Dane dla SEO, stron WWW, sprzedaży B2B i lokalnego prospectingu."
  },
  "partners": [],
  "blog": {
    "enabled": true,
    "title": "Wiedza o leadach",
    "description": "Poradniki o bazach firm i sprzedaży B2B.",
    "landingLimit": 3,
    "pageTitle": "Blog LocalLeads",
    "pageDescription": "Praktyczne materiały o pozyskiwaniu kontaktów biznesowych.",
    "showImages": true,
    "emptyTitle": "Wpisy w przygotowaniu",
    "emptyDescription": "Wkrótce pojawią się poradniki o CSV, prospectingu i lokalnym SEO.",
    "fallbackImage": "/media/hero.webp"
  },
  "map": {
    "showHeader": false,
    "title": "LocalLeads — Polska",
    "description": "Bazy firm przygotowywane dla miast i regionów w całej Polsce.",
    "query": "Polska",
    "embedUrl": "",
    "height": 420
  },
  "pricing": [],
  "faq": [
    [
      "Czy baza firm jest darmowa?",
      "Tak. Podstawowe przeglądanie bazy firm na stronie jest darmowe. Możesz sprawdzać rekordy, filtrować dane i szukać firm online."
    ],
    [
      "Co jeśli brakuje branży albo miasta?",
      "Napisz przez formularz albo na kontakt@localleads.pl. Podaj branżę, miasto lub region oraz krótki opis danych, których szukasz."
    ],
    [
      "Czy mogę przeglądać bazę samodzielnie?",
      "Tak. Strona służy do przeglądania i filtrowania danych dostępnych online."
    ],
    [
      "Co jeśli w bazie nie ma mojej branży albo miasta?",
      "Wtedy napisz, czego szukasz: branża, miasto, region i orientacyjna liczba rekordów. Zgłoszenie pomoże rozwijać bazę w potrzebnym kierunku."
    ],
    [
      "Jak zgłosić brakujące dane?",
      "Najprościej przez formularz kontaktowy lub e-mail kontakt@localleads.pl. W wiadomości podaj branżę, miasto albo region."
    ],
    [
      "Jak działa pole Szukaj w bazie firm?",
      "Pole Szukaj sprawdza wszystkie widoczne pola rekordu, na przykład nazwę firmy, adres, miasto, branżę, telefon, stronę WWW, e-mail oraz profile społecznościowe, jeśli są dostępne."
    ],
    [
      "Czy dane są zawsze kompletne?",
      "Nie zawsze. Baza opiera się na publicznie dostępnych informacjach, dlatego nie każda firma ma telefon, stronę WWW, e-mail lub social media. Braki są naturalne przy danych lokalnych firm."
    ],
    [
      "Jak zgłosić błąd w bazie?",
      "Najprościej przez formularz kontaktowy. W wiadomości podaj nazwę firmy i opisz, co jest nieaktualne lub błędne."
    ]
  ],
  "reviews": [],
  "social": [
    {
      "name": "Facebook",
      "href": "https://facebook.com",
      "icon": "/social/facebook.png",
      "help": "Wklej link do profilu Facebook. Pusty href ukrywa ikonę."
    }
  ],
  "gallerySection": {
    "title": "Produkt w praktyce",
    "description": "Strona pokazuje przykładowe dane, social media i zasięg baz lokalnych w Polsce."
  },
  "galleryItems": [
    {
      "title": "Mapa zasięgu",
      "category": "Regiony",
      "description": "Bazy mogą obejmować miasta, województwa albo wybrane regiony Polski.",
      "alt": "Mapa Polski pokazująca zasięg baz leadów LocalLeads"
    },
    {
      "title": "Tabela danych",
      "category": "Dane",
      "description": "Przykładowe dane firm gotowe do filtrowania na stronie.",
      "alt": "Przykład arkusza CSV z leadami firmowymi"
    },
    {
      "title": "Dane z social mediami",
      "category": "Social media",
      "description": "Rozszerzone rekordy z linkami do social mediów i ręczną weryfikacją.",
      "alt": "Baza leadów z danymi kontaktowymi i social media"
    }
  ],
  "galleryOptionsHelp": {
    "layout": [
      "featured",
      "grid",
      "masonry",
      "slider"
    ],
    "columns": [
      "2",
      "3",
      "4"
    ],
    "aspect": [
      "square",
      "photo",
      "wide",
      "portrait"
    ],
    "booleans": "true = włączone, false = wyłączone"
  },
  "name": "LocalLeads",
  "businessType": "baza leadów B2B CSV",
  "city": "Polska",
  "slug": "localleads",
  "seo": {
    "title": "LocalLeads — darmowa baza firm z Polski",
    "description": "Darmowa baza firm do przeglądania i filtrowania. Dane dla agencji SEO, handlowców B2B, twórców stron i lokalnego prospectingu. Brakujące branże lub miasta możesz zgłosić przez formularz."
  },
  "colors": {
    "primary": "#38bdf8",
    "secondary": "#1e40af",
    "accent": "#8b5cf6"
  },
  "brand": {
    "name": "LocalLeads",
    "logoText": "LL"
  },
  "nav": [
    [
      "Start",
      "/#hero"
    ],
    [
      "Oferta",
      "/uslugi"
    ],
    [
      "Baza firm",
      "/baza-firm"
    ],
    [
      "O mnie",
      "/o-mnie"
    ],
    [
      "FAQ",
      "/faq"
    ],
    [
      "Kontakt",
      "/kontakt"
    ]
  ],
  "address": "cała Polska",
  "phone": "+48 506 105 098",
  "email": "kontakt@localleads.pl",
  "facebookUrl": "https://facebook.com",
  "instagramUrl": "",
  "contact": {
    "cta": "Przeglądaj bazę firm",
    "address": "cała Polska",
    "phone": "+48 506 105 098",
    "email": "kontakt@localleads.pl"
  },
  "gallery": [
    "/media/gallery-1.webp",
    "/media/gallery-2.webp",
    "/media/gallery-3.webp"
  ],
  "socialLinks": [
    {
      "name": "Facebook",
      "href": "https://facebook.com",
      "icon": "/social/facebook.png",
      "help": "Wklej link do profilu Facebook. Pusty href ukrywa ikonę."
    }
  ],
  "_configInfo": {
    "socialMedia": "Edytuj sekcję socialLinks. Ikona pokazuje się tylko wtedy, gdy href nie jest pusty.",
    "cookie": "Pliki graficzne ikon są w public/social/.",
    "colors": "Główny kolor marki/logo: #38bdf8."
  },
  "whatsappUrl": "",
  "messengerUrl": ""
} as const;
