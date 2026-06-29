import type { Metadata } from 'next';
import CookieSettingsButton from '@/components/CookieSettingsButton';
import LegalPage from '@/components/pages/LegalPage';
import { site } from '@/config/site';

const legal = (site as any).legal || {};

export const metadata: Metadata = {
  title: `Polityka cookies | ${site.name}`,
  description: `Informacje o plikach cookies używanych w serwisie ${site.name}.`,
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      title="Polityka cookies"
      lead="Informacje o tym, czym są pliki cookies, w jakim celu mogą być używane oraz jak użytkownik może nimi zarządzać."
      sections={[
          {
            title: '1. Czym są pliki cookies',
            paragraphs: [
              'Pliki cookies to niewielkie pliki tekstowe zapisywane na urządzeniu użytkownika podczas korzystania ze strony internetowej. Mogą być wykorzystywane do prawidłowego działania strony, zapamiętywania ustawień, analityki lub działań marketingowych.',
            ],
          },
          {
            title: '2. Rodzaje cookies używane w serwisie',
            items: [
              'cookies niezbędne — potrzebne do prawidłowego działania strony, bezpieczeństwa, formularzy i podstawowych funkcji serwisu,',
              'cookies analityczne — pomagają zrozumieć, jak użytkownicy korzystają ze strony; obejmują Google Analytics 4 oraz Microsoft Clarity i są uruchamiane tylko wtedy, gdy użytkownik wyrazi zgodę,',
              'cookies marketingowe — mogą służyć do remarketingu lub mierzenia skuteczności reklam; są uruchamiane tylko po uzyskaniu zgody, jeżeli takie narzędzia są wdrożone.',
            ],
          },
          {
            title: '3. Cele stosowania cookies',
            items: [
              'zapewnienie prawidłowego działania serwisu,',
              'zabezpieczenie formularzy i podstawowych funkcji strony,',
              'analiza ruchu i poprawa jakości strony,',
              'zapamiętanie preferencji użytkownika, w tym decyzji dotyczącej zgód cookies.',
            ],
          },
          {
            title: '4. Zgoda na cookies',
            paragraphs: [
              'Cookies niezbędne mogą być stosowane bez dodatkowej zgody, ponieważ są potrzebne do działania strony. Cookies analityczne i marketingowe powinny być uruchamiane dopiero po wyrażeniu zgody przez użytkownika. Aktualny mechanizm zgód na stronie rozróżnia cookies niezbędne, analityczne i marketingowe.',
              'Użytkownik może w dowolnym momencie zmienić ustawienia cookies w przeglądarce albo ponownie otworzyć ustawienia zgód na tej stronie. Strona zapisuje decyzję użytkownika w localStorage pod kluczem localleads-cookie-consent-v1 i udostępnia baner zgody z możliwością akceptacji wszystkich, odrzucenia opcjonalnych lub wyboru kategorii cookies.',
            ],
          },
          {
            title: '5. Zarządzanie cookies w przeglądarce',
            paragraphs: [
              'Użytkownik może samodzielnie zablokować lub usunąć pliki cookies w ustawieniach swojej przeglądarki internetowej. Ograniczenie cookies niezbędnych może jednak wpłynąć na prawidłowe działanie niektórych funkcji strony.',
            ],
          },
          {
            title: '6. Narzędzia zewnętrzne',
            paragraphs: [
              'Serwis może korzystać z narzędzi zewnętrznych, takich jak analityka internetowa, systemy formularzy, hosting lub rozwiązania techniczne obsługujące stronę. Zakres ich użycia zależy od aktualnej konfiguracji serwisu.',
              'Po wyrażeniu zgody na cookies analityczne serwis może uruchomić Google Analytics 4 w celu pomiaru ruchu, źródeł odwiedzin i podstawowych interakcji oraz Microsoft Clarity w celu analizy sposobu korzystania ze strony, np. nagrań sesji, map kliknięć i przewijania. Te narzędzia mogą zapisywać własne cookies lub podobne identyfikatory zgodnie ze swoimi zasadami.',
              `Administratorem strony jest ${legal.companyName || 'Jacek Smętkowski ProjektJS'}, NIP ${legal.nip || '8882867477'}, ${legal.address || 'Apteczna 10A, 87-860 Chodecz'}.`,
            ],
          },
          {
            title: '7. Zmiany polityki cookies',
            paragraphs: [
              'Polityka cookies może być aktualizowana w przypadku zmiany konfiguracji serwisu, wdrożenia nowych narzędzi lub zmiany przepisów prawa. Aktualna wersja dokumentu jest dostępna na tej stronie.',
            ],
          },
      ]}
    >
      <CookieSettingsButton />
    </LegalPage>
  );
}
