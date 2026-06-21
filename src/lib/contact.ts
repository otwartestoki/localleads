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
  if (intent.packageName) params.set('zakres', intent.packageName);
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

korzystam z darmowej bazy firm LocalLeads i nie widzę potrzebnego zakresu danych.

Interesuje mnie:
- Zakres: ${intent.packageName}
${industry}
${city}
- Przybliżona liczba rekordów:

Proszę o informację, czy taka branża, miasto lub zakres mogą zostać dodane do bazy.`;
  }

  return `Dzień dobry,

korzystam z darmowej bazy firm LocalLeads i nie widzę potrzebnych danych.

Interesuje mnie:
${topic}
${industry}
${city}
- Przybliżona liczba rekordów:

Proszę o informację, czy taka branża, miasto lub zakres mogą zostać dodane do bazy.`;
}
