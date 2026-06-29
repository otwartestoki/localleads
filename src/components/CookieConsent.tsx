'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'localleads-cookie-consent-v1';

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
};

function saveConsent(consent: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent('localleads-cookie-consent-change', { detail: consent }));
  } catch {
    // localStorage może być niedostępny np. w trybie prywatnym.
  }
}

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function createConsent(analytics: boolean, marketing: boolean): ConsentState {
  return {
    necessary: true,
    analytics,
    marketing,
    savedAt: new Date().toISOString(),
  };
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (!saved) {
      setVisible(true);
      return;
    }

    setAnalytics(Boolean(saved.analytics));
    setMarketing(Boolean(saved.marketing));
  }, []);

  useEffect(() => {
    const openSettings = () => {
      const saved = readConsent();
      setAnalytics(Boolean(saved?.analytics));
      setMarketing(Boolean(saved?.marketing));
      setVisible(true);
      setSettingsOpen(true);
    };

    window.addEventListener('localleads-open-cookie-settings', openSettings);
    return () => window.removeEventListener('localleads-open-cookie-settings', openSettings);
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  const acceptAll = () => {
    saveConsent(createConsent(true, true));
    setAnalytics(true);
    setMarketing(true);
    setVisible(false);
    setSettingsOpen(false);
  };

  const rejectOptional = () => {
    saveConsent(createConsent(false, false));
    setAnalytics(false);
    setMarketing(false);
    setVisible(false);
    setSettingsOpen(false);
  };

  const saveSelected = () => {
    saveConsent(createConsent(analytics, marketing));
    setVisible(false);
    setSettingsOpen(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-4 pb-4 sm:px-6 sm:pb-6" role="dialog" aria-modal="true" aria-label="Ustawienia cookies">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#020617]/95 text-white shadow-2xl shadow-sky-950/40 backdrop-blur">
        <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#38bdf8]">Cookies</p>
            <h2 className="text-xl font-bold md:text-2xl">Szanujemy Twoją prywatność</h2>
            <p className="max-w-3xl text-sm leading-6 text-slate-300">
              Używamy cookies niezbędnych do działania strony. Opcjonalne cookies analityczne i marketingowe uruchamiamy dopiero po Twojej zgodzie. Decyzję możesz zmienić w dowolnym momencie w polityce cookies.
            </p>
            <p className="text-xs text-slate-500">Wersja zgód: {year}</p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-full bg-[#38bdf8] px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-300"
            >
              Akceptuję wszystkie
            </button>
            <button
              type="button"
              onClick={rejectOptional}
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-[#38bdf8] hover:text-[#38bdf8]"
            >
              Odrzucam opcjonalne
            </button>
            <button
              type="button"
              onClick={() => setSettingsOpen((value) => !value)}
              className="rounded-full px-5 py-3 text-sm font-bold text-slate-300 transition hover:text-[#38bdf8]"
            >
              Ustawienia
            </button>
          </div>
        </div>

        {settingsOpen && (
          <div className="border-t border-white/10 p-5 md:p-6">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold">Niezbędne</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">zawsze aktywne</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">Potrzebne do działania strony, bezpieczeństwa i zapamiętania Twojej decyzji.</p>
              </div>

              <label className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#38bdf8]/60">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold">Analityczne</h3>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(event) => setAnalytics(event.target.checked)}
                    className="h-5 w-5 accent-[#38bdf8]"
                  />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">Pomagają mierzyć ruch i poprawiać stronę z użyciem Google Analytics 4 oraz Microsoft Clarity.</p>
              </label>

              <label className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#38bdf8]/60">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold">Marketingowe</h3>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(event) => setMarketing(event.target.checked)}
                    className="h-5 w-5 accent-[#38bdf8]"
                  />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">Służą do remarketingu i mierzenia skuteczności reklam, jeżeli takie narzędzia są wdrożone.</p>
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/polityka-cookies" className="text-sm font-semibold text-[#38bdf8] hover:text-sky-300">
                Przeczytaj politykę cookies
              </Link>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button type="button" onClick={rejectOptional} className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-[#38bdf8] hover:text-[#38bdf8]">
                  Odrzuć opcjonalne
                </button>
                <button type="button" onClick={saveSelected} className="rounded-full bg-[#38bdf8] px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-300">
                  Zapisz wybór
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
