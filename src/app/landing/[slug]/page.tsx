import PageShell from '@/components/pages/PageShell';

type Props = { params: Promise<{ slug: string }> };

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;

  return (
    <PageShell>
      <section className="section brand-section-dark">
        <div className="container max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[.2em] text-[var(--brand-primary-soft)]">
            Landing SEO
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-[-.05em]">
            {slug.replace(/-/g, ' ')}
          </h1>

          <p className="mt-6 text-lg text-[var(--brand-muted)]">
            Ta strona została przygotowana pod pozycjonowanie lokalnych i branżowych fraz.
            Możesz tworzyć nowe podstrony dodając rekordy do bazy lub przygotowując nowe pliki.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
