import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getStatsFromRows, type LeadSeoRow } from '@/lib/leadsSeo';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MAX_LIMIT = 100;
const MAX_SEARCH_SCAN_ROWS = 3000;

type LeadRow = Record<string, string | number | boolean | null | undefined>;
type SortMode = 'newest' | 'name_asc' | 'name_desc' | 'category_asc' | 'city_asc';

const demoRows: LeadRow[] = [
  {
    id: 'demo-1',
    name: 'Studio Fryzur Nova',
    category: 'Fryzjerzy',
    city: 'Łódź',
    address: 'Piotrkowska 120, Łódź',
    phone: '+48 501 234 567',
    website: 'studio-nova.pl',
    email: 'kontakt@studio-nova.pl',
    facebook: 'https://facebook.com/studionova',
    instagram: 'https://instagram.com/studionova',
  },
  {
    id: 'demo-2',
    name: 'Barber Point',
    category: 'Barberzy',
    city: 'Warszawa',
    address: 'Marszałkowska 44, Warszawa',
    phone: '+48 602 111 222',
    website: 'barberpoint.pl',
    email: '',
    facebook: 'https://facebook.com/barberpoint',
    instagram: '',
  },
  {
    id: 'demo-3',
    name: 'Beauty Lab Kosmetologia',
    category: 'Salony kosmetyczne',
    city: 'Kraków',
    address: 'Długa 18, Kraków',
    phone: '',
    website: 'beautylab.pl',
    email: 'recepcja@beautylab.pl',
    facebook: '',
    instagram: 'https://instagram.com/beautylab',
  },
  {
    id: 'demo-4',
    name: 'Tattoo Ink House',
    category: 'Studia tatuażu',
    city: 'Gdańsk',
    address: 'Grunwaldzka 88, Gdańsk',
    phone: '+48 733 900 100',
    website: '',
    email: '',
    facebook: 'https://facebook.com/tattooinkhouse',
    instagram: 'https://instagram.com/tattooinkhouse',
  },
  {
    id: 'demo-5',
    name: 'Auto Serwis Północ',
    category: 'Mechanicy samochodowi',
    city: 'Poznań',
    address: 'Główna 7, Poznań',
    phone: '+48 512 777 123',
    website: 'autopolnoc.pl',
    email: 'biuro@autopolnoc.pl',
    facebook: '',
    instagram: '',
  },
  {
    id: 'demo-6',
    name: 'Kwiaciarnia Flora',
    category: 'Kwiaciarnie',
    city: 'Wrocław',
    address: 'Rynek 3, Wrocław',
    phone: '+48 530 456 789',
    website: '',
    email: '',
    facebook: '',
    instagram: 'https://instagram.com/flora.wroclaw',
  },
];

