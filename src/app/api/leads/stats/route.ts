import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MAX_ROWS_FOR_UNIQUE_STATS = 10000;

type LeadStatsRow = {
  category?: string | null;
  city?: string | null;
  website?: string | null;
  phone?: string | null;
  email?: string | null;
};

function clean(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeKey(value: unknown) {
  return clean(value).toLowerCase();
}

function hasValue(value: unknown) {
  return clean(value).length > 0;
}

export async function GET() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      {
        error: "Brakuje NEXT_PUBLIC_SUPABASE_URL albo SUPABASE_SERVICE_ROLE_KEY po stronie serwera.",
        total: 0,
        categories: 0,
        cities: 0,
        websites: 0,
        phones: 0,
        emails: 0,
      },
      { status: 500 },
    );
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { count, error: countError } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  if (countError) {
    return NextResponse.json(
      {
        error: countError.message,
        total: 0,
        categories: 0,
        cities: 0,
        websites: 0,
        phones: 0,
        emails: 0,
      },
      { status: 500 },
    );
  }

  const { data, error } = await supabase
    .from("leads")
    .select("category, city, website, phone, email")
    .range(0, MAX_ROWS_FOR_UNIQUE_STATS - 1);

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        total: count || 0,
        categories: 0,
        cities: 0,
        websites: 0,
        phones: 0,
        emails: 0,
      },
      { status: 500 },
    );
  }

  const rows = (data || []) as LeadStatsRow[];
  const categories = new Set<string>();
  const cities = new Set<string>();
  let websites = 0;
  let phones = 0;
  let emails = 0;

  rows.forEach((row) => {
    const category = normalizeKey(row.category);
    const city = normalizeKey(row.city);

    if (category) categories.add(category);
    if (city) cities.add(city);
    if (hasValue(row.website)) websites += 1;
    if (hasValue(row.phone)) phones += 1;
    if (hasValue(row.email)) emails += 1;
  });

  return NextResponse.json({
    error: null,
    total: count || 0,
    categories: categories.size,
    cities: cities.size,
    websites,
    phones,
    emails,
  });
}
