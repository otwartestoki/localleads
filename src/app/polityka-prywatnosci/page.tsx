import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';
import { site } from '@/config/site';

const legal = (site as any).legal || {};

export const metadata: Metadata = {
  title: `Polityka prywatności i RODO | ${site.name}`,
  description: `Informacje o przetwarzaniu danych osobowych w serwisie ${site.name}, formularzu kontaktowym i darmowej bazie firm.`,
};

export default function PrivacyPage() {
  const company = legal.companyName || 'Jacek Smętkowski ProjektJS';
  const email = legal.email || site.contact?.email || 'kontakt@localleads.pl';

  return (
    <LegalPage
      eyebrow="RODO i dane osobowe"
      title="Polityka prywatności"
      lead="Informacje o tym, jakie dane mogą być przetwarzane podczas korzystania z serwisu, formularza kontaktowego i darmowej bazy firm tworzonej z publicznie dostępnych źródeł."
      sections={[
        {
          title: '1. Administrator danych',
          paragraphs: [
            `Administratorem danych osobowych jest ${company}, NIP ${legal.nip || '8882867477'}, z siedzibą pod adresem ${legal.address || 'Apteczna 10A, 87-860 Chodecz'}.`,
            `Kontakt z administratorem jest możliwy pod adresem e-mail: ${email}.`,
          ],
        },
        {
          title: '2. Dane z formularza kontaktowego',
          items: [
            'imię lub nazwa osoby kontaktowej,',
            'adres e-mail, numer telefonu i nazwa firmy, jeśli zostaną podane,',
            'treść wiadomości przesłanej przez formularz lub e-mail,',
            'informacje potrzebne do obsługi zgłoszenia brakującej branży, miasta, zakresu danych lub błędu w bazie,',
            'dane techniczne, takie jak adres IP, informacje o przeglądarce, urządzeniu i sposobie korzystania ze strony.',
          ],
        },
        {
          title: '3. Dane w bazie firm',
          paragraphs: [
            'Baza LocalLeads może zawierać informacje o podmiotach gospodarczych pochodzące z publicznie dostępnych źródeł, takich jak strony internetowe firm, publiczne profile społecznościowe, katalogi firm, rejestry, wizytówki internetowe oraz inne publiczne zasoby.',
            'Zakres takich danych może obejmować m.in. nazwę firmy, branżę, adres, miasto, stronę internetową, publiczny numer telefonu, publiczny adres e-mail, link do Facebooka, link do Instagrama lub inne publicznie dostępne informacje biznesowe.',
            'W przypadku osób fizycznych prowadzących działalność gospodarczą część tych informacji może stanowić dane osobowe w rozumieniu RODO.',
          ],
        },
        {
          title: '4. Cele przetwarzania',
          items: [
            'udzielenie odpowiedzi na wiadomość przesłaną przez formularz lub e-mail,',
            'obsługa zgłoszeń brakujących branż, miast, zakresów danych lub błędów w bazie,',
            'porządkowanie i aktualizacja publicznie dostępnych informacji biznesowych,',
            'ochrona serwisu, dochodzenie lub obrona przed roszczeniami,',
            'analiza działania strony i poprawa jakości serwisu z użyciem Google Analytics 4 oraz Microsoft Clarity, jeśli użytkownik wyrazi zgodę na cookies analityczne.',
          ],
        },
        {
          title: '5. Podstawy prawne przetwarzania',
          items: [
            'art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes administratora, w tym obsługa kontaktu, ochrona serwisu oraz analiza publicznie dostępnych informacji biznesowych,',
            'art. 6 ust. 1 lit. c RODO — realizacja obowiązków prawnych, jeśli mają zastosowanie,',
            'art. 6 ust. 1 lit. a RODO — zgoda, w szczególności dla opcjonalnych cookies analitycznych Google Analytics 4 i Microsoft Clarity.',
          ],
        },
        {
          title: '6. Odbiorcy danych',
          paragraphs: [
            'Dane mogą być przekazywane podmiotom wspierającym administratora w prowadzeniu serwisu, wyłącznie w zakresie niezbędnym do realizacji danego celu.',
          ],
          items: legal.dataServices || [
            'hosting strony internetowej,',
            'poczta elektroniczna,',
            'formularz kontaktowy,',
            'Google Analytics 4, jeżeli użytkownik wyrazi zgodę na cookies analityczne,',
            'Microsoft Clarity, jeżeli użytkownik wyrazi zgodę na cookies analityczne.',
          ],
        },
        {
          title: '7. Okres przechowywania danych',
          paragraphs: [
            'Dane z korespondencji przechowywane są przez okres potrzebny do obsługi zgłoszenia oraz zabezpieczenia ewentualnych roszczeń.',
            'Dane przetwarzane na podstawie zgody są przetwarzane do czasu jej wycofania, chyba że istnieje inna podstawa prawna dalszego przetwarzania.',
            'Informacje analityczne przetwarzane przez Google Analytics 4 i Microsoft Clarity są przechowywane zgodnie z ustawieniami tych narzędzi oraz ich dokumentacją. Zmiana lub cofnięcie zgody blokuje dalsze uruchamianie tych narzędzi bez zgody użytkownika.',
            'Dane wykorzystywane w bazie firm są aktualizowane lub usuwane, gdy administrator otrzyma wiarygodną informację o ich nieaktualności, błędzie albo zasadnym sprzeciwie.',
          ],
        },
        {
          title: '8. Prawa osoby, której dane dotyczą',
          items: [
            'prawo dostępu do danych,',
            'prawo sprostowania danych,',
            'prawo usunięcia danych,',
            'prawo ograniczenia przetwarzania,',
            'prawo wniesienia sprzeciwu,',
            'prawo cofnięcia zgody w dowolnym momencie, jeżeli dane są przetwarzane na podstawie zgody.',
          ],
        },
        {
          title: '9. Realizacja praw i kontakt',
          paragraphs: [
            `Żądania dotyczące danych osobowych można kierować na adres e-mail: ${email}.`,
            'Administrator może poprosić o informacje pozwalające potwierdzić tożsamość osoby zgłaszającej żądanie lub zidentyfikować dane, których dotyczy zgłoszenie.',
          ],
        },
        {
          title: '10. Zmiany polityki prywatności',
          paragraphs: [
            'Polityka prywatności może być aktualizowana w przypadku zmiany przepisów prawa, sposobu działania serwisu lub narzędzi wykorzystywanych do przetwarzania danych.',
            'Aktualna wersja polityki prywatności jest publikowana w serwisie.',
          ],
        },
      ]}
    />
  );
}
