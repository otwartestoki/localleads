"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Filter,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Search,
  X,
} from "lucide-react";
import { radiusClass } from "@/lib/style";
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

type DataFlag = "website" | "phone" | "email" | "facebook" | "instagram";
type SortMode = "newest" | "name_asc" | "name_desc" | "category_asc" | "city_asc" | "completeness_desc";
type LeadWorkStatus = "new" | "checked" | "contact" | "rejected";
type StatusFilter = "all" | LeadWorkStatus;

const STATUS_STORAGE_KEY = "localleads-lead-work-status-v1";

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

const flagLabels: Record<DataFlag, string> = {
  website: "WWW",
  phone: "Telefon",
  email: "E-mail",
  facebook: "Facebook",
  instagram: "Instagram",
};

const flagParams: Record<DataFlag, string> = {
  website: "hasWebsite",
  phone: "hasPhone",
  email: "hasEmail",
  facebook: "hasFacebook",
  instagram: "hasInstagram",
};

const sortOptions: Array<{ value: SortMode; label: string }> = [
  { value: "newest", label: "Najnowsze" },
  { value: "completeness_desc", label: "Najpełniejsze dane" },
  { value: "name_asc", label: "Firma A-Z" },
  { value: "name_desc", label: "Firma Z-A" },
  { value: "category_asc", label: "Branża A-Z" },
  { value: "city_asc", label: "Miasto A-Z" },
];

const statusLabels: Record<LeadWorkStatus, string> = {
  new: "Nowe",
  checked: "Sprawdzone",
  contact: "Do kontaktu",
  rejected: "Odrzucone",
};

const statusFilterOptions: Array<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "Wszystkie" },
  { value: "new", label: "Nowe" },
  { value: "checked", label: "Sprawdzone" },
  { value: "contact", label: "Do kontaktu" },
  { value: "rejected", label: "Odrzucone" },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("pl-PL").format(value);
}

function getValue(record: LeadRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (value !== null && value !== undefined && String(value).trim() !== "") {
      return String(value).trim();
    }
  }

  return "";
}

function normalizeUrl(value: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}

function domainFromUrl(value: string) {
  try {
    const url = new URL(normalizeUrl(value));
    return url.hostname.replace(/^www\./, "");
  } catch {
    return value.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  }
}

function getLeadName(lead: LeadRecord) {
  return getValue(lead, ["name", "company_name", "firma"]) || "Firma bez nazwy";
}

function getLeadCategory(lead: LeadRecord) {
  return getValue(lead, ["category", "industry", "branza"]);
}

function getLeadCity(lead: LeadRecord) {
  return getValue(lead, ["city", "miasto"]);
}

function getLeadAddress(lead: LeadRecord) {
  return getValue(lead, ["address", "adres"]);
}

function getGoogleMapsUrl(lead: LeadRecord) {
  const name = getLeadName(lead);
  const city = getLeadCity(lead);
  const address = getLeadAddress(lead);
  const query = [name, address, city].filter(Boolean).join(", ");

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getLeadPhone(lead: LeadRecord) {
  return getValue(lead, ["phone", "telefon"]);
}

function getLeadEmail(lead: LeadRecord) {
  return getValue(lead, ["email", "e-mail", "mail"]);
}

function getLeadWebsite(lead: LeadRecord) {
  return getValue(lead, ["website", "www", "site"]);
}

function getLeadFacebook(lead: LeadRecord) {
  return getValue(lead, ["facebook", "fb"]);
}

function getLeadInstagram(lead: LeadRecord) {
  return getValue(lead, ["instagram", "ig"]);
}

function getLeadKey(lead: LeadRecord) {
  return [
    getValue(lead, ["id"]),
    getLeadName(lead),
    getLeadAddress(lead),
    getLeadCity(lead),
    getLeadPhone(lead),
    getLeadWebsite(lead),
  ]
    .filter(Boolean)
    .join("|")
    .toLowerCase();
}

function hasValue(value: string) {
  return value.trim().length > 0;
}

function getCompleteness(lead: LeadRecord) {
  return [
    getLeadWebsite(lead),
    getLeadPhone(lead),
    getLeadEmail(lead),
    getLeadFacebook(lead),
    getLeadInstagram(lead),
  ].filter(hasValue).length;
}

function getCompletenessLabel(score: number) {
  if (score >= 4) return "pełny kontakt";
  if (score >= 2) return "dobry kontakt";
  if (score === 1) return "częściowy";
  return "mało danych";
}

function getCompletenessClass(score: number) {
  if (score >= 4) return "border-emerald-300/25 bg-emerald-300/10 text-emerald-100";
  if (score >= 2) return "border-sky-300/25 bg-sky-300/10 text-sky-100";
  if (score === 1) return "border-amber-300/25 bg-amber-300/10 text-amber-100";
  return "border-white/10 bg-white/[.04] text-white/55";
}

function getStatusClass(status: LeadWorkStatus) {
  if (status === "checked") return "border-white/10 bg-white/[.04] text-white/50";
  if (status === "contact") return "border-emerald-300/25 bg-emerald-300/10 text-emerald-100";
  if (status === "rejected") return "border-red-300/25 bg-red-300/10 text-red-100";
  return "border-sky-300/20 bg-sky-300/8 text-sky-100";
}

function readStoredStatuses() {
  try {
    const raw = localStorage.getItem(STATUS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, LeadWorkStatus>) : {};
  } catch {
    return {};
  }
}

function saveStoredStatuses(statuses: Record<string, LeadWorkStatus>) {
  try {
    localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(statuses));
  } catch {
    // localStorage may be unavailable in private mode.
  }
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-[110px] rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3">
      <div className="text-[11px] font-black uppercase tracking-[.14em] text-[var(--brand-muted)]">{label}</div>
      <div className="mt-1 text-2xl font-black text-white">{formatNumber(value)}</div>
    </div>
  );
}

