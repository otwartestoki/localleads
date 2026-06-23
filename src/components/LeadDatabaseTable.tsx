"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { radiusClass } from "@/lib/style";
import { getButtonClass } from "@/lib/uiStyles";
import type { LeadDatabaseStats } from "@/lib/leadsSeo";

export type LeadRecord = Record<string, string | number | boolean | null | undefined>;

type ApiResponse = {
  data: LeadRecord[];
  count: number;
  page: number;
  limit: number;
  stats?: LeadDatabaseStats;
  error: string | null;
};

const emptyStats: LeadDatabaseStats = {
  total: 0,
  categories: [],
  cities: [],
  totalCategories: 0,
  totalCities: 0,
  websites: 0,
  phones: 0,
  emails: 0,
  facebook: 0,
  instagram: 0,
};

const preferredColumns = [
  "name",
  "company_name",
  "address",
  "category",
  "phone",
  "website",
  "email",
  "facebook",
  "instagram",
] as const;

const hiddenColumns = new Set([
  "id",
  "created_at",
  "updated_at",
  "city",
  "latitude",
  "lat",
  "longitude",
  "lng",
  "place_id",
  "placeid",
  "google_place_id",
]);

const labels: Record<string, string> = {
  name: "Firma",
  company_name: "Firma",
  address: "Adres",
  category: "Branża",
  phone: "Telefon",
  website: "WWW",
  email: "E-mail",
  facebook: "Facebook",
  instagram: "Instagram",
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("pl-PL").format(value);
}

function isLinkColumn(key: string, value: unknown) {
  if (!value || typeof value !== "string") return false;
  return ["website", "facebook", "instagram"].includes(key) || value.startsWith("http");
}

function cleanValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "tak" : "nie";
  return String(value);
}

function normalizeUrl(value: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}

