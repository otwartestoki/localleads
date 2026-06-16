import { createClient } from '@supabase/supabase-js';

export type LeadSeoRow = Record<string, string | number | boolean | null | undefined>;

export type LeadGroup = {
  slug: string;
  name: string;
  count: number;
};

export type LeadDatabaseStats = {
  total: number;
  categories: LeadGroup[];
  cities: LeadGroup[];
  totalCategories: number;
  totalCities: number;
  websites: number;
  phones: number;
  emails: number;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const INDEX_LIMIT = 5000;
const SAMPLE_LIMIT = 12;

const hiddenSampleColumns = new Set([
  'id',
  'created_at',
  'updated_at',
  'latitude',
  'lat',
  'longitude',
  'lng',
  'place_id',
  'placeid',
  'google_place_id',
]);

function getAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function normalizeText(value: unknown) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function slugifyLeadValue(value: unknown) {
  return normalizeText(value)
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getLeadName(row: LeadSeoRow) {
  return String(row.name || row.company_name || row.title || 'Firma').trim();
}

export function getLeadCategory(row: LeadSeoRow) {
  return String(row.category || row.industry || row.branza || '').trim();
}

export function getLeadCity(row: LeadSeoRow) {
  // Miasto bierzemy wyłącznie z kolumny city/miasto.
  // Nie zgadujemy miasta z address, bo adresy z kodami pocztowymi tworzyły błędne grupy typu "00-057 Warszawa".
  return String(row.city || row.miasto || '').trim();
}

function hasValue(value: unknown) {
  return String(value ?? '').trim().length > 0;
}

export function countGroups(values: string[]): LeadGroup[] {
  const map = new Map<string, LeadGroup>();

  values.forEach((value) => {
    const name = value.trim();
    const slug = slugifyLeadValue(name);
    if (!name || !slug) return;

    const existing = map.get(slug);
    if (existing) {
      existing.count += 1;
      return;
    }

    map.set(slug, { slug, name, count: 1 });
  });

  return Array.from(map.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'pl'));
}

export function getStatsFromRows(rows: LeadSeoRow[], totalOverride?: number): LeadDatabaseStats {
  const categories = countGroups(rows.map(getLeadCategory));
  const cities = countGroups(rows.map(getLeadCity));

  return {
    total: typeof totalOverride === 'number' ? totalOverride : rows.length,
    categories: categories.slice(0, 12),
    cities: cities.slice(0, 12),
    totalCategories: categories.length,
    totalCities: cities.length,
    websites: rows.filter((row) => hasValue(row.website || row.www)).length,
    phones: rows.filter((row) => hasValue(row.phone || row.telefon)).length,
    emails: rows.filter((row) => hasValue(row.email || row.mail)).length,
  };
}

function sanitizeSample(row: LeadSeoRow) {
  const result: LeadSeoRow = {};

  Object.entries(row).forEach(([key, value]) => {
    if (hiddenSampleColumns.has(key.toLowerCase())) return;
    result[key] = value;
  });

  return result;
}

async function fetchSeoRows(limit = INDEX_LIMIT) {
  const supabase = getAdminClient();
  if (!supabase) return [] as LeadSeoRow[];

  const { data, error } = await supabase.from('leads').select('*').limit(limit);
  if (error) return [] as LeadSeoRow[];

  return (data || []) as LeadSeoRow[];
}

export async function getLeadDatabaseStats(): Promise<LeadDatabaseStats> {
  const supabase = getAdminClient();
  const rows = await fetchSeoRows();
  let total = rows.length;

  if (supabase) {
    const { count } = await supabase.from('leads').select('*', { count: 'exact', head: true });
    if (typeof count === 'number') total = count;
  }

  return getStatsFromRows(rows, total);
}

export async function getLandingIndex() {
  const rows = await fetchSeoRows();

  return {
    categories: countGroups(rows.map(getLeadCategory)),
    cities: countGroups(rows.map(getLeadCity)),
  };
}

export async function getIndustryLanding(slug: string) {
  const rows = await fetchSeoRows();
  const filtered = rows.filter((row) => slugifyLeadValue(getLeadCategory(row)) === slug);
  const categoryName = getLeadCategory(filtered[0]) || slug.replace(/-/g, ' ');

  if (!filtered.length) return null;

  return {
    slug,
    name: categoryName,
    count: filtered.length,
    cities: countGroups(filtered.map(getLeadCity)).slice(0, 16),
    samples: filtered.slice(0, SAMPLE_LIMIT).map(sanitizeSample),
  };
}

export async function getCityLanding(slug: string) {
  const rows = await fetchSeoRows();
  const filtered = rows.filter((row) => slugifyLeadValue(getLeadCity(row)) === slug);
  const cityName = getLeadCity(filtered[0]) || slug.replace(/-/g, ' ');

  if (!filtered.length) return null;

  return {
    slug,
    name: cityName,
    count: filtered.length,
    categories: countGroups(filtered.map(getLeadCategory)).slice(0, 16),
    samples: filtered.slice(0, SAMPLE_LIMIT).map(sanitizeSample),
  };
}

export async function getIndustryCityLanding(industrySlug: string, citySlug: string) {
  const rows = await fetchSeoRows();
  const filtered = rows.filter((row) => {
    return slugifyLeadValue(getLeadCategory(row)) === industrySlug && slugifyLeadValue(getLeadCity(row)) === citySlug;
  });

  if (!filtered.length) return null;

  return {
    industrySlug,
    citySlug,
    industryName: getLeadCategory(filtered[0]) || industrySlug.replace(/-/g, ' '),
    cityName: getLeadCity(filtered[0]) || citySlug.replace(/-/g, ' '),
    count: filtered.length,
    samples: filtered.slice(0, SAMPLE_LIMIT).map(sanitizeSample),
  };
}
