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
  const parts = [];

  if (intent.packageName) parts.push(`pakiet: ${intent.packageName}`);
  if (intent.industry) parts.push(`branża: ${intent.industry}`);
  if (intent.city) parts.push(`lokalizacja: ${intent.city}`);
  if (intent.topic) parts.push(intent.topic);

  if (parts.length === 0) {
    return 'Dzień dobry, interesuje mnie baza leadów B2B w CSV. Proszę o propozycję zakresu i ceny.';
  }

  return `Dzień dobry, interesuje mnie ${parts.join(', ')}. Proszę o propozycję zakresu, dostępności danych i ceny.`;
}
