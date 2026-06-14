export type SeoCity = {
  slug: string;
  name: string;
  voivodeship?: string;
};

export type SeoIndustry = {
  slug: string;
  name: string;
  accusative: string;
  plural?: string;
  pain: string;
  useCase: string;
};

export const seoCities: SeoCity[] = [
  { slug: 'lodz', name: 'Łódź', voivodeship: 'łódzkie' },
  { slug: 'warszawa', name: 'Warszawa', voivodeship: 'mazowieckie' },
  { slug: 'krakow', name: 'Kraków', voivodeship: 'małopolskie' },
  { slug: 'wroclaw', name: 'Wrocław', voivodeship: 'dolnośląskie' },
  { slug: 'poznan', name: 'Poznań', voivodeship: 'wielkopolskie' },
  { slug: 'gdansk', name: 'Gdańsk', voivodeship: 'pomorskie' },
  { slug: 'katowice', name: 'Katowice', voivodeship: 'śląskie' },
  { slug: 'lublin', name: 'Lublin', voivodeship: 'lubelskie' },
  { slug: 'bialystok', name: 'Białystok', voivodeship: 'podlaskie' },
  { slug: 'bydgoszcz', name: 'Bydgoszcz', voivodeship: 'kujawsko-pomorskie' },
  { slug: 'torun', name: 'Toruń', voivodeship: 'kujawsko-pomorskie' },
  { slug: 'szczecin', name: 'Szczecin', voivodeship: 'zachodniopomorskie' },
  { slug: 'rzeszow', name: 'Rzeszów', voivodeship: 'podkarpackie' },
  { slug: 'kielce', name: 'Kielce', voivodeship: 'świętokrzyskie' },
  { slug: 'olsztyn', name: 'Olsztyn', voivodeship: 'warmińsko-mazurskie' },
  { slug: 'opole', name: 'Opole', voivodeship: 'opolskie' },
  { slug: 'zielona-gora', name: 'Zielona Góra', voivodeship: 'lubuskie' },
  { slug: 'gorzow-wielkopolski', name: 'Gorzów Wielkopolski', voivodeship: 'lubuskie' },
  { slug: 'czestochowa', name: 'Częstochowa', voivodeship: 'śląskie' },
  { slug: 'radom', name: 'Radom', voivodeship: 'mazowieckie' },
  { slug: 'sosnowiec', name: 'Sosnowiec', voivodeship: 'śląskie' },
  { slug: 'gliwice', name: 'Gliwice', voivodeship: 'śląskie' },
  { slug: 'zabrze', name: 'Zabrze', voivodeship: 'śląskie' },
  { slug: 'tychy', name: 'Tychy', voivodeship: 'śląskie' },
  { slug: 'ruda-slaska', name: 'Ruda Śląska', voivodeship: 'śląskie' },
  { slug: 'rybnik', name: 'Rybnik', voivodeship: 'śląskie' },
  { slug: 'dabrowa-gornicza', name: 'Dąbrowa Górnicza', voivodeship: 'śląskie' },
  { slug: 'plock', name: 'Płock', voivodeship: 'mazowieckie' },
  { slug: 'elblag', name: 'Elbląg', voivodeship: 'warmińsko-mazurskie' },
  { slug: 'walbrzych', name: 'Wałbrzych', voivodeship: 'dolnośląskie' },
  { slug: 'wloclawek', name: 'Włocławek', voivodeship: 'kujawsko-pomorskie' },
  { slug: 'tarnow', name: 'Tarnów', voivodeship: 'małopolskie' },
  { slug: 'chorzow', name: 'Chorzów', voivodeship: 'śląskie' },
  { slug: 'kalisz', name: 'Kalisz', voivodeship: 'wielkopolskie' },
  { slug: 'koszalin', name: 'Koszalin', voivodeship: 'zachodniopomorskie' },
  { slug: 'legnica', name: 'Legnica', voivodeship: 'dolnośląskie' },
  { slug: 'grudziadz', name: 'Grudziądz', voivodeship: 'kujawsko-pomorskie' },
  { slug: 'slupsk', name: 'Słupsk', voivodeship: 'pomorskie' },
  { slug: 'jaworzno', name: 'Jaworzno', voivodeship: 'śląskie' },
  { slug: 'jelenia-gora', name: 'Jelenia Góra', voivodeship: 'dolnośląskie' },
];

