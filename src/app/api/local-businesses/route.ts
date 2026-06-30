import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MAX_SCAN_ROWS = 3000;
const MAX_RESULTS = 100;

type BusinessRow = Record<string, string | number | boolean | null | undefined>;
type LocalSort = 'distance' | 'rating' | 'reviews';

const demoRows: BusinessRow[] = [
  {
    id: 'demo-local-1',
    name: 'Studio Fryzur Nova',
    category: 'Fryzjerzy',
    city: 'Łódź',
    address: 'Piotrkowska 120, Łódź',
    website: 'studio-nova.pl',
    phone: '+48 501 234 567',
    rating: 4.8,
    reviews_count: 186,
    latitude: 51.7474004,
    longitude: 19.4866352,
  },
  {
    id: 'demo-local-2',
    name: 'Barber Point',
    category: 'Barberzy',
    city: 'Łódź',
    address: 'Narutowicza 31, Łódź',
    website: 'barberpoint.pl',
    phone: '+48 602 111 222',
    rating: 4.4,
    reviews_count: 43,
    latitude: 51.7691,
    longitude: 19.4682,
  },
  {
    id: 'demo-local-3',
    name: 'Beauty Lab Kosmetologia',
    category: 'Salony kosmetyczne',
    city: 'Łódź',
    address: 'Tymienieckiego 22, Łódź',
    website: 'beautylab.pl',
    phone: '',
    rating: 4.9,
    reviews_count: 312,
    latitude: 51.7535,
    longitude: 19.4753,
  },
  {
    id: 'demo-local-4',
    name: 'Tattoo Ink House',
    category: 'Studia tatuażu',
    city: 'Łódź',
    address: 'Zachodnia 70, Łódź',
    website: '',
    phone: '+48 733 900 100',
    rating: 4.7,
    reviews_count: 91,
    latitude: 51.7768,
    longitude: 19.4535,
  },
  {
    id: 'demo-local-5',
    name: 'Kwiaciarnia Flora',
    category: 'Kwiaciarnie',
    city: 'Łódź',
    address: 'Rzgowska 45, Łódź',
    website: '',
    phone: '+48 530 456 789',
    rating: 4.6,
    reviews_count: 8,
    latitude: 51.7389,
    longitude: 19.4749,
  },
];

function getSafeString(value: string | null) {
  return (value || '').trim();
}

function getSafeNumber(value: string | null, fallback: number) {
  const parsed = Number(String(value || '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeText(value: unknown) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function rowNumber(row: BusinessRow, keys: string[]) {
  for (const key of keys) {
    const parsed = Number(String(row[key] ?? '').replace(',', '.'));
    if (Number.isFinite(parsed)) return parsed;
  }

  return 0;
}

function rowText(row: BusinessRow, keys: string[]) {
  for (const key of keys) {
    const value = row[key];
    if (value !== null && value !== undefined && String(value).trim()) return String(value).trim();
  }

  return '';
}

function getRating(row: BusinessRow) {
  return rowNumber(row, ['rating', 'average_rating', 'google_rating', 'review_rating', 'stars']);
}

function getReviews(row: BusinessRow) {
  return rowNumber(row, ['reviews_count', 'review_count', 'opinions_count', 'opinie', 'google_reviews_count']);
}

function getLatitude(row: BusinessRow) {
  return rowNumber(row, ['latitude', 'lat']);
}

function getLongitude(row: BusinessRow) {
  return rowNumber(row, ['longitude', 'lng']);
}

function distanceKm(fromLat: number, fromLng: number, toLat: number, toLng: number) {
  const earthRadiusKm = 6371;
  const dLat = ((toLat - fromLat) * Math.PI) / 180;
  const dLng = ((toLng - fromLng) * Math.PI) / 180;
  const lat1 = (fromLat * Math.PI) / 180;
  const lat2 = (toLat * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toBusiness(row: BusinessRow, userLat: number, userLng: number) {
  const latitude = getLatitude(row);
  const longitude = getLongitude(row);

  return {
    id: rowText(row, ['id', 'place_id', 'google_place_id']) || `${rowText(row, ['name', 'company_name'])}-${latitude}-${longitude}`,
    name: rowText(row, ['name', 'company_name', 'firma']) || 'Firma bez nazwy',
    category: rowText(row, ['category', 'industry', 'branza']),
    city: rowText(row, ['city', 'miasto']),
    address: rowText(row, ['address', 'adres']),
    website: rowText(row, ['website', 'www', 'site']),
    phone: rowText(row, ['phone', 'telefon']),
    rating: getRating(row),
    reviews: getReviews(row),
    latitude,
    longitude,
    distanceKm: distanceKm(userLat, userLng, latitude, longitude),
  };
}

function filterRows(rows: BusinessRow[], params: {
  lat: number;
  lng: number;
  radiusKm: number;
  category: string;
  minRating: number;
  minReviews: number;
  sort: LocalSort;
}) {
  const businesses = rows
    .filter((row) => getLatitude(row) && getLongitude(row))
    .map((row) => toBusiness(row, params.lat, params.lng))
    .filter((business) => business.distanceKm <= params.radiusKm)
    .filter((business) => !params.category || normalizeText(business.category).includes(normalizeText(params.category)))
    .filter((business) => !params.minRating || business.rating >= params.minRating)
    .filter((business) => !params.minReviews || business.reviews >= params.minReviews);

  if (params.sort === 'rating') {
    businesses.sort((a, b) => b.rating - a.rating || a.distanceKm - b.distanceKm);
  } else if (params.sort === 'reviews') {
    businesses.sort((a, b) => b.reviews - a.reviews || a.distanceKm - b.distanceKm);
  } else {
    businesses.sort((a, b) => a.distanceKm - b.distanceKm);
  }

  return businesses.slice(0, MAX_RESULTS);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = getSafeNumber(searchParams.get('lat'), 51.7592);
  const lng = getSafeNumber(searchParams.get('lng'), 19.456);
  const radiusKm = Math.min(Math.max(getSafeNumber(searchParams.get('radiusKm'), 5), 1), 50);
  const category = getSafeString(searchParams.get('category'));
  const minRating = getSafeNumber(searchParams.get('minRating'), 0);
  const minReviews = getSafeNumber(searchParams.get('minReviews'), 0);
  const sortParam = getSafeString(searchParams.get('sort'));
  const sort: LocalSort = sortParam === 'rating' || sortParam === 'reviews' ? sortParam : 'distance';
  const useDemo = process.env.NODE_ENV === 'development' && searchParams.get('demo') === '1';
  const filters = { lat, lng, radiusKm, category, minRating, minReviews, sort };

  if (useDemo) {
    return NextResponse.json({ data: filterRows(demoRows, filters), error: null, demo: true });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ data: [], error: 'Brakuje konfiguracji Supabase.' }, { status: 500 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data, error } = await supabase.from('leads').select('*').limit(MAX_SCAN_ROWS);

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ data: filterRows(demoRows, filters), error: null, demo: true });
    }

    return NextResponse.json({ data: [], error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: filterRows((data || []) as BusinessRow[], filters), error: null });
}
