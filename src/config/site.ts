export const preset = {
  "name": "LocalLeads premium dark",
  "description": "Ciemna strona produktowa dla darmowej bazy firm online.",
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
    "imageAlt": "LocalLeads — darmowa baza firm online"
  }
} as const;

export const site = {
  "business": {
    "name": "LocalLeads",
    "type": "darmowa baza firm online",
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
  "description": "LocalLeads to darmowa baza firm do przeglądania i filtrowania. Pomaga agencjom, handlowcom i twórcom stron szybciej znaleźć lokalne firmy oraz sprawdzić dane kontaktowe.",
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
    "description": "Ciemna strona produktowa dla darmowej bazy firm online.",
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
      "imageAlt": "LocalLeads — darmowa baza firm online"
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
      "subtitle": "Buduję praktyczne narzędzia do pracy na lokalnych danych firmowych: bazę online, indeks branż i katalog firm na mapie.",
      "lead": "LocalLeads powstało z potrzeby uporządkowania procesu szukania firm: bez przypadkowych list, pustych rekordów i danych, których nikt nie weryfikuje.",
      "blocks": []
    },
    "services": {
      "enabled": true,
      "href": "/oferta",
      "label": "Narzędzia",
      "title": "Narzędzia LocalLeads",
      "subtitle": "Przeglądaj bazę B2B, sprawdzaj firmy na mapie i korzystaj z indeksu branż oraz miast."
    },
    "database": {
      "enabled": true,
      "href": "/baza-firm",
      "label": "Baza firm",
      "title": "Darmowa baza firm",
      "subtitle": "Szukaj po nazwie, branży, mieście, telefonie, domenie i dostępnych kanałach kontaktu."
    },
    "localCatalog": {
      "enabled": true,
      "href": "/katalog-firm",
      "label": "Katalog lokalny",
      "title": "Katalog lokalny",
      "subtitle": "Ustaw punkt startowy, wybierz promień i porównaj lokalne firmy na mapie."
    },
    "index": {
      "enabled": true,
      "href": "/indeks-bazy",
      "label": "Indeks bazy",
      "title": "Indeks bazy firm",
      "subtitle": "Sprawdź, które branże i miasta są już dostępne w bazie."
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
        "label": "Narzędzia",
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
    "title": "Darmowa baza firm do prospectingu, SEO i lokalnego researchu",
    "description": "Przeglądaj firmy, filtruj kontakty, otwieraj strony WWW i social media oraz kopiuj dane. LocalLeads pomaga agencjom SEO, twórcom stron i handlowcom B2B szybciej sprawdzić lokalny rynek.",
    "primaryCta": "Przeglądaj bazę firm",
    "primaryHref": "/baza-firm",
    "secondaryCta": "Sprawdź katalog lokalny",
    "secondaryHref": "/katalog-firm",
    "floatingCardTitle": "Darmowy dostęp",
    "floatingCardText": "Podstawą LocalLeads jest otwarta baza do przeglądania. Brakujące branże i miasta można zgłosić przez formularz.",
    "stats": [
      {
        "value": "online",
        "label": "baza dostępna w przeglądarce"
      },
      {
        "value": "PL",
        "label": "miasta i regiony Polski"
      },
      {
        "value": "mapa",
        "label": "katalog lokalny z promieniem"
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
    "eyebrow": "Narzędzia LocalLeads",
    "previewTitle": "Co możesz zrobić w LocalLeads?",
    "fullTitle": "Baza firm, indeks branż i katalog lokalny w jednym miejscu",
    "lead": "LocalLeads jest dla agencji SEO, freelancerów od stron WWW, handlowców B2B i osób analizujących lokalne rynki. Możesz filtrować firmy po danych kontaktowych, sprawdzać branże i miasta oraz szukać najbliższych firm na mapie.",
    "previewCta": "Zobacz bazę firm",
    "cardCta": "Sprawdź szczegóły"
  },
  "services": [
    {
      "slug": "darmowa-baza-firm",
      "title": "Darmowe przeglądanie bazy",
      "short": "Szukasz firm po frazie, branży, mieście i dostępnych kanałach kontaktu.",
      "shortText": "Najważniejsze dane są dostępne bez logowania.",
      "description": "Otwarta baza firm do filtrowania i pracy na rekordach.",
      "details": "Wybierasz branżę, miasto lub dowolną frazę i filtrujesz rekordy z WWW, telefonem, e-mailem albo social media.",
      "price": "darmowe",
      "image": "/media/services-1.webp",
      "category": "Darmowa baza",
      "duration": "od razu",
      "heroLead": "Firmy z konkretnej branży i lokalizacji dostępne do przeglądania online.",
      "sections": [],
      "bullets": [
        "branża, miasto i fraza",
        "telefon, e-mail, WWW",
        "profile w social media"
      ],
      "faq": []
    },
    {
      "slug": "research-lokalny",
      "title": "Indeks branż i miast",
      "short": "Sprawdzasz, które branże i lokalizacje są już dostępne, a potem przechodzisz do gotowego widoku bazy.",
      "shortText": "Szybka mapa zasięgu danych.",
      "description": "Dla osób, które chcą zacząć od konkretnej branży lub miasta.",
      "details": "Indeks porządkuje dostępne branże i lokalizacje, pokazuje liczbę firm oraz prowadzi do przefiltrowanej bazy.",
      "price": "darmowe",
      "image": "/media/services-2.webp",
      "category": "Indeks",
      "duration": "online",
      "heroLead": "Branże i miasta dostępne w bazie bez technicznego szukania po tabelach.",
      "sections": [],
      "bullets": [
        "branże z liczbą firm",
        "miasta z liczbą rekordów",
        "szybkie przejście do bazy"
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
    "text": "LocalLeads ma być praktycznym miejscem do sprawdzania lokalnych firm i szybkiego researchu.",
    "pageTitle": "O mnie",
    "pageLead": "Za LocalLeads stoi praktyczne podejście: baza ma być użyteczna, czytelna i gotowa do pracy, a nie tylko długa.",
    "paragraphs": [
      "Pomysł na LocalLeads powstał przy pracy nad lokalną sprzedażą usług internetowych. Szybko okazało się, że największym problemem nie jest sama oferta, ale uporządkowane znalezienie firm, sprawdzenie kontaktów i szybka kwalifikacja rekordów.",
      "Dlatego baza jest budowana wokół realnego zastosowania: agencja SEO może szukać firm w wybranej branży, twórca stron może sprawdzić lokalne biznesy z WWW i social media, a handlowiec B2B może przeglądać dostępne dane kontaktowe.",
      "Nie obiecuję magicznej sprzedaży. Udostępniam uporządkowany punkt startowy: dane firmowe, filtry, indeks branż i miast oraz katalog lokalny oparty o mapę."
    ]
  },
  "process": [
    "Wybierasz bazę B2B, indeks albo katalog lokalny",
    "Filtrujesz rekordy po branży, mieście, frazie i dostępnych danych kontaktowych",
    "Kopiujesz dane i otwierasz WWW lub profile social media",
    "Gdy czegoś brakuje, zgłaszasz konkretną branżę, miasto lub błąd w danych"
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
    "emptyDescription": "Wkrótce pojawią się poradniki o prospectingu, bazach firm i lokalnym SEO.",
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
      "alt": "Przykład tabeli z danymi firmowymi"
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
  "businessType": "darmowa baza firm online",
  "city": "Polska",
  "slug": "localleads",
  "seo": {
    "title": "LocalLeads — darmowa baza firm z Polski",
    "description": "Darmowa baza firm do przeglądania i filtrowania. Dane dla agencji SEO, handlowców B2B, twórców stron i lokalnego prospectingu. Sprawdzaj kontakty, indeks branż i katalog lokalny na mapie."
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
      "Narzędzia",
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
