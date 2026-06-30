export default function StatsSection() {
  return (
    <section className="mt-12 border-t border-white/10 pt-10">
      <h2 className="text-3xl font-black">Statystyki bazy</h2>

      <p className="mt-4 text-[var(--brand-muted)]">
        Darmowa baza firm jest stale rozwijana. Jeżeli brakuje Ci konkretnej branży, miasta albo zakresu danych,
        skontaktuj się przez formularz kontaktowy.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 p-5">
          <div className="text-sm text-[var(--brand-muted)]">Firmy</div>
          <div className="text-3xl font-black">Dynamicznie z bazy</div>
        </div>

        <div className="rounded-2xl border border-white/10 p-5">
          <div className="text-sm text-[var(--brand-muted)]">Branże</div>
          <div className="text-3xl font-black">Dynamicznie z bazy</div>
        </div>

        <div className="rounded-2xl border border-white/10 p-5">
          <div className="text-sm text-[var(--brand-muted)]">WWW i kontakty</div>
          <div className="text-3xl font-black">Dynamicznie z bazy</div>
        </div>
      </div>
    </section>
  );
}
