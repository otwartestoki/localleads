import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';
import { site } from '@/config/site';

const legal = (site as any).legal || {};

export const metadata: Metadata = {
  title: `Regulamin | ${site.name}`,
  description: `Regulamin korzystania z serwisu ${site.name}, zamawiania baz leadów B2B oraz zasad korzystania z danych pochodzących z publicznie dostępnych źródeł.`,
};

export default function TermsPage() {
  const company = legal.companyName || 'Jacek Smętkowski ProjektJS';
  const email = legal.email || site.contact?.email || 'kontakt@localleads.pl';

  return (
    <LegalPage
      eyebrow="Dokumenty prawne"
      title="Regulamin serwisu"
      lead={`Zasady korzystania ze strony ${site.name}, składania zapytań oraz zamawiania baz leadów B2B, raportów i usług powiązanych.`}
      sections={[
        {
          title: '1. Postanowienia ogólne',
          paragraphs: [
            `Niniejszy regulamin określa zasady korzystania z serwisu internetowego prowadzonego przez ${company}, NIP ${legal.nip || '8882867477'}, z siedzibą pod adresem ${legal.address || 'Apteczna 10A, 87-860 Chodecz'}.`,
            'Serwis ma charakter informacyjny i sprzedażowy. Umożliwia zapoznanie się z ofertą, kontakt z Usługodawcą oraz złożenie zapytania dotyczącego przygotowania baz leadów B2B, raportów, list firm lub usług powiązanych.',
            'Regulamin jest kierowany przede wszystkim do przedsiębiorców i osób działających w celach związanych z działalnością gospodarczą lub zawodową.',
          ],
        },
        {
          title: '2. Definicje',
          items: [
            'Usługodawca — podmiot prowadzący serwis LocalLeads.',
            'Klient — przedsiębiorca, osoba prawna, jednostka organizacyjna lub osoba fizyczna składająca zapytanie albo zamawiająca usługę.',
            'Dane / baza leadów — zestaw informacji o podmiotach gospodarczych, przygotowany według ustalonych kryteriów, np. branży, miasta, regionu lub innych parametrów.',
            'Dane publicznie dostępne — informacje widoczne w publicznych źródłach, takich jak strony internetowe firm, publiczne profile społecznościowe, katalogi firm, rejestry, wizytówki internetowe lub inne publiczne zasoby.',
            'JDG — osoba fizyczna prowadząca jednoosobową działalność gospodarczą, której dane firmowe mogą jednocześnie stanowić dane osobowe w rozumieniu RODO.',
          ],
        },
        {
          title: '3. Zakres usług',
          items: [
            'przygotowanie baz firm w formacie CSV lub innym uzgodnionym formacie, według branży, miasta, regionu albo indywidualnych kryteriów,',
            'porządkowanie, standaryzacja i podstawowa weryfikacja danych firmowych,',
            'wzbogacenie danych o publicznie dostępne informacje, takie jak strona WWW, telefon, e-mail firmowy, profil Facebook, profil Instagram, kategoria działalności, miasto lub adres,',
            'przygotowanie próbki danych, raportu rynku, listy firm lub indywidualnej wyceny,',
            'usługi dodatkowe związane z analizą potencjału sprzedażowego, oceną widoczności internetowej lub przygotowaniem materiałów do kontaktu handlowego.',
          ],
        },
        {
          title: '4. Źródła i charakter danych',
          paragraphs: [
            'Dane udostępniane przez Usługodawcę pochodzą z publicznie dostępnych źródeł albo z analizy publicznie widocznych informacji biznesowych.',
            'Usługodawca nie pozyskuje danych przez przełamywanie zabezpieczeń, dostęp do kont prywatnych, zamkniętych baz danych ani źródeł wymagających nieuprawnionego dostępu.',
            'Dane mogą dotyczyć zarówno spółek, innych jednostek organizacyjnych, jak i osób fizycznych prowadzących działalność gospodarczą. W przypadku JDG niektóre informacje, np. imię i nazwisko przedsiębiorcy, adres, telefon lub e-mail, mogą stanowić dane osobowe.',
            'Publiczna dostępność danych nie oznacza automatycznej zgody osoby, której dane dotyczą, na dowolne wykorzystanie tych danych, w szczególności na niezamówioną komunikację marketingową.',
          ],
        },
        {
          title: '5. Charakter informacji na stronie',
          paragraphs: [
            'Informacje, opisy pakietów, przykłady danych i ceny prezentowane w serwisie mają charakter informacyjny i nie stanowią oferty w rozumieniu Kodeksu cywilnego, chyba że wyraźnie wskazano inaczej.',
            'Ostateczny zakres usługi, termin realizacji, cena, liczba rekordów, format danych i poziom weryfikacji są ustalane indywidualnie przed realizacją zamówienia.',
            'Próbki danych mają charakter poglądowy i mogą różnić się od finalnego zakresu danych dostępnych dla konkretnej branży lub lokalizacji.',
          ],
        },
        {
          title: '6. Składanie zapytań i zamówień',
          paragraphs: [
            'Złożenie zapytania może nastąpić przez formularz kontaktowy, wiadomość e-mail, telefon lub inny kanał wskazany w serwisie.',
            'Do zawarcia umowy dochodzi po uzgodnieniu zakresu, ceny i warunków realizacji oraz po potwierdzeniu zamówienia przez obie strony.',
            'Usługodawca może odmówić realizacji zamówienia, jeżeli jego zakres może naruszać przepisy prawa, dobre obyczaje, prawa osób trzecich lub zasady bezpiecznego przetwarzania danych.',
          ],
        },
        {
          title: '7. Zasady korzystania z zakupionych danych',
          paragraphs: [
            'Klient jest zobowiązany do korzystania z otrzymanych danych zgodnie z obowiązującymi przepisami prawa, w szczególności RODO, przepisami o ochronie danych osobowych, Prawem komunikacji elektronicznej, przepisami o świadczeniu usług drogą elektroniczną oraz przepisami dotyczącymi nieuczciwej konkurencji.',
            'Klient ponosi odpowiedzialność za wybór podstawy prawnej dalszego przetwarzania danych, spełnienie obowiązków informacyjnych, obsługę sprzeciwów, żądań usunięcia danych oraz prowadzenie komunikacji marketingowej zgodnie z prawem.',
            'Wykorzystanie bazy do masowej wysyłki wiadomości e-mail, SMS, kontaktu telefonicznego lub komunikacji przez komunikatory może wymagać spełnienia dodatkowych obowiązków prawnych, w tym uzyskania odpowiednich zgód albo wykazania innej właściwej podstawy prawnej.',
            'Klient nie może wykorzystywać danych do spamu, nękania, działań wprowadzających w błąd, podszywania się pod inne podmioty, działań naruszających dobra osobiste ani innych działań sprzecznych z prawem.',
          ],
        },
        {
          title: '8. RODO i rola stron',
          paragraphs: [
            'W zakresie danych przekazywanych klientowi po realizacji zamówienia klient staje się niezależnym administratorem danych w odniesieniu do własnych celów i sposobów ich dalszego wykorzystania.',
            'Usługodawca nie decyduje o tym, czy i w jaki sposób klient będzie prowadził kampanie sprzedażowe lub marketingowe z wykorzystaniem otrzymanych danych.',
            'Jeżeli w bazie znajdują się dane osób fizycznych prowadzących działalność gospodarczą, klient powinien samodzielnie ocenić legalność ich dalszego przetwarzania, w tym wykonać test równowagi, jeżeli zamierza opierać przetwarzanie na prawnie uzasadnionym interesie.',
            'Na żądanie osoby, której dane dotyczą, klient powinien być przygotowany do wskazania źródła danych, celu przetwarzania, podstawy prawnej oraz do obsługi praw wynikających z RODO.',
          ],
        },
        {
          title: '9. Ograniczenia odpowiedzialności',
          paragraphs: [
            'Usługodawca dokłada należytej staranności przy przygotowaniu danych, jednak nie gwarantuje, że wszystkie informacje są kompletne, aktualne, wolne od błędów lub dostępne w każdym czasie.',
            'Dane firmowe mogą ulegać zmianom, w szczególności w zakresie numerów telefonów, adresów e-mail, stron internetowych, profili społecznościowych, lokalizacji, godzin działania lub statusu działalności.',
            'Usługodawca nie gwarantuje określonych wyników sprzedażowych, marketingowych, liczby odpowiedzi, konwersji ani przychodów uzyskanych przez klienta.',
            'Usługodawca nie odpowiada za niezgodne z prawem wykorzystanie danych przez klienta, w szczególności za wysyłkę niezamówionych informacji handlowych, telemarketing, masową komunikację, naruszenie praw osób trzecich lub brak spełnienia obowiązków wynikających z RODO po stronie klienta.',
          ],
        },
        {
          title: '10. Płatności i realizacja',
          paragraphs: [
            'Warunki płatności, termin realizacji oraz forma przekazania pliku są ustalane indywidualnie. Standardowym formatem przekazania danych jest plik CSV lub inny format uzgodniony z klientem.',
            'W przypadku usług niestandardowych Usługodawca może poprosić o przedpłatę lub zaliczkę przed rozpoczęciem prac.',
            'W przypadku produktów cyfrowych lub usług realizowanych na indywidualne zamówienie, rozpoczęcie realizacji może nastąpić po potwierdzeniu przez klienta warunków zamówienia.',
          ],
        },
        {
          title: '11. Reklamacje',
          paragraphs: [
            `Reklamacje można składać na adres e-mail: ${email}. Reklamacja powinna zawierać opis problemu, dane pozwalające zidentyfikować zamówienie oraz oczekiwany sposób rozwiązania sprawy.`,
            'Usługodawca rozpatruje reklamację w rozsądnym terminie, nie dłuższym niż 14 dni od otrzymania kompletnego zgłoszenia, chyba że charakter sprawy wymaga dłuższej analizy.',
            'Reklamacja dotycząca jakości danych powinna wskazywać konkretne rekordy lub zakres danych, których dotyczy zgłoszenie.',
          ],
        },
        {
          title: '12. Własność intelektualna',
          paragraphs: [
            'Treści, układ graficzny, teksty, elementy identyfikacji oraz materiały znajdujące się w serwisie są chronione prawem autorskim lub innymi właściwymi przepisami.',
            'Kopiowanie, rozpowszechnianie lub wykorzystywanie materiałów z serwisu bez zgody Usługodawcy jest zabronione, chyba że przepisy prawa stanowią inaczej.',
          ],
        },
        {
          title: '13. Zmiany regulaminu',
          paragraphs: [
            'Usługodawca może zmienić regulamin z ważnych przyczyn, w szczególności w przypadku zmiany przepisów prawa, zakresu usług lub sposobu działania serwisu.',
            'Aktualna wersja regulaminu jest publikowana w serwisie i obowiązuje od dnia wskazanego w dokumencie.',
          ],
        },
      ]}
    />
  );
}
