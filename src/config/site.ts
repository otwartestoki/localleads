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
  "description": "LocalLeads dostarcza uporządkowane bazy firm w formie CSV według branży i lokalizacji. Każdy pakiet zawiera dane kontaktowe oraz social media, jeśli są publicznie dostępne.",
  "ctaLabel": "Zamów próbkę CSV",
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
      "title": "Bazy leadów według branży i lokalizacji",
      "subtitle": "Paczki firm w CSV przygotowane pod konkretną kampanię: jednorazowo albo w abonamencie."
    },
    "pricing": {
      "enabled": true,
      "href": "/cennik",
      "label": "Cennik",
      "title": "Prosty cennik baz leadów",
      "subtitle": "Jednorazowe paczki oraz abonament na stały dopływ nowych firm.",
      "intro": "Wybierasz branżę i lokalizację. Każdy pakiet zawiera dane kontaktowe oraz social media, jeśli są publicznie dostępne.",
      "packages": [
        {
          "name": "Start",
          "price": "99 zł",
          "features": [
            "do 100 firm",
            "branża + lokalizacja",
            "dane kontaktowe + social media jeśli dostępne",
            "plik CSV"
          ]
        },
        {
          "name": "Biznes",
          "price": "199 zł",
          "features": [
            "do 250 firm",
            "najbardziej uniwersalny pakiet",
            "dane kontaktowe + social media jeśli dostępne",
            "plik CSV"
          ]
        },
        {
          "name": "Pro",
          "price": "349 zł",
          "features": [
            "do 500 firm",
            "większa paczka na region lub kilka miast",
            "dane kontaktowe + social media jeśli dostępne",
            "plik CSV"
          ]
        },
        {
          "name": "Abonament",
          "price": "od 79 zł / mies.",
          "features": [
            "nowe firmy co miesiąc",
            "niższa cena za lead",
            "branża i lokalizacja według ustaleń",
            "plik CSV"
          ]
        }
      ]
    },
    "gallery": {
      "enabled": false,
      "href": "/galeria",
      "label": "Przykłady",
      "title": "Przykłady danych i zasięgu",
      "subtitle": "Zobacz, jak wygląda produkt: arkusz CSV, paczka premium i pokrycie miast w Polsce."
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
      "subtitle": "Najważniejsze informacje przed zamówieniem bazy leadów."
    },
    "contact": {
      "enabled": true,
      "href": "/kontakt",
      "label": "Kontakt",
      "title": "Zamów bazę leadów",
      "subtitle": "Napisz, jakiej branży, miasta lub regionu potrzebujesz. Przygotuję propozycję zakresu i ceny."
    }
  },
  "navigation": {
    "menuStyle": "dark",
    "logoMode": "mark-text",
    "logoHref": "",
    "showCtaInHeader": true,
    "cta": {
      "label": "Zamów CSV",
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
        "label": "Cennik",
        "href": "/cennik",
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
    "showStandalonePagesInMenu": true,
    "maxLandingLinks": 4,
    "ctaHref": "/kontakt"
  },
  "hero": {
    "eyebrow": "Ręcznie sprawdzane leady B2B w CSV",
    "title": "Gotowe bazy firm z Polski — według branży, miasta lub regionu",
    "description": "LocalLeads pomaga agencjom SEO, twórcom stron, handlowcom B2B i firmom szukającym partnerów szybciej dotrzeć do lokalnych biznesów. Otrzymujesz czysty plik CSV, który możesz od razu filtrować, importować do CRM albo wykorzystać w kampanii kontaktowej.",
    "primaryCta": "Zamów próbkę CSV",
    "primaryHref": "/kontakt",
    "secondaryCta": "Zobacz cennik",
    "secondaryHref": "/cennik",
    "floatingCardTitle": "Jeden standard danych",
    "floatingCardText": "Każda paczka zawiera dane kontaktowe oraz social media, jeśli są publicznie dostępne. Różnica między pakietami dotyczy głównie liczby firm.",
    "stats": [
      {
        "value": "CSV",
        "label": "format gotowy do CRM"
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
    "previewTitle": "Jakie bazy możesz zamówić?",
    "fullTitle": "Bazy leadów dopasowane do Twojej sprzedaży",
    "lead": "Nie sprzedajemy jednej przypadkowej listy dla wszystkich. Dane przygotowujemy jako paczki: branża + miasto, branża + region albo szeroka baza lokalnych firm.",
    "previewCta": "Zobacz pełną ofertę",
    "cardCta": "Sprawdź szczegóły"
  },
  "services": [
    {
      "slug": "paczka-branza-lokalizacja",
      "title": "Paczka branża + lokalizacja",
      "short": "Firmy z konkretnej branży i miasta, np. fryzjerzy Łódź, dentyści Kraków albo restauracje Poznań.",
      "shortText": "Najprostszy i najczytelniejszy wariant bazy leadów.",
      "description": "Jednorazowa paczka firm do konkretnej kampanii.",
      "details": "Wybierasz branżę i lokalizację, a otrzymujesz uporządkowany plik CSV z firmami pasującymi do kryterium. Każdy rekord zawiera dane kontaktowe oraz linki do social media, jeśli są publicznie dostępne.",
      "price": "od 99 zł",
      "image": "/media/services-1.webp",
      "category": "Paczka",
      "duration": "1–3 dni",
      "heroLead": "Firmy z konkretnej branży i lokalizacji, gotowe do pracy sprzedażowej.",
      "sections": [],
      "bullets": [
        "branża + miasto lub region",
        "dane kontaktowe",
        "social media jeśli dostępne"
      ],
      "faq": []
    },
    {
      "slug": "paczka-region",
      "title": "Paczka regionalna",
      "short": "Większa baza dla kilku miast, województwa albo szerszego obszaru sprzedażowego.",
      "shortText": "Dobra do analizy rynku i większych kampanii.",
      "description": "Baza firm z większego obszaru geograficznego.",
      "details": "Wariant dla firm, które chcą sprawdzić większy rynek, przygotować sprzedaż terenową albo porównać kilka lokalizacji. Zakres ustalany jest indywidualnie w zależności od branży.",
      "price": "od 199 zł",
      "image": "/media/services-2.webp",
      "category": "Region",
      "duration": "2–5 dni",
      "heroLead": "Kilka miast, region lub województwo w jednym uporządkowanym CSV.",
      "sections": [],
      "bullets": [
        "kilka miast lub województwo",
        "CSV do filtrowania",
        "dane kontaktowe i social media"
      ],
      "faq": []
    },
    {
      "slug": "abonament-leadow",
      "title": "Abonament na nowe leady",
      "short": "Regularne paczki nowych firm co miesiąc — niższa cena za lead przy stałej współpracy.",
      "shortText": "Stały dopływ nowych rekordów do prospectingu.",
      "description": "Cykliczna dostawa baz leadów.",
      "details": "Abonament sprawdza się, jeśli regularnie prowadzisz sprzedaż, kampanie SEO, sprzedaż stron WWW albo outreach B2B. Otrzymujesz nowe firmy z ustalonej branży i lokalizacji w niższej cenie za rekord.",
      "price": "od 79 zł / mies.",
      "image": "/media/gallery-1.webp",
      "category": "Abonament",
      "duration": "co miesiąc",
      "heroLead": "Cykliczne paczki nowych firm do bieżącej pracy sprzedażowej.",
      "sections": [],
      "bullets": [
        "nowe firmy co miesiąc",
        "niższa cena za lead",
        "branża i lokalizacja według ustaleń"
      ],
      "faq": []
    }
  ],
  "about": {
    "title": "O mnie i LocalLeads",
    "text": "Tworzę praktyczne narzędzia do pozyskiwania klientów: od stron internetowych i CRM po uporządkowane bazy leadów. LocalLeads jest produktem dla osób, które nie chcą tracić godzin na ręczne przeklejanie danych z wizytówek, stron i social mediów.",
    "pageTitle": "O mnie",
    "pageLead": "Za LocalLeads stoi praktyczne podejście: baza ma być użyteczna, czytelna i gotowa do pracy, a nie tylko długa.",
    "paragraphs": [
      "Pomysł na LocalLeads powstał przy pracy nad lokalną sprzedażą usług internetowych. Szybko okazało się, że największym problemem nie jest sama oferta, ale uporządkowane znalezienie firm, sprawdzenie kontaktów i przygotowanie danych w formacie, który da się wykorzystać w CRM.",
      "Dlatego każda paczka jest budowana wokół realnego zastosowania: agencja SEO może szukać firm bez widoczności w Google, twórca stron może znaleźć biznesy z przestarzałą witryną, handlowiec B2B może zebrać kontakty z wybranego regionu, a firma usługowa może znaleźć partnerów lokalnych.",
      "Nie obiecuję magicznej sprzedaży. Dostarczam uporządkowany punkt startowy: rekordy w CSV, sensowny podział, ręczną kontrolę i możliwość przygotowania paczek pod konkretną branżę lub region Polski."
    ]
  },
  "process": [
    "Wybierasz branżę, miasto lub region",
    "Dobieramy pakiet do liczby firm i zakresu",
    "Zbieram i czyszczę dane w CSV",
    "Ręcznie sprawdzam rekordy i przekazuję plik"
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
  "pricing": [
    {
      "name": "Start",
      "price": "99 zł",
      "features": [
        "do 100 rekordów CSV",
        "firma, telefon, WWW, miasto, branża",
        "jedno miasto lub jedna branża",
        "dla testu rynku lub małej kampanii"
      ]
    },
    {
      "name": "Biznes Branża/Miasto",
      "price": "199 zł",
      "features": [
        "do 200 rekordów CSV",
        "dane kontaktowe + Facebook/Instagram",
        "ręczna weryfikacja rekordów",
        "najlepszy wybór dla SEO i stron WWW"
      ]
    },
    {
      "name": "Region Pro",
      "price": "349 zł",
      "features": [
        "do 500 rekordów CSV",
        "kilka miast lub cały region",
        "segmentacja po branżach",
        "usuwanie duplikatów"
      ]
    },
    {
      "name": "Abonament Growth",
      "price": "od 79 zł / mies.",
      "features": [
        "cykliczne paczki leadów",
        "stała branża lub rotacyjne nisze",
        "priorytetowa realizacja",
        "rozliczenie miesięczne"
      ]
    }
  ],
  "faq": [
    [
      "Co zawiera każda paczka leadów?",
      "Każdy pakiet zawiera jeden standard danych: nazwę firmy, telefon, adres lub miasto, stronę WWW oraz linki do Facebooka i Instagrama, jeśli są publicznie dostępne. Dane przekazuję w uporządkowanym pliku CSV gotowym do pracy w CRM lub arkuszu."
    ],
    [
      "Czy są jeszcze wersje Standard i Premium?",
      "Nie. Cennik został uproszczony. Nie dzielę już bazy na sztuczne wersje Standard i Premium — różnica między pakietami dotyczy głównie liczby firm oraz tego, czy zamawiasz paczkę jednorazową, czy abonament."
    ],
    [
      "Ile kosztuje jednorazowa paczka leadów?",
      "Pakiety jednorazowe zaczynają się od 99 zł za paczkę do 100 firm. Większe pakiety obejmują do 250 lub do 500 firm i są przeznaczone dla szerszych kampanii lokalnych albo regionalnych."
    ],
    [
      "Kiedy wybrać abonament zamiast paczki jednorazowej?",
      "Abonament ma sens, jeśli regularnie potrzebujesz świeżych rekordów z wybranej branży, miasta lub regionu. To ten sam typ danych, ale dostarczany cyklicznie i zwykle w niższej cenie za rekord."
    ],
    [
      "Czy mogę zamówić konkretną branżę i lokalizację?",
      "Tak. Najczęstszy model to branża + lokalizacja, na przykład fryzjerzy Łódź, barberzy Warszawa, dentyści Kraków, restauracje Poznań albo firmy budowlane w województwie łódzkim."
    ],
    [
      "Czy zawsze da się znaleźć pełną liczbę firm z pakietu?",
      "Nie zawsze. W małej miejscowości lub bardzo wąskiej branży liczba realnych firm może być niższa niż limit pakietu. Dlatego przed realizacją warto napisać, jaka branża i lokalizacja Cię interesuje — wtedy można dobrać sensowny zakres."
    ],
    [
      "Czy dane są sprawdzane ręcznie?",
      "Tak. Dane są czyszczone, porządkowane i kontrolowane ręcznie. Usuwam oczywiste duplikaty i sprawdzam, czy rekordy pasują do zamówionej branży oraz lokalizacji."
    ],
    [
      "Czy leady gwarantują sprzedaż?",
      "Nie. Baza leadów jest punktem startowym do kampanii. Wynik zależy od oferty, komunikatu, sposobu kontaktu i dopasowania usługi do danej branży."
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
    "description": "Strona pokazuje trzy elementy oferty: arkusz CSV, wersję premium z social mediami i zasięg baz lokalnych w Polsce."
  },
  "galleryItems": [
    {
      "title": "Mapa zasięgu",
      "category": "Regiony",
      "description": "Bazy mogą obejmować miasta, województwa albo wybrane regiony Polski.",
      "alt": "Mapa Polski pokazująca zasięg baz leadów LocalLeads"
    },
    {
      "title": "CSV Standard",
      "category": "Dane",
      "description": "Podstawowa paczka firm gotowa do filtrowania, importu i pracy w CRM.",
      "alt": "Przykład arkusza CSV z leadami firmowymi"
    },
    {
      "title": "CSV z social mediami",
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
    "title": "LocalLeads — baza leadów B2B CSV | leady firm z Polski",
    "description": "Ręcznie sprawdzane bazy leadów B2B w CSV. Leady według branży, miasta lub regionu Polski. Pakiety jednorazowe i abonament z danymi kontaktowymi oraz social media."
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
      "Cennik",
      "/cennik"
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
    "cta": "Zamów próbkę CSV",
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
