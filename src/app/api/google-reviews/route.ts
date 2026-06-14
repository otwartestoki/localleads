import { NextResponse } from "next/server";
import { site } from "@/config/site";

type ManualReview = {
  author?: string;
  name?: string;
  rating?: number;
  text?: string;
  date?: string;
  authorPhoto?: string;
};

function getManualFallback() {
  const cfg = site as any;
  const reviews = Array.isArray(cfg?.reviews) ? cfg.reviews : [];

  return reviews.map((review: ManualReview) => ({
    name: review.name || review.author || "Klient",
    author: review.author || review.name || "Klient",
    rating: review.rating || 5,
    text: review.text || "",
    date: review.date,
    authorPhoto: review.authorPhoto,
  }));
}

export async function GET() {
  const cfg = site as any;

  const apiKey =
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_PLACES_API_KEY ||
    "";

  const placeId =
    process.env.GOOGLE_PLACE_ID ||
    cfg?.googleReviews?.placeId ||
    "";

  const fallback = Array.isArray(cfg?.googleReviews?.fallback)
    ? cfg.googleReviews.fallback
    : getManualFallback();

  if (!apiKey || !placeId || placeId === "TU_WSTAW_PLACE_ID") {
    return NextResponse.json({
      source: "manual-fallback",
      reviews: fallback,
    });
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
      },
      next: { revalidate: 60 * 60 * 12 },
    });

    if (!res.ok) throw new Error("Google reviews API failed");

    const data = await res.json();

    const reviews = (data?.reviews || [])
      .map((review: any) => ({
        name: review?.authorAttribution?.displayName || "Klient Google",
        author: review?.authorAttribution?.displayName || "Klient Google",
        rating: review?.rating || 5,
        text: review?.text?.text || "",
        date: review?.relativePublishTimeDescription,
        authorPhoto: review?.authorAttribution?.photoUri,
      }))
      .filter((review: { text: string }) => review.text.length > 0);

    return NextResponse.json({
      source: reviews.length ? "google-api" : "manual-fallback",
      name: data?.displayName?.text,
      rating: data?.rating,
      userRatingCount: data?.userRatingCount,
      reviews: reviews.length ? reviews : fallback,
    });
  } catch {
    return NextResponse.json(
      {
        source: "manual-fallback",
        reviews: fallback,
      },
      { status: 200 }
    );
  }
}