export const seoIndustries: SeoIndustry[] = [
  { slug: 'salony-kosmetyczne', name: 'salony kosmetyczne', accusative: 'salony kosmetyczne', pain: 'ręczne szukanie salonów, telefonów, e-maili i profili social media zajmuje dużo czasu', useCase: 'sprzedaż stron internetowych, reklam lokalnych, usług marketingowych i oprogramowania do rezerwacji' },
  { slug: 'fryzjerzy', name: 'fryzjerzy', accusative: 'fryzjerów', pain: 'wiele firm ma rozproszone dane w Google, na Facebooku i na stronie WWW', useCase: 'kampanie ofertowe dla usług lokalnych, stron WWW, wizytówek Google i systemów rezerwacji' },
  { slug: 'barberzy', name: 'barberzy', accusative: 'barberów', pain: 'barbershopy często działają aktywnie w social media, ale dane kontaktowe są rozproszone', useCase: 'sprzedaż stron, reklam Meta Ads, Google Ads, rezerwacji online i sesji foto' },
  { slug: 'stomatolodzy', name: 'stomatolodzy', accusative: 'stomatologów', pain: 'kliniki mają wysoką wartość klienta, więc ręczna kwalifikacja kontaktów jest szczególnie kosztowna', useCase: 'sprzedaż usług SEO, Google Ads, stron WWW i obsługi opinii Google' },
  { slug: 'trenerzy-personalni', name: 'trenerzy personalni', accusative: 'trenerów personalnych', pain: 'część trenerów działa bez strony WWW i opiera sprzedaż głównie na social media', useCase: 'oferty stron landing page, reklam lokalnych, sesji zdjęciowych i automatyzacji kontaktu' },
  { slug: 'restauracje', name: 'restauracje', accusative: 'restauracje', pain: 'dane lokali często zmieniają się, a kontakt bywa rozproszony między stroną, Google i social media', useCase: 'sprzedaż stron, menu online, sesji zdjęciowych, reklam i systemów rezerwacji' },
  { slug: 'biura-rachunkowe', name: 'biura rachunkowe', accusative: 'biura rachunkowe', pain: 'wiele biur ma przestarzałe strony albo słabą widoczność lokalną', useCase: 'sprzedaż stron firmowych, SEO lokalnego, automatyzacji i narzędzi B2B' },
  { slug: 'kancelarie-prawne', name: 'kancelarie prawne', accusative: 'kancelarie prawne', pain: 'rynek jest konkurencyjny, a jakość strony i widoczność lokalna często wpływają na liczbę zapytań', useCase: 'sprzedaż stron eksperckich, SEO lokalnego, contentu i kampanii Google Ads' },
  { slug: 'fotografowie', name: 'fotografowie', accusative: 'fotografów', pain: 'portfolio jest kluczowe, ale wielu wykonawców nie ma dobrze uporządkowanej strony ofertowej', useCase: 'sprzedaż stron portfolio, landing pages, reklam i automatyzacji zapytań' },
  { slug: 'mechanicy-samochodowi', name: 'mechanicy samochodowi', accusative: 'mechaników samochodowych', pain: 'warsztaty często mają aktualne telefony, ale słabsze strony i niewykorzystane opinie Google', useCase: 'sprzedaż stron lokalnych, wizytówek Google, reklam i systemów umawiania wizyt' },
  { slug: 'weterynarze', name: 'weterynarze', accusative: 'weterynarzy', pain: 'placówki działają lokalnie, a klient zwykle szuka szybkiego kontaktu i zaufania', useCase: 'sprzedaż stron WWW, SEO lokalnego, reklam i obsługi opinii' },
  { slug: 'fizjoterapeuci', name: 'fizjoterapeuci', accusative: 'fizjoterapeutów', pain: 'specjaliści często mają profile social media, ale brakuje im jasnej strony usługowej', useCase: 'sprzedaż stron, reklam lokalnych, contentu eksperckiego i systemów rezerwacji' },
  { slug: 'dietetycy', name: 'dietetycy', accusative: 'dietetyków', pain: 'usługi są mocno oparte na zaufaniu, opinii i widoczności w Google', useCase: 'sprzedaż landing pages, SEO, kampanii Meta Ads i automatyzacji konsultacji' },
  { slug: 'psycholodzy', name: 'psycholodzy', accusative: 'psychologów', pain: 'w tej branży liczy się wiarygodność, opis specjalizacji i łatwy kontakt', useCase: 'sprzedaż stron eksperckich, SEO lokalnego i kalendarzy rezerwacji' },
  { slug: 'studia-tatuazu', name: 'studia tatuażu', accusative: 'studia tatuażu', pain: 'duża część sprzedaży opiera się na portfolio i social media, ale strona często jest słaba albo nieaktualna', useCase: 'sprzedaż stron portfolio, galerii, reklam i automatyzacji zapytań' },
  { slug: 'salony-masazu', name: 'salony masażu', accusative: 'salony masażu', pain: 'klienci szukają lokalnie, a decyzja zależy od opinii, zdjęć i prostego kontaktu', useCase: 'sprzedaż stron WWW, SEO lokalnego, reklam i systemów rezerwacji' },
];

export const seoCityMap = Object.fromEntries(seoCities.map((city) => [city.slug, city])) as Record<string, SeoCity>;
export const seoIndustryMap = Object.fromEntries(seoIndustries.map((industry) => [industry.slug, industry])) as Record<string, SeoIndustry>;

export function getSeoCity(slug: string) {
  return seoCityMap[slug];
}

export function getSeoIndustry(slug: string) {
  return seoIndustryMap[slug];
}

export function getSeoCombinations() {
  return seoCities.flatMap((city) => seoIndustries.map((industry) => ({ city: city.slug, industry: industry.slug })));
}

export function cityIndustryPath(citySlug: string, industrySlug: string) {
  return `/leady/${citySlug}/${industrySlug}`;
}
