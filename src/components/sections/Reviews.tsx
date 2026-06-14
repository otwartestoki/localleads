import { content } from '@/config/content';
import { site } from '@/config/site';
import Reveal from '../ui/Reveal';

type Review = {
  name?: string;
  author?: string;
  rating?: number;
  text: string;
};

export default function Reviews() {
  const reviewsContent = content as {
    reviews?: {
      title?: string;
      description?: string;
      items?: readonly Review[];
    };
  };

  const reviews = reviewsContent.reviews?.items
    ? [...reviewsContent.reviews.items]
    : [];

  if (!reviews.length) return null;

  return (
    <section className="section bg-[var(--soft)]" id="reviews">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="text-sm font-black uppercase tracking-[.2em]"
              style={{ color: site.colors.primary }}
            >
              Opinie
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-5xl">
              {reviewsContent.reviews?.title || 'Co mówią pacjenci'}
            </h2>

            {reviewsContent.reviews?.description ? (
              <p className="mt-5 text-lg leading-8 opacity-70">
                {reviewsContent.reviews.description}
              </p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.slice(0, 6).map((review, index) => {
            const author = review.author || review.name || `Opinia ${index + 1}`;
            const rating = Math.max(0, Math.min(5, review.rating || 5));

            return (
              <Reveal key={`${author}-${index}`}>
                <article className="card rounded-3xl p-6">
                  <p className="text-sm font-black text-amber-500">
                    {'★'.repeat(rating)}
                  </p>

                  <p className="mt-4 leading-7 opacity-75">
                    {review.text}
                  </p>

                  <p className="mt-5 font-black">
                    {author}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
