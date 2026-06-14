import { site } from '@/config/site';

type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
};

type GoogleReviewsResult = {
  reviews: GoogleReview[];
  source: 'google' | 'manual-fallback';
};

const googleReviewsFallback: GoogleReview[] = [];

async function getReviews(): Promise<GoogleReviewsResult> {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!placeId || !apiKey) {
    return {
      reviews: [...googleReviewsFallback],
      source: 'manual-fallback',
    };
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('place_id', placeId);
    url.searchParams.set('fields', 'reviews');
    url.searchParams.set('language', 'pl');
    url.searchParams.set('key', apiKey);

    const response = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      return {
        reviews: [...googleReviewsFallback],
        source: 'manual-fallback',
      };
    }

    const data = await response.json();
    const reviews = data?.result?.reviews;

    if (!Array.isArray(reviews) || reviews.length === 0) {
      return {
        reviews: [...googleReviewsFallback],
        source: 'manual-fallback',
      };
    }

    return {
      reviews: reviews as GoogleReview[],
      source: 'google',
    };
  } catch {
    return {
      reviews: [...googleReviewsFallback],
      source: 'manual-fallback',
    };
  }
}

export default async function GoogleReviews() {
  const { reviews } = await getReviews();

  if (!reviews.length) return null;

  return (
    <section className="section bg-[var(--soft)]" id="reviews">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-sm font-black uppercase tracking-[.2em]"
            style={{ color: site.colors.primary }}
          >
            Opinie
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-5xl">
            Co mówią pacjenci
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.slice(0, 3).map((review, index) => (
            <article key={`${review.author_name}-${index}`} className="card rounded-3xl p-6">
              <p className="text-sm font-black text-amber-500">
                {'★'.repeat(Math.max(0, Math.min(5, review.rating || 5)))}
              </p>

              <p className="mt-4 leading-7 opacity-75">{review.text}</p>

              <p className="mt-5 font-black">{review.author_name}</p>

              {review.relative_time_description ? (
                <p className="mt-1 text-sm opacity-50">
                  {review.relative_time_description}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