export default function LeadDatabaseTable() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [count, setCount] = useState(0);
  const [stats, setStats] = useState<LeadDatabaseStats>(emptyStats);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = 25;
  const totalPages = Math.max(1, Math.ceil(count / limit));

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (query.trim()) params.set("q", query.trim());
      if (category.trim()) params.set("category", category.trim());

      try {
        const response = await fetch(`/api/leads?${params.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const result = (await response.json()) as ApiResponse;

        if (!response.ok || result.error) {
          throw new Error(result.error || "Nie udało się pobrać bazy firm.");
        }

        setLeads(result.data || []);
        setCount(result.count || 0);
        setStats(result.stats || emptyStats);
      } catch (fetchError) {
        if ((fetchError as Error).name !== "AbortError") {
          setLeads([]);
          setCount(0);
          setStats(emptyStats);
          setError((fetchError as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [page, query, category]);

  useEffect(() => {
    setPage(1);
  }, [query, category]);

  const columns = useMemo(() => {
    const allKeys = Array.from(new Set(leads.flatMap((lead) => Object.keys(lead))));
    const preferred = preferredColumns.filter((key) => allKeys.includes(key));
    return [
      ...preferred,
      ...allKeys.filter(
        (key) => !preferred.includes(key as any) && !hiddenColumns.has(key.toLowerCase()),
      ),
    ];
  }, [leads]);

  return (
    <div className={`${radiusClass()} border border-[var(--brand-line)] bg-[var(--brand-surface)]/75 p-4 shadow-[0_24px_90px_rgba(56,189,248,.1)] md:p-6`}>
      <div className="grid gap-3 md:grid-cols-[1.3fr_.7fr]">
        <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)]">
          Szukaj
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="szuka po wszystkich danych"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[var(--brand-primary)]/70"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)]">
          Branża
          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="np. Fryzjer"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[var(--brand-primary)]/70"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-[var(--brand-muted)]">
        <span>
          Wyniki: <span className="text-[var(--brand-primary-soft)]">{formatNumber(count)}</span>
        </span>
        <span>
          Strona <span className="text-[var(--brand-primary-soft)]">{page}</span> z {totalPages}
        </span>
      </div>

      <section className="mt-5 rounded-3xl border border-white/10 bg-white/[.035] p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand-primary-soft)]">
              Podsumowanie wyników
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-.03em] text-white">
              Statystyki zmieniają się razem z wyszukiwaniem
            </h2>
          </div>
          <Link href="/indeks-bazy" className="text-sm font-black text-[var(--brand-primary-soft)] hover:underline">
            Zobacz pełny indeks bazy
          </Link>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
            <div className="text-xs font-bold text-[var(--brand-muted)]">Firmy</div>
            <div className="mt-1 text-3xl font-black text-white">{formatNumber(stats.total)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
            <div className="text-xs font-bold text-[var(--brand-muted)]">Branże</div>
            <div className="mt-1 text-3xl font-black text-white">{formatNumber(stats.totalCategories)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
            <div className="text-xs font-bold text-[var(--brand-muted)]">Miasta</div>
            <div className="mt-1 text-3xl font-black text-white">{formatNumber(stats.totalCities)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
            <div className="text-xs font-bold text-[var(--brand-muted)]">WWW</div>
            <div className="mt-1 text-3xl font-black text-white">{formatNumber(stats.websites)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
            <div className="text-xs font-bold text-[var(--brand-muted)]">Telefony</div>
            <div className="mt-1 text-3xl font-black text-white">{formatNumber(stats.phones)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
            <div className="text-xs font-bold text-[var(--brand-muted)]">FB</div>
            <div className="mt-1 text-3xl font-black text-white">{formatNumber(stats.facebook)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
            <div className="text-xs font-bold text-[var(--brand-muted)]">IG</div>
            <div className="mt-1 text-3xl font-black text-white">{formatNumber(stats.instagram)}</div>
          </div>
        </div>
      </section>

      {error ? (
        <div className={`${radiusClass()} mt-5 border border-red-400/30 bg-red-500/10 p-6 text-sm font-bold leading-6 text-red-100`}>
          Nie udało się pobrać danych: {error}
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-3xl border border-white/10">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-white/[.06] text-xs uppercase tracking-[.14em] text-[var(--brand-primary-soft)]">
              <tr>
                {columns.length > 0 ? columns.map((column) => (
                  <th key={column} className="whitespace-nowrap px-4 py-4 font-black">
                    {labels[column] || column.replaceAll("_", " ")}
                  </th>
                )) : (
                  <th className="whitespace-nowrap px-4 py-4 font-black">Baza firm</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {isLoading ? (
                <tr>
                  <td colSpan={Math.max(columns.length, 1)} className="px-4 py-10 text-center text-[var(--brand-muted)]">
                    Ładowanie danych...
                  </td>
                </tr>
              ) : leads.length > 0 ? leads.map((lead, index) => (
                <tr key={String(lead.id || index)} className="align-top transition hover:bg-white/[.04]">
                  {columns.map((column) => {
                    const value = cleanValue(lead[column]);
                    return (
                      <td key={column} className="max-w-[260px] px-4 py-4 text-[var(--brand-muted)]">
                        {isLinkColumn(column, value) && value !== "—" ? (
                          <Link href={normalizeUrl(value)} target="_blank" rel="noreferrer" className="font-bold text-[var(--brand-primary-soft)] hover:underline">
                            otwórz
                          </Link>
                        ) : (
                          <span className="line-clamp-3">{value}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              )) : (
                <tr>
                  <td colSpan={Math.max(columns.length, 1)} className="px-4 py-10 text-center text-[var(--brand-muted)]">
                    Brak wyników dla wybranych filtrów.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page <= 1 || isLoading}
          className={`${getButtonClass({ tone: "secondary" })} disabled:pointer-events-none disabled:opacity-40`}
        >
          Poprzednia strona
        </button>
        <button
          type="button"
          onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          disabled={page >= totalPages || isLoading}
          className={`${getButtonClass({ tone: "primary" })} disabled:pointer-events-none disabled:opacity-40`}
        >
          Następna strona
        </button>
      </div>


    </div>
  );
}