const technicalHiddenColumns = new Set([
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

const responseHiddenColumns = new Set([
  ...technicalHiddenColumns,
]);

function getSafeString(value: string | null) {
  return (value || '').trim();
}

function getSafeNumber(value: string | null, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return parsed;
}

function escapeIlike(value: string) {
  return value.replace(/[%_]/g, '');
}

function normalizeForSearch(value: unknown) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function rowMatchesSearch(row: LeadRow, phrase: string) {
  const normalizedPhrase = normalizeForSearch(phrase);
  if (!normalizedPhrase) return true;

  return Object.entries(row).some(([key, value]) => {
    if (technicalHiddenColumns.has(key.toLowerCase())) return false;
    return normalizeForSearch(value).includes(normalizedPhrase);
  });
}

function sanitizeRows(rows: LeadRow[]) {
  return rows.map((row) => {
    const cleanRow: LeadRow = {};

    Object.entries(row).forEach(([key, value]) => {
      if (!responseHiddenColumns.has(key.toLowerCase())) {
        cleanRow[key] = value;
      }
    });

    return cleanRow;
  });
}

function sortByCreatedAt(rows: LeadRow[]) {
  if (!rows.some((row) => 'created_at' in row)) return rows;
  return [...rows].sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')));
}

function hasField(row: LeadRow, key: string) {
  return String(row[key] || '').trim().length > 0;
}

function getRowText(row: LeadRow, key: string) {
  return String(row[key] || '').trim();
}

function getSortMode(value: string): SortMode {
  if (['newest', 'name_asc', 'name_desc', 'category_asc', 'city_asc'].includes(value)) {
    return value as SortMode;
  }

  return 'newest';
}

function sortRows(rows: LeadRow[], sort: SortMode) {
  const sorted = [...rows];

  if (sort === 'name_asc') {
    return sorted.sort((a, b) => getRowText(a, 'name').localeCompare(getRowText(b, 'name'), 'pl'));
  }
  if (sort === 'name_desc') {
    return sorted.sort((a, b) => getRowText(b, 'name').localeCompare(getRowText(a, 'name'), 'pl'));
  }
  if (sort === 'category_asc') {
    return sorted.sort((a, b) => getRowText(a, 'category').localeCompare(getRowText(b, 'category'), 'pl'));
  }
  if (sort === 'city_asc') {
    return sorted.sort((a, b) => getRowText(a, 'city').localeCompare(getRowText(b, 'city'), 'pl'));
  }
  return sortByCreatedAt(sorted);
}

function filterRows(
  rows: LeadRow[],
  filters: {
    q: string;
    category: string;
    city: string;
    hasWebsite: boolean;
    hasPhone: boolean;
    hasEmail: boolean;
    hasFacebook: boolean;
    hasInstagram: boolean;
    sort: SortMode;
  },
) {
  return rows.filter((row) => {
    if (filters.category && !normalizeForSearch(row.category).includes(normalizeForSearch(filters.category))) return false;
    if (filters.city && !normalizeForSearch(row.city).includes(normalizeForSearch(filters.city))) return false;
    if (filters.hasWebsite && !hasField(row, 'website')) return false;
    if (filters.hasPhone && !hasField(row, 'phone')) return false;
    if (filters.hasEmail && !hasField(row, 'email')) return false;
    if (filters.hasFacebook && !hasField(row, 'facebook')) return false;
    if (filters.hasInstagram && !hasField(row, 'instagram')) return false;
    return filters.q ? rowMatchesSearch(row, filters.q) : true;
  });
}

function demoResponse(
  page: number,
  limit: number,
  filters: Parameters<typeof filterRows>[1],
) {
  const filteredRows = sortRows(filterRows(demoRows, filters), filters.sort);
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const pagedRows = filteredRows.slice(from, to + 1);

  return NextResponse.json({
    data: sanitizeRows(pagedRows),
    count: filteredRows.length,
    page,
    limit,
    stats: getStatsFromRows(filteredRows as LeadSeoRow[], filteredRows.length),
    error: null,
    demo: true,
  });
}

export async function GET(request: Request) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      {
        data: [],
        count: 0,
        page: 1,
        limit: MAX_LIMIT,
        stats: getStatsFromRows([], 0),
        error: 'Brakuje NEXT_PUBLIC_SUPABASE_URL albo SUPABASE_SERVICE_ROLE_KEY po stronie serwera.',
      },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Math.floor(getSafeNumber(searchParams.get('page'), 1)));
  const requestedLimit = Math.max(1, Math.floor(getSafeNumber(searchParams.get('limit'), MAX_LIMIT)));
  const limit = Math.min(requestedLimit, MAX_LIMIT);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const q = getSafeString(searchParams.get('q'));
  const category = getSafeString(searchParams.get('category'));
  const city = getSafeString(searchParams.get('city'));
  const hasWebsite = searchParams.get('hasWebsite') === '1';
  const hasPhone = searchParams.get('hasPhone') === '1';
  const hasEmail = searchParams.get('hasEmail') === '1';
  const hasFacebook = searchParams.get('hasFacebook') === '1';
  const hasInstagram = searchParams.get('hasInstagram') === '1';
  const sort = getSortMode(getSafeString(searchParams.get('sort')));
  const useDemo = process.env.NODE_ENV === 'development' && searchParams.get('demo') === '1';
  const filters = { q, category, city, hasWebsite, hasPhone, hasEmail, hasFacebook, hasInstagram, sort };

  if (useDemo) {
    return demoResponse(page, limit, filters);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  let scanQuery = supabase.from('leads').select('*').limit(MAX_SEARCH_SCAN_ROWS);

  if (category) {
    scanQuery = scanQuery.ilike('category', `%${escapeIlike(category)}%`);
  }
  if (city) {
    scanQuery = scanQuery.ilike('city', `%${escapeIlike(city)}%`);
  }
  if (hasWebsite) {
    scanQuery = scanQuery.not('website', 'is', null).neq('website', '');
  }
  if (hasPhone) {
    scanQuery = scanQuery.not('phone', 'is', null).neq('phone', '');
  }
  if (hasEmail) {
    scanQuery = scanQuery.not('email', 'is', null).neq('email', '');
  }
  if (hasFacebook) {
    scanQuery = scanQuery.not('facebook', 'is', null).neq('facebook', '');
  }
  if (hasInstagram) {
    scanQuery = scanQuery.not('instagram', 'is', null).neq('instagram', '');
  }

  const { data: scannedData, error: scanError } = await scanQuery;

  if (scanError) {
    if (process.env.NODE_ENV === 'development') {
      return demoResponse(page, limit, filters);
    }

    return NextResponse.json({ data: [], count: 0, page, limit, stats: getStatsFromRows([], 0), error: scanError.message }, { status: 500 });
  }

  const scannedRows = (scannedData || []) as LeadRow[];
  const filteredRows = sortRows(filterRows(scannedRows, filters), sort);
  const pagedRows = filteredRows.slice(from, to + 1);

  if (q) {
    return NextResponse.json({
      data: sanitizeRows(pagedRows),
      count: filteredRows.length,
      page,
      limit,
      stats: getStatsFromRows(filteredRows as LeadSeoRow[], filteredRows.length),
      error: null,
    });
  }

  // Bez wyszukiwania tekstowego licznik Supabase jest dokładny dla aktualnego filtra branży.
  let countQuery = supabase.from('leads').select('*', { count: 'exact', head: true });
  if (category) {
    countQuery = countQuery.ilike('category', `%${escapeIlike(category)}%`);
  }
  if (city) {
    countQuery = countQuery.ilike('city', `%${escapeIlike(city)}%`);
  }
  if (hasWebsite) {
    countQuery = countQuery.not('website', 'is', null).neq('website', '');
  }
  if (hasPhone) {
    countQuery = countQuery.not('phone', 'is', null).neq('phone', '');
  }
  if (hasEmail) {
    countQuery = countQuery.not('email', 'is', null).neq('email', '');
  }
  if (hasFacebook) {
    countQuery = countQuery.not('facebook', 'is', null).neq('facebook', '');
  }
  if (hasInstagram) {
    countQuery = countQuery.not('instagram', 'is', null).neq('instagram', '');
  }
  const { count } = await countQuery;
  const exactCount = typeof count === 'number' ? count : filteredRows.length;

  return NextResponse.json({
    data: sanitizeRows(pagedRows),
    count: exactCount,
    page,
    limit,
    stats: getStatsFromRows(filteredRows as LeadSeoRow[], exactCount),
    error: null,
  });
}
