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

export default function ContactForm({ source, topic, packageName, city, industry, compact = false }: ContactFormProps) {
  const subject = [packageName, industry, city].filter(Boolean).join(' / ');
  const message = buildContactMessage({ source, topic, packageName, city, industry });

  return (
    <form className="grid gap-4 rounded-3xl border border-[var(--brand-line)] bg-[var(--brand-surface)]/70 p-7 shadow-[0_24px_70px_rgba(0,0,0,.25)]">
      <input className={getInputClass()} name="name" placeholder="Imię" autoComplete="name" />
      <input className={getInputClass()} name="email" placeholder="Email" type="email" autoComplete="email" />
      <input
        className={getInputClass()}
        name="topic"
        placeholder="Branża / miasto / region"
        defaultValue={subject || topic || ''}
      />
      <textarea
        className={getInputClass({ className: compact ? 'min-h-28' : 'min-h-40' })}
        name="message"
        placeholder="Np. salony beauty w Łodzi, dentysta Warszawa, firmy budowlane woj. śląskie"
        defaultValue={message}
      />
      {source ? <input type="hidden" name="source" value={source} /> : null}
      <button className={getButtonClass({ tone: 'primary' })} type="button">Wyślij zapytanie</button>
    </form>
  );
}
