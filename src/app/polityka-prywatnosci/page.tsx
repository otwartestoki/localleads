import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';
import { site } from '@/config/site';

const legal = (site as any).legal || {};

export const metadata: Metadata = {
  title: `Polityka prywatności i RODO | ${site.name}`,
  description: `Informacje o przetwarzaniu danych osobowych w serwisie ${site.name}, w tym przy kontakcie, zamawianiu baz leadów B2B oraz korzystaniu z danych publicznie dostępnych.`,
};

export default function PrivacyPage() {
  const company = legal.companyName || 'Jacek Smętkowski ProjektJS';
  const email = legal.email || site.contact?.email || 'kontakt@localleads.pl';

  return (
    <LegalPage
      eyebrow="RODO i dane osobowe"
      title="Polityka prywatności"
      lead="Informacje o tym, jakie dane mogą być przetwarzane podczas korzystania z serwisu, kontaktu z firmą, zamawiania usług oraz przygotowywania baz leadów B2B z publicznie dostępnych źródeł."
      sections={[
        {
          title: '1. Administrator danych',
          paragraphs: [
            `Administratorem danych osobowych jest ${company}, NIP ${legal.nip || '8882867477'}, z siedzibą pod adresem ${legal.address || 'Apteczna 10A, 87-860 Chodecz'}.`,
            `Kontakt z administratorem jest możliwy pod adresem e-mail: ${email}.`,
          ],
        },
        {
          title: '2. Zakres polityki',
          paragraphs: [
            'Polityka prywatności opisuje przetwarzanie danych osób odwiedzających serwis, osób kontaktujących się z administratorem, klientów oraz osób, których dane mogą pojawić się w bazach leadów B2B przygotowywanych na podstawie publicznie dostępnych informacji.',
            'Dokument ma charakter informacyjny i nie ogranicza praw wynikających z RODO ani innych obowiązujących przepisów.',
          ],
        },
        {
          title: '3. Jakie dane możemy przetwarzać w związku z kontaktem i obsługą klienta',
          items: [
            'imię i nazwisko lub nazwę osoby kontaktowej,',
            'adres e-mail, numer telefonu i nazwę firmy,',
            'NIP, dane rozliczeniowe i dane niezbędne do wystawienia dokumentów księgowych,',
            'treść wiadomości przesłanej przez formularz, e-mail lub inny kanał kontaktu,',
            'dane potrzebne do przygotowania oferty, realizacji zamówienia i obsługi reklamacji,',
            'dane techniczne, takie jak adres IP, informacje o przeglądarce, urządzeniu i sposobie korzystania ze strony.',
          ],
        },
        {
          title: '4. Dane wykorzystywane przy przygotowywaniu baz leadów B2B',
          paragraphs: [
            'W ramach usług LocalLeads mogą być przetwarzane informacje o podmiotach gospodarczych pochodzące z publicznie dostępnych źródeł, takich jak strony internetowe firm, publiczne profile społecznościowe, katalogi firm, rejestry, wizytówki internetowe oraz inne publiczne zasoby.',
            'Zakres takich danych może obejmować m.in. nazwę firmy, branżę, adres, miasto, stronę internetową, publiczny numer telefonu, publiczny adres e-mail, link do Facebooka, link do Instagrama, dane o widoczności firmy lub inne publicznie dostępne informacje biznesowe.',
            'W przypadku osób fizycznych prowadzących działalność gospodarczą część tych informacji może stanowić dane osobowe w rozumieniu RODO, np. imię i nazwisko przedsiębiorcy, adres e-mail, numer telefonu lub adres prowadzenia działalności.',
            'Administrator dokłada starań, aby zakres danych był adekwatny do celu przygotowania bazy B2B i nie obejmował danych nadmiarowych wobec ustalonego zakresu usługi.',
          ],
        },
        {
          title: '5. Cele przetwarzania danych',
          items: [
            'udzielenie odpowiedzi na zapytanie,',
            'przygotowanie oferty i prowadzenie korespondencji handlowej,',
            'realizacja zamówienia lub umowy, w tym przygotowanie bazy leadów, raportu albo pliku CSV,',
            'weryfikacja, porządkowanie i standaryzacja publicznie dostępnych informacji biznesowych,',
            'wystawienie dokumentów księgowych i realizacja obowiązków prawnych,',
            'dochodzenie lub obrona przed roszczeniami,',
            'obsługa reklamacji i kontaktu posprzedażowego,',
            'analiza działania strony i poprawa jakości serwisu, jeżeli użytkownik wyrazi zgodę na pliki cookies analityczne.',
          ],
        },
        {
          title: '6. Podstawy prawne przetwarzania',
          items: [
            'art. 6 ust. 1 lit. b RODO — działania przed zawarciem umowy i wykonanie umowy,',
            'art. 6 ust. 1 lit. c RODO — realizacja obowiązków prawnych, w tym księgowych i podatkowych,',
            'art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes administratora, w tym obsługa zapytań, przygotowanie ofert, realizacja usług B2B, zabezpieczenie roszczeń, ochrona serwisu oraz analiza publicznie dostępnych informacji biznesowych,',
            'art. 6 ust. 1 lit. a RODO — zgoda, np. dla opcjonalnych cookies analitycznych lub marketingowych.',
          ],
        },
        {
          title: '7. Prawnie uzasadniony interes i prawo sprzeciwu',
          paragraphs: [
            'Jeżeli dane są przetwarzane na podstawie prawnie uzasadnionego interesu, administrator ocenia, czy cel przetwarzania jest zgodny z prawem, adekwatny oraz czy interes administratora nie narusza nadrzędnych praw i wolności osoby, której dane dotyczą.',
            'Osoba, której dane dotyczą, ma prawo wnieść sprzeciw wobec przetwarzania danych na podstawie prawnie uzasadnionego interesu.',
            'W przypadku sprzeciwu wobec przetwarzania danych w celach marketingu bezpośredniego administrator zaprzestanie takiego przetwarzania wobec tej osoby.',
            `Sprzeciw można zgłosić na adres e-mail: ${email}.`,
          ],
        },
        {
          title: '8. Przekazywanie danych klientom i rola klienta',
          paragraphs: [
            'Po przekazaniu bazy leadów klientowi klient staje się niezależnym administratorem danych w zakresie, w jakim wykorzystuje otrzymane dane do własnych celów biznesowych, sprzedażowych lub marketingowych.',
            'Klient samodzielnie odpowiada za zgodność dalszego przetwarzania danych z RODO, Prawem komunikacji elektronicznej i innymi właściwymi przepisami, w szczególności za wybór podstawy prawnej, spełnienie obowiązków informacyjnych, obsługę sprzeciwów i prowadzenie komunikacji marketingowej.',
            'LocalLeads nie decyduje o treści, częstotliwości, kanale ani celu komunikacji prowadzonej przez klienta po zakupie danych.',
          ],
        },
        {
          title: '9. Odbiorcy danych',
          paragraphs: [
            'Dane mogą być przekazywane podmiotom wspierającym administratora w prowadzeniu działalności, wyłącznie w zakresie niezbędnym do realizacji danego celu.',
          ],
          items: legal.dataServices || [
            'hosting strony internetowej,',
            'poczta elektroniczna,',
            'formularz kontaktowy,',
            'obsługa księgowa,',
            'narzędzia analityczne po wyrażeniu zgody,',
            'klienci zamawiający bazę leadów B2B — w zakresie danych objętych zamówieniem i zgodnie z ustalonym zakresem usługi.',
          ],
        },
        {
          title: '10. Okres przechowywania danych',
          paragraphs: [
            'Dane z korespondencji przechowywane są przez okres potrzebny do obsługi zapytania, przygotowania oferty, realizacji zamówienia oraz zabezpieczenia ewentualnych roszczeń.',
            'Dane księgowe przechowywane są przez okres wymagany przepisami prawa. Dane przetwarzane na podstawie zgody są przetwarzane do czasu jej wycofania, chyba że istnieje inna podstawa prawna dalszego przetwarzania.',
            'Dane wykorzystywane do przygotowania baz B2B są przechowywane przez okres niezbędny do realizacji usługi, kontroli jakości, obsługi reklamacji oraz zabezpieczenia ewentualnych roszczeń.',
          ],
        },
        {
          title: '11. Prawa osoby, której dane dotyczą',
          items: [
            'prawo dostępu do danych,',
            'prawo sprostowania danych,',
            'prawo usunięcia danych,',
            'prawo ograniczenia przetwarzania,',
            'prawo przenoszenia danych,',
            'prawo wniesienia sprzeciwu,',
            'prawo cofnięcia zgody w dowolnym momencie, jeżeli dane są przetwarzane na podstawie zgody.',
          ],
        },
        {
          title: '12. Realizacja praw i kontakt',
          paragraphs: [
            `Żądania dotyczące danych osobowych można kierować na adres e-mail: ${email}.`,
            'W celu realizacji żądania administrator może poprosić o informacje pozwalające potwierdzić tożsamość osoby zgłaszającej żądanie lub zidentyfikować dane, których dotyczy zgłoszenie.',
            'Jeżeli zgłoszenie dotyczy danych przekazanych klientowi w ramach zamówionej bazy, administrator może poinformować osobę zgłaszającą o zakresie własnego przetwarzania oraz, jeżeli jest to zasadne i możliwe, wskazać klientowi konieczność obsługi żądania w zakresie jego niezależnego przetwarzania.',
          ],
        },
        {
          title: '13. Skarga do organu nadzorczego',
          paragraphs: [
            'Osoba, której dane dotyczą, ma prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych, jeżeli uzna, że przetwarzanie danych narusza przepisy RODO.',
          ],
        },
        {
          title: '14. Dobrowolność podania danych',
          paragraphs: [
            'Podanie danych w formularzu kontaktowym jest dobrowolne, ale może być niezbędne do odpowiedzi na zapytanie, przygotowania oferty lub realizacji zamówienia.',
            'W przypadku danych pochodzących z publicznie dostępnych źródeł administrator może przetwarzać dane bez bezpośredniego pozyskania ich od osoby, której dane dotyczą, jeżeli istnieje ku temu właściwa podstawa prawna.',
          ],
        },
        {
          title: '15. Zautomatyzowane decyzje i profilowanie',
          paragraphs: [
            'Dane użytkowników nie są wykorzystywane do podejmowania decyzji w sposób wyłącznie zautomatyzowany, które wywoływałyby wobec nich skutki prawne lub podobnie istotnie na nich wpływały.',
            'W ramach usług mogą być wykonywane techniczne lub biznesowe klasyfikacje firm, np. według branży, miasta, obecności strony WWW lub publicznych profili społecznościowych, ale nie służą one do podejmowania decyzji wywołujących skutki prawne wobec osób fizycznych.',
          ],
        },
        {
          title: '16. Zmiany polityki prywatności',
          paragraphs: [
            'Polityka prywatności może być aktualizowana w przypadku zmiany przepisów prawa, zakresu usług, sposobu działania serwisu lub narzędzi wykorzystywanych do przetwarzania danych.',
            'Aktualna wersja polityki prywatności jest publikowana w serwisie.',
          ],
        },
      ]}
    />
  );
}