function ContactAction({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "noreferrer"}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[.04] text-white/72 transition hover:border-[var(--brand-primary)]/55 hover:bg-[var(--brand-primary)]/12 hover:text-[var(--brand-primary-soft)]"
    >
      {children}
    </Link>
  );
}

function LeadContactActions({ lead }: { lead: LeadRecord }) {
  const website = getLeadWebsite(lead);
  const phone = getLeadPhone(lead);
  const email = getLeadEmail(lead);
  const facebook = getLeadFacebook(lead);
  const instagram = getLeadInstagram(lead);

  return (
    <div className="flex flex-wrap gap-2">
      {website ? (
        <ContactAction href={normalizeUrl(website)} label="Otwórz stronę WWW">
          <Globe2 className="h-4 w-4" />
        </ContactAction>
      ) : null}
      {phone ? (
        <ContactAction href={`tel:${phone.replace(/\s+/g, "")}`} label="Zadzwoń">
          <Phone className="h-4 w-4" />
        </ContactAction>
      ) : null}
      {email ? (
        <ContactAction href={`mailto:${email}`} label="Napisz e-mail">
          <Mail className="h-4 w-4" />
        </ContactAction>
      ) : null}
      {facebook ? (
        <ContactAction href={normalizeUrl(facebook)} label="Otwórz Facebook">
          <span className="text-xs font-black">FB</span>
        </ContactAction>
      ) : null}
      {instagram ? (
        <ContactAction href={normalizeUrl(instagram)} label="Otwórz Instagram">
          <span className="text-xs font-black">IG</span>
        </ContactAction>
      ) : null}
      {!website && !phone && !email && !facebook && !instagram ? (
        <span className="text-sm font-bold text-white/35">brak kontaktu</span>
      ) : null}
    </div>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  if (!value) return null;

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        } catch {
          setCopied(false);
        }
      }}
      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-xs font-black text-white/60 transition hover:border-[var(--brand-primary)]/50 hover:text-[var(--brand-primary-soft)]"
    >
      <Copy className="h-3.5 w-3.5" />
      {copied ? "skopiowano" : label}
    </button>
  );
}

