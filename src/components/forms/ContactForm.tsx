"use client";

import { useState } from 'react';
import { getButtonClass, getInputClass } from '@/lib/uiStyles';
import { buildContactMessage } from '@/lib/contact';

type ContactFormProps = {
  source?: string;
  topic?: string;
  packageName?: string;
  city?: string;
  industry?: string;
  compact?: boolean;
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm({ source, topic, packageName, city, industry, compact = false }: ContactFormProps) {
  const subject = [packageName, industry, city].filter(Boolean).join(' / ');
  const message = buildContactMessage({ source, topic, packageName, city, industry });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      topic: String(formData.get('topic') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      source: String(formData.get('source') || '').trim(),
      website: String(formData.get('website') || '').trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || 'Nie udało się wysłać wiadomości.');
      }

      setStatus('success');
      form.reset();
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Nie udało się wysłać wiadomości.');
    }
  }

  const isSending = status === 'sending';

  return (
    <form
      className="grid gap-4 rounded-3xl border border-[var(--brand-line)] bg-[var(--brand-surface)]/70 p-7 shadow-[0_24px_70px_rgba(0,0,0,.25)]"
      onSubmit={handleSubmit}
    >
      <input className={getInputClass()} name="name" placeholder="Imię" autoComplete="name" required />
      <input className={getInputClass()} name="email" placeholder="Email" type="email" autoComplete="email" required />
      <input className={getInputClass()} name="phone" placeholder="Telefon (opcjonalnie)" type="tel" autoComplete="tel" />
      <input
        className={getInputClass()}
        name="topic"
        placeholder="Eksport CSV / brakująca branża / brakujące miasto"
        defaultValue={subject || topic || ''}
        required
      />
      <textarea
        className={getInputClass({ className: compact ? 'min-h-28' : 'min-h-40' })}
        name="message"
        placeholder="Opisz, czego potrzebujesz: eksport CSV, brakująca branża, brakujące miasto lub zgłoszenie błędu w bazie."
        defaultValue={message}
        required
      />
      {source ? <input type="hidden" name="source" value={source} /> : null}

      {/* Honeypot antyspam: normalny użytkownik tego nie widzi i nie wypełnia. */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        name="website"
        aria-hidden="true"
      />

      <button className={getButtonClass({ tone: 'primary' })} type="submit" disabled={isSending}>
        {isSending ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </button>

      {status === 'success' ? (
        <p className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
          Dziękuję. Wiadomość została wysłana. Odpowiem możliwie szybko.
        </p>
      ) : null}

      {status === 'error' ? (
        <p className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">
          {errorMessage || 'Nie udało się wysłać wiadomości. Spróbuj ponownie albo napisz bezpośrednio na kontakt@localleads.pl.'}
        </p>
      ) : null}
    </form>
  );
}
