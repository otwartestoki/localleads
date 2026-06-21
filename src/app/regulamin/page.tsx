import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';
import { site } from '@/config/site';

const legal = (site as any).legal || {};

export const metadata: Metadata = {
  title: `Regulamin | ${site.name}`,
  description: `Regulamin korzystania z serwisu ${site.name} i darmowej bazy firm tworzonej z publicznie dostępnych informacji.`,
};

export default function TermsPage() {
  const company = legal.companyName || 'Jacek Smętkowski ProjektJS';
  const email = legal.email || site.contact?.email || 'kontakt@localleads.pl';

  return (
    <LegalPage
      eyebrow="Dokumenty prawne"
      title="Regulamin serwisu"
      lead={`Zasady korzystania ze strony ${site.name}, darmowej bazy firm oraz formularza kontaktowego.`}
      sections={[
        {
          title: '1. Postanowienia ogólne',
          paragraphs: [
            `Niniejszy regulamin określa zasady korzystania z serwisu internetowego prowadzonego przez ${company}, NIP ${legal.nip || '8882867477'}, z siedzibą pod adresem ${legal.address || 'Apteczna 10A, 87-860 Chodecz'}.`,
            'Serwis ma charakter informacyjny. Umożliwia przeglądanie darmowej bazy firm, korzystanie z publicznie dostępnych danych oraz kontakt z administratorem.',
            'Regulamin jest kierowany do osób korzystających z serwisu, w szczególności przedsiębiorców, freelancerów, agencji i osób analizujących lokalny rynek.',
          ],
        },
        {
          title: '2. Charakter bazy',
          paragraphs: [
            'Baza LocalLeads opiera się na publicznie dostępnych informacjach o firmach, takich jak nazwa, branża, miasto, adres, strona WWW, telefon lub publiczne profile społecznościowe.',
            'Dane są udostępniane do przeglądania online. Administrator dokłada starań, aby baza była czytelna i użyteczna, ale nie gwarantuje kompletności ani aktualności każdego rekordu.',
            'Publiczna dostępność danych nie oznacza dowolności ich wykorzystania. Użytkownik powinien samodzielnie ocenić legalność dalszego użycia danych, zwłaszcza przy komunikacji marketingowej.',
          ],
        },
        {
          title: '3. Zgłoszenia braków i błędów',
          paragraphs: [
            `Brakujące branże, miasta, zakresy danych lub błędy w rekordach można zgłaszać przez formularz kontaktowy albo na adres e-mail: ${email}.`,
            'Zgłoszenie powinno możliwie jasno opisywać branżę, miasto, region, nazwę firmy albo problem w danych.',
            'Administrator może wykorzystać zgłoszenie do rozwoju, korekty lub uporządkowania bazy.',
          ],
        },
        {
          title: '4. Zasady korzystania',
          paragraphs: [
            'Użytkownik powinien korzystać z serwisu zgodnie z prawem, dobrymi obyczajami i zasadami bezpiecznego przetwarzania danych.',
            'Zabronione jest wykorzystywanie serwisu do spamu, nękania, podszywania się pod inne podmioty, działań wprowadzających w błąd lub działań naruszających prawa osób trzecich.',
            'Użytkownik odpowiada za własny sposób wykorzystania informacji znalezionych w serwisie.',
          ],
        },
        {
          title: '5. Ograniczenia odpowiedzialności',
          paragraphs: [
            'Dane firmowe mogą się zmieniać, w szczególności w zakresie numerów telefonów, adresów, stron internetowych, profili społecznościowych, godzin działania lub statusu działalności.',
            'Administrator nie gwarantuje określonych wyników biznesowych, marketingowych ani sprzedażowych wynikających z korzystania z bazy.',
            'Administrator może czasowo ograniczyć dostęp do serwisu z powodów technicznych, bezpieczeństwa lub rozwoju strony.',
          ],
        },
        {
          title: '6. Reklamacje i kontakt',
          paragraphs: [
            `Uwagi dotyczące działania serwisu można zgłaszać na adres e-mail: ${email}.`,
            'Zgłoszenie powinno zawierać opis problemu oraz, jeśli to możliwe, link do strony lub nazwę rekordu, którego dotyczy sprawa.',
          ],
        },
        {
          title: '7. Własność intelektualna',
          paragraphs: [
            'Treści, układ graficzny, teksty, elementy identyfikacji oraz materiały znajdujące się w serwisie są chronione prawem autorskim lub innymi właściwymi przepisami.',
            'Kopiowanie lub rozpowszechnianie materiałów z serwisu bez zgody administratora jest zabronione, chyba że przepisy prawa stanowią inaczej.',
          ],
        },
        {
          title: '8. Zmiany regulaminu',
          paragraphs: [
            'Regulamin może być aktualizowany w przypadku zmiany przepisów prawa, sposobu działania serwisu lub zakresu danych udostępnianych w bazie.',
            'Aktualna wersja regulaminu jest publikowana w serwisie.',
          ],
        },
      ]}
    />
  );
}