function DataFlagButton({
  flag,
  active,
  onClick,
}: {
  flag: DataFlag;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-xs font-black transition ${
        active
          ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-slate-950"
          : "border-white/10 bg-white/[.035] text-white/62 hover:border-[var(--brand-primary)]/50 hover:text-white"
      }`}
    >
      {flagLabels[flag]}
    </button>
  );
}

function StatusSelect({
  status,
  onChange,
}: {
  status: LeadWorkStatus;
  onChange: (status: LeadWorkStatus) => void;
}) {
  return (
    <select
      value={status}
      onChange={(event) => onChange(event.target.value as LeadWorkStatus)}
      className={`rounded-full border px-3 py-2 text-xs font-black outline-none transition ${getStatusClass(status)}`}
    >
      {(Object.keys(statusLabels) as LeadWorkStatus[]).map((option) => (
        <option key={option} value={option} className="bg-[#020617] text-white">
          {statusLabels[option]}
        </option>
      ))}
    </select>
  );
}

function LeadMobileCard({
  lead,
  status,
  onStatusChange,
}: {
  lead: LeadRecord;
  status: LeadWorkStatus;
  onStatusChange: (status: LeadWorkStatus) => void;
}) {
  const name = getLeadName(lead);
  const category = getLeadCategory(lead);
  const city = getLeadCity(lead);
  const address = getLeadAddress(lead);
  const website = getLeadWebsite(lead);
  const phone = getLeadPhone(lead);
  const email = getLeadEmail(lead);
  const score = getCompleteness(lead);
  const mapsUrl = getGoogleMapsUrl(lead);

  return (
    <article className={`rounded-2xl border border-white/10 bg-white/[.035] p-4 transition ${status === "checked" || status === "rejected" ? "opacity-55" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-base font-black text-white">{name}</h3>
          {category ? <p className="mt-1 text-sm font-bold text-[var(--brand-primary-soft)]">{category}</p> : null}
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[.08em] ${getCompletenessClass(score)}`}>
          {score}/5
        </span>
      </div>

      <div className="mt-3 grid gap-2 text-sm text-white/62">
        {city || address ? (
          <Link
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex gap-2 transition hover:text-[var(--brand-primary-soft)]"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/38" />
            <span className="line-clamp-2">{[city, address].filter(Boolean).join(" • ")}</span>
          </Link>
        ) : null}
        {website ? (
          <p className="flex gap-2">
            <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-white/38" />
            <span className="truncate">{domainFromUrl(website)}</span>
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <LeadContactActions lead={lead} />
        <div className="flex gap-2">
          <CopyButton value={phone} label="tel" />
          <CopyButton value={email} label="mail" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <span className="text-xs font-black uppercase tracking-[.12em] text-white/38">Status</span>
        <StatusSelect status={status} onChange={onStatusChange} />
      </div>
    </article>
  );
}

export default function LeadDatabaseTable() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialCity = searchParams.get("city") || "";

  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [count, setCount] = useState(0);
  const [stats, setStats] = useState<LeadDatabaseStats>(emptyStats);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [city, setCity] = useState(initialCity);
  const [limit, setLimit] = useState(25);
  const [sort, setSort] = useState<SortMode>("newest");
  const [requiredFlags, setRequiredFlags] = useState<DataFlag[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [workStatuses, setWorkStatuses] = useState<Record<string, LeadWorkStatus>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(count / limit));
  const hasActiveFilters = Boolean(query || category || city || requiredFlags.length || sort !== "newest" || statusFilter !== "all");

  useEffect(() => {
    setWorkStatuses(readStoredStatuses());
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sort,
      });

      if (query.trim()) params.set("q", query.trim());
      if (category.trim()) params.set("category", category.trim());
      if (city.trim()) params.set("city", city.trim());
      requiredFlags.forEach((flag) => params.set(flagParams[flag], "1"));
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        params.set("demo", "1");
      }

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
  }, [page, query, category, city, limit, sort, requiredFlags]);

  useEffect(() => {
    setPage(1);
  }, [query, category, city, limit, sort, requiredFlags, statusFilter]);

  const rangeLabel = useMemo(() => {
    if (!count) return "0 wyników";
    const from = (page - 1) * limit + 1;
    const to = Math.min(page * limit, count);
    return `${formatNumber(from)}-${formatNumber(to)} z ${formatNumber(count)}`;
  }, [count, limit, page]);

  const toggleFlag = (flag: DataFlag) => {
    setRequiredFlags((current) => (current.includes(flag) ? current.filter((item) => item !== flag) : [...current, flag]));
  };

  const resetFilters = () => {
    setQuery("");
    setCategory("");
    setCity("");
    setRequiredFlags([]);
    setLimit(25);
    setSort("newest");
    setStatusFilter("all");
  };

  const categorySuggestions = stats.categories.slice(0, 80);
  const citySuggestions = stats.cities.slice(0, 80);
  const getLeadStatus = (lead: LeadRecord): LeadWorkStatus => workStatuses[getLeadKey(lead)] || "new";
  const setLeadStatus = (lead: LeadRecord, status: LeadWorkStatus) => {
    setWorkStatuses((current) => {
      const key = getLeadKey(lead);
      const next = { ...current };

      if (status === "new") {
        delete next[key];
      } else {
        next[key] = status;
      }

      saveStoredStatuses(next);
      return next;
    });
  };
  const visibleLeads = statusFilter === "all" ? leads : leads.filter((lead) => getLeadStatus(lead) === statusFilter);
  const currentPageStatusCounts: Record<LeadWorkStatus, number> = { new: 0, checked: 0, contact: 0, rejected: 0 };
  leads.forEach((lead) => {
    const status = getLeadStatus(lead);
    currentPageStatusCounts[status] = currentPageStatusCounts[status] + 1;
  });

  return (
    <div className={`${radiusClass()} border border-[var(--brand-line)] bg-[var(--brand-surface)]/75 p-4 shadow-[0_24px_90px_rgba(56,189,248,.1)] md:p-6`}>
      <div className="grid gap-4">
        <div className="grid gap-3 lg:grid-cols-[1.35fr_.75fr_.75fr_auto_auto] lg:items-end">
          <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)]">
            Szukaj w bazie
            <span className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="firma, ulica, telefon, domena..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-white/35 focus:border-[var(--brand-primary)]/70"
              />
            </span>
          </label>

          <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)]">
            Branża
            <input
              list="lead-category-options"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="wybierz lub wpisz"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[var(--brand-primary)]/70"
            />
            <datalist id="lead-category-options">
              {categorySuggestions.map((item) => (
                <option key={item.slug} value={item.name}>
                  {formatNumber(item.count)} firm
                </option>
              ))}
            </datalist>
          </label>

          <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)]">
            Miasto
            <input
              list="lead-city-options"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="wybierz lub wpisz"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[var(--brand-primary)]/70"
            />
            <datalist id="lead-city-options">
              {citySuggestions.map((item) => (
                <option key={item.slug} value={item.name}>
                  {formatNumber(item.count)} firm
                </option>
              ))}
            </datalist>
          </label>

          <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)]">
            Sortuj
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
              className="rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none transition focus:border-[var(--brand-primary)]/70"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)]">
            Rekordów
            <select
              value={limit}
              onChange={(event) => setLimit(Number(event.target.value))}
              className="rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none transition focus:border-[var(--brand-primary)]/70"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 pr-1 text-xs font-black uppercase tracking-[.14em] text-white/45">
            <Filter className="h-4 w-4" />
            Tylko z:
          </span>
          {(Object.keys(flagLabels) as DataFlag[]).map((flag) => (
            <DataFlagButton key={flag} flag={flag} active={requiredFlags.includes(flag)} onClick={() => toggleFlag(flag)} />
          ))}
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.035] px-3 py-2 text-xs font-black text-white/58 transition hover:border-red-300/40 hover:text-red-100"
            >
              <X className="h-3.5 w-3.5" />
              Wyczyść
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[.025] p-3">
          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[.14em] text-white/45">
            Status pracy
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              className="rounded-full border border-white/10 bg-[#020617] px-3 py-2 text-xs font-black normal-case tracking-normal text-white outline-none transition focus:border-[var(--brand-primary)]/70"
            >
              {statusFilterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-wrap gap-2 text-xs font-bold text-white/50">
            <span>Nowe: {currentPageStatusCounts.new}</span>
            <span>Sprawdzone: {currentPageStatusCounts.checked}</span>
            <span>Do kontaktu: {currentPageStatusCounts.contact}</span>
            <span>Odrzucone: {currentPageStatusCounts.rejected}</span>
          </div>
          <p className="text-xs font-semibold text-white/38">
            Statusy zapisuja sie tylko w tej przegladarce.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <StatTile label="Wyniki" value={count} />
        <StatTile label="WWW" value={stats.websites} />
        <StatTile label="Telefony" value={stats.phones} />
        <StatTile label="E-maile" value={stats.emails} />
        <StatTile label="FB" value={stats.facebook} />
        <StatTile label="IG" value={stats.instagram} />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-white/10 py-3 text-sm font-bold text-[var(--brand-muted)]">
        <span>
          Pokazuję <span className="text-[var(--brand-primary-soft)]">{rangeLabel}</span>
        </span>
        <Link href="/indeks-bazy" className="text-[var(--brand-primary-soft)] hover:underline">
          Pełny indeks branż i miast
        </Link>
      </div>

      {error ? (
        <div className={`${radiusClass()} mt-5 border border-red-400/30 bg-red-500/10 p-6 text-sm font-bold leading-6 text-red-100`}>
          Nie udało się pobrać danych: {error}
        </div>
      ) : (
        <>
          <div className="mt-5 hidden overflow-hidden rounded-2xl border border-white/10 lg:block">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-white/[.06] text-xs uppercase tracking-[.14em] text-[var(--brand-primary-soft)]">
                <tr>
                  <th className="w-[28%] px-4 py-4 font-black">Firma</th>
                  <th className="w-[15%] px-4 py-4 font-black">Branża</th>
                  <th className="w-[20%] px-4 py-4 font-black">Lokalizacja</th>
                  <th className="w-[14%] px-4 py-4 font-black">Kontakt</th>
                  <th className="w-[10%] px-4 py-4 font-black">Jakość</th>
                  <th className="w-[13%] px-4 py-4 font-black">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-[var(--brand-muted)]">
                      Ładowanie danych...
                    </td>
                  </tr>
                ) : visibleLeads.length > 0 ? (
                  visibleLeads.map((lead, index) => {
                    const name = getLeadName(lead);
                    const categoryValue = getLeadCategory(lead);
                    const cityValue = getLeadCity(lead);
                    const address = getLeadAddress(lead);
                    const website = getLeadWebsite(lead);
                    const phone = getLeadPhone(lead);
                    const email = getLeadEmail(lead);
                    const score = getCompleteness(lead);
                    const mapsUrl = getGoogleMapsUrl(lead);
                    const status = getLeadStatus(lead);

                    return (
                      <tr key={String(lead.id || `${name}-${index}`)} className={`align-top transition hover:bg-white/[.035] ${status === "checked" || status === "rejected" ? "opacity-55" : ""}`}>
                        <td className="px-4 py-4">
                          <div className="flex gap-3">
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[.035] text-white/55">
                              <Building2 className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="line-clamp-2 font-black text-white">{name}</div>
                              {website ? (
                                <Link href={normalizeUrl(website)} target="_blank" rel="noreferrer" className="mt-1 inline-flex max-w-full items-center gap-1 text-xs font-bold text-[var(--brand-primary-soft)] hover:underline">
                                  <span className="truncate">{domainFromUrl(website)}</span>
                                  <ExternalLink className="h-3 w-3 shrink-0" />
                                </Link>
                              ) : null}
                              <div className="mt-2 flex flex-wrap gap-2">
                                <CopyButton value={name} label="nazwa" />
                                <CopyButton value={phone} label="telefon" />
                                <CopyButton value={email} label="e-mail" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-[var(--brand-muted)]">
                          {categoryValue ? <span className="line-clamp-3">{categoryValue}</span> : <span className="text-white/35">brak</span>}
                        </td>
                        <td className="px-4 py-4 text-[var(--brand-muted)]">
                          <Link
                            href={mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex gap-2 transition hover:text-[var(--brand-primary-soft)]"
                          >
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                            <span className="line-clamp-3">{[cityValue, address].filter(Boolean).join(" • ") || "brak lokalizacji"}</span>
                          </Link>
                        </td>
                        <td className="px-4 py-4">
                          <LeadContactActions lead={lead} />
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-black ${getCompletenessClass(score)}`}>
                            {getCompletenessLabel(score)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <StatusSelect status={status} onChange={(nextStatus) => setLeadStatus(lead, nextStatus)} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-[var(--brand-muted)]">
                      Brak wyników dla wybranych filtrów.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-3 lg:hidden">
            {isLoading ? (
              <div className="rounded-2xl border border-white/10 bg-white/[.035] p-6 text-center text-sm font-bold text-[var(--brand-muted)]">
                Ładowanie danych...
              </div>
            ) : visibleLeads.length > 0 ? (
              visibleLeads.map((lead, index) => (
                <LeadMobileCard
                  key={String(lead.id || `${getLeadName(lead)}-${index}`)}
                  lead={lead}
                  status={getLeadStatus(lead)}
                  onStatusChange={(nextStatus) => setLeadStatus(lead, nextStatus)}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[.035] p-6 text-center text-sm font-bold text-[var(--brand-muted)]">
                Brak wyników dla wybranych filtrów.
              </div>
            )}
          </div>
        </>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page <= 1 || isLoading}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.035] px-4 py-3 text-sm font-black text-white/70 transition hover:border-[var(--brand-primary)]/50 hover:text-white disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Poprzednia
        </button>
        <span className="text-sm font-black text-[var(--brand-muted)]">
          Strona <span className="text-[var(--brand-primary-soft)]">{page}</span> z {formatNumber(totalPages)}
        </span>
        <button
          type="button"
          onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          disabled={page >= totalPages || isLoading}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-primary)] bg-[var(--brand-primary)] px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-sky-300 disabled:pointer-events-none disabled:opacity-40"
        >
          Następna
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
