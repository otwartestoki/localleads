'use client';

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('localleads-open-cookie-settings'))}
      className="mt-6 rounded-full bg-[#38bdf8] px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-300"
    >
      Zmień ustawienia cookies
    </button>
  );
}
