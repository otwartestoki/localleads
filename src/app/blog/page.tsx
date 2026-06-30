import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageShell from '@/components/pages/PageShell';
import { site } from '@/config/site';
import { getPostHref, getPostImage, getPosts, formatPostDate } from '@/lib/posts';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Blog o leadach B2B, prospectingu i bazach firm',
  description: 'Poradniki LocalLeads o leadach B2B, lokalnym prospectingu, bazach firm online, SEO i sprzedaży do lokalnych biznesów.',
  path: '/blog',
});

export const revalidate = 300;

export default async function BlogPage() {
  if ((site.pages.blog as any).enabled === false) notFound();

  const config = (site.blog ?? {}) as any;
  const posts = await getPosts();

  return (
    <PageShell>
      <section className="section brand-section-dark pt-10 md:pt-14">
        <div className="container">
          <div className="mb-8 max-w-3xl">
            <p className="brand-eyebrow text-sm font-black uppercase tracking-[.2em]">
              Blog LocalLeads
            </p>
            <h1 className="brand-heading mt-3 text-4xl font-black tracking-[-.04em] md:text-5xl">
              {config.pageTitle ?? 'Blog o leadach B2B i pozyskiwaniu klientów'}
            </h1>
            <p className="brand-copy mt-4 text-base leading-7 md:text-lg">
              {config.pageDescription ?? 'Poradniki o bazach firm, prospectingu, danych kontaktowych i sprzedaży do lokalnych biznesów.'}
            </p>
          </div>

          {posts.length === 0 ? (
            <div className={`${radiusClass()} card p-7`}>
              <h2 className="text-3xl font-black">{config.emptyTitle ?? 'Brak wpisów'}</h2>
              <p className="mt-3 leading-7">
                {config.emptyDescription ?? 'Wkrótce pojawią się tu poradniki o prospectingu, bazach firm i lokalnym SEO.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className={`${radiusClass()} card flex h-full flex-col overflow-hidden`}>
                  {config.showImages !== false && (
                    <Link href={getPostHref(post)} className="relative block aspect-[16/10] bg-[var(--surface-2)]">
                      <Image
                        src={getPostImage(post)}
                        alt={post.title}
                        fill
                        className="object-cover opacity-90 transition duration-300 hover:scale-[1.03]"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </Link>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {post.created_at && <p className="text-sm font-bold opacity-60">{formatPostDate(post.created_at)}</p>}
                    <h2 className="mt-2 text-2xl font-black leading-tight">
                      <Link href={getPostHref(post)}>{post.title}</Link>
                    </h2>
                    {post.excerpt && <p className="mt-3 leading-7">{post.excerpt}</p>}
                    <div className="mt-auto pt-5">
                      <Link href={getPostHref(post)} className={getButtonClass({ tone: 'primary' })}>
                        Czytaj wpis
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
