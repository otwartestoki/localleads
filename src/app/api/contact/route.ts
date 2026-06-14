import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  source?: string;
  website?: string;
};

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'kontakt@localleads.pl';
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'kontakt@localleads.pl';
const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'LocalLeads';

function clean(value: unknown) {
  return String(value || '').trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
    .replaceAll('\n', '<br />');
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getSafeBrevoError(status: number, raw: string) {
  const lower = raw.toLowerCase();

  if (status === 401 || lower.includes('unauthorized') || lower.includes('api key')) {
    return 'Brevo odrzuciło API Key. Sprawdź BREVO_API_KEY w Vercel i zrób ponowny Deploy.';
  }

  if (lower.includes('sender') || lower.includes('not valid') || lower.includes('not verified') || lower.includes('unauthorized sender')) {
    return `Brevo odrzuciło nadawcę ${SENDER_EMAIL}. Dodaj i zweryfikuj tego nadawcę w Brevo: Settings → Senders.`;
  }

  if (lower.includes('domain') || lower.includes('dkim') || lower.includes('spf') || lower.includes('authenticated')) {
    return 'Brevo odrzuciło domenę. Sprawdź, czy localleads.pl ma status Authenticated/Verified w Brevo i czy rekordy DNS są poprawne w Cloudflare.';
  }

  if (lower.includes('insufficient') || lower.includes('credits') || lower.includes('limit')) {
    return 'Brevo odrzuciło wysyłkę przez limit lub brak aktywnego planu transakcyjnego.';
  }

  return 'Brevo odrzuciło wiadomość. Szczegóły znajdziesz w Vercel → Functions/Runtime Logs.';
}

export async function POST(request: Request) {
  if (!process.env.BREVO_API_KEY) {
    console.error('Contact form error: missing BREVO_API_KEY');
    return NextResponse.json(
      { ok: false, message: 'Brakuje zmiennej BREVO_API_KEY w Vercel. Dodaj ją w Project Settings → Environment Variables i zrób Redeploy.' },
      { status: 500 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Nieprawidłowe dane formularza.' },
      { status: 400 }
    );
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const topic = clean(payload.topic);
  const message = clean(payload.message);
  const source = clean(payload.source);
  const website = clean(payload.website);

  // Honeypot antyspam. Jeśli bot wypełni ukryte pole, udajemy sukces i nie wysyłamy maila.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !topic || !message) {
    return NextResponse.json(
      { ok: false, message: 'Uzupełnij imię, email, temat i wiadomość.' },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: 'Podaj poprawny adres email.' },
      { status: 400 }
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || '-');
  const safeTopic = escapeHtml(topic);
  const safeMessage = escapeHtml(message);
  const safeSource = escapeHtml(source || '-');

  try {
    const brevoResponse = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: SENDER_NAME,
          email: SENDER_EMAIL,
        },
        to: [
          {
            email: CONTACT_EMAIL,
            name: 'LocalLeads',
          },
        ],
        replyTo: {
          email,
          name,
        },
        subject: `Nowe zapytanie z LocalLeads: ${topic}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
            <h2 style="margin: 0 0 16px;">Nowe zapytanie z formularza LocalLeads</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
              <tr><td style="padding: 8px 0; font-weight: 700; width: 130px;">Imię:</td><td>${safeName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 700;">Email:</td><td>${safeEmail}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 700;">Telefon:</td><td>${safePhone}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 700;">Temat:</td><td>${safeTopic}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 700;">Źródło:</td><td>${safeSource}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="font-weight: 700; margin-bottom: 8px;">Wiadomość:</p>
            <p style="white-space: normal;">${safeMessage}</p>
          </div>
        `,
        textContent: `Nowe zapytanie z formularza LocalLeads\n\nImię: ${name}\nEmail: ${email}\nTelefon: ${phone || '-'}\nTemat: ${topic}\nŹródło: ${source || '-'}\n\nWiadomość:\n${message}`,
      }),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text().catch(() => '');
      console.error('Brevo contact form error:', {
        status: brevoResponse.status,
        sender: SENDER_EMAIL,
        to: CONTACT_EMAIL,
        error: errorText,
      });

      return NextResponse.json(
        { ok: false, message: getSafeBrevoError(brevoResponse.status, errorText) },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form unexpected error:', error);
    return NextResponse.json(
      { ok: false, message: 'Błąd połączenia z Brevo. Sprawdź Vercel → Functions/Runtime Logs.' },
      { status: 500 }
    );
  }
}
