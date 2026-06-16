export type ContactIntent = {
  source?: string;
  topic?: string;
  packageName?: string;
  city?: string;
  industry?: string;
};

export function contactHref(intent: ContactIntent = {}) {
  const params = new URLSearchParams();

  if (intent.source) params.set('zrodlo', intent.source);
  if (intent.topic) params.set('temat', intent.topic);
  if (intent.packageName) params.set('pakiet', intent.packageName);
  if (intent.city) params.set('miasto', intent.city);
  if (intent.industry) params.set('branza', intent.industry);

  const query = params.toString();
  return query ? `/kontakt?${query}` : '/kontakt';
}

export function buildContactMessage(intent: ContactIntent = {}) {
  const industry = intent.industry ? `- Branża: ${intent.industry}` : '- Branża:';
  const city = intent.city ? `- Miasto/obszar: ${intent.city}` : '- Miasto/obszar:';
  const topic = intent.topic ? `- Temat: ${intent.topic}` : '- Temat:';

  if (intent.packageName) {
    return `Dzień dobry,

chciałbym zamówić eksport danych do pliku CSV.

Interesuje mnie:
- Zakres: ${intent.packageName}
${industry}
${city}
- Przybliżona liczba rekordów:

Proszę o informację, czy taki eksport jest możliwy i jaka byłaby cena.`;
  }

  return `Dzień dobry,

korzystam z darmowej bazy firm LocalLeads i potrzebuję dodatkowych danych lub eksportu CSV.

Interesuje mnie:
${topic}
${industry}
${city}
- Przybliżona liczba rekordów:

Proszę o informację, czy taki zakres jest dostępny i jaka byłaby cena eksportu.`;
}
