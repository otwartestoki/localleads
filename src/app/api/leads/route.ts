import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getStatsFromRows, type LeadSeoRow } from '@/lib/leadsSeo';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MAX_LIMIT = 25;
const MAX_SEARCH_SCAN_ROWS = 3000;

type LeadRow = Record<string, string | number | boolean | null | undefined>;

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
  'city',
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

  const { data: scannedData, error: scanError } = await scanQuery;

  if (scanError) {
    return NextResponse.json({ data: [], count: 0, page, limit, stats: getStatsFromRows([], 0), error: scanError.message }, { status: 500 });
  }

  const scannedRows = sortByCreatedAt((scannedData || []) as LeadRow[]);
  const filteredRows = q ? scannedRows.filter((row) => rowMatchesSearch(row, q)) : scannedRows;
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
