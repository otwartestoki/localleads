export type GoogleReview = {
  name: string;
  rating: number;
  text: string;
  date?: string;
  authorPhoto?: string;
};

export type GoogleReviewsPayload = {
  name?: string;
  rating?: number;
  userRatingCount?: number;
  reviews: GoogleReview[];
  source: "google-api" | "manual-fallback";
};
