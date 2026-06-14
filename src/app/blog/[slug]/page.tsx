import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PageShell from '@/components/pages/PageShell';
import { site } from '@/config/site';
import { getPostBySlug, getPostImage, formatPostDate } from '@/lib/posts';
import { radiusClass } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';
import { pageMetadata } from '@/lib/seo';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return pageMetadata({
      title: 'Wpis nie istnieje',
      description: site.description,
      path: `/blog/${slug}`,
    });
  }

  return pageMetadata({
    title: `${post.title} | Blog LocalLeads`,
    description: post.excerpt || site.description,
    path: `/blog/${slug}`,
    image: getPostImage(post),
  });
}

function renderContent(content: string | null) {
  const lines = (content ?? '').split('\n').map((line) => line.trim()).filter(Boolean);

  if (lines.length === 0) {
    return <p className="leading-8">Ten wpis nie ma jeszcze treści.</p>;
  }

  return lines.map((line, index) => {
    if (line.startsWith('### ')) {
      return <h3 key={index} className="mt-8 text-2xl font-black">{line.replace(/^### /, '')}</h3>;
    }

    if (line.startsWith('## ')) {
      return <h2 key={index} className="mt-10 text-3xl font-black tracking-[-.03em]">{line.replace(/^## /, '')}</h2>;
    }

    if (line.startsWith('# ')) {
      return <h2 key={index} className="mt-8 text-3xl font-black tracking-[-.03em]">{line.replace(/^# /, '')}</h2>;
    }

    if (line.startsWith('- ')) {
      return <p key={index} className="leading-8">• {line.replace(/^- /, '')}</p>;
    }

    return <p key={index} className="leading-8">{line}</p>;
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageShell>
      <article>
        <section className="section brand-section-soft">
          <div className="container max-w-4xl">
            <Link href="/blog" className={getButtonClass({ tone: 'secondary' })}>
              ← Wróć do bloga
            </Link>
            {post.created_at && <p className="mt-8 text-sm font-bold opacity-60">{formatPostDate(post.created_at)}</p>}
            <h1 className="brand-heading mt-3 text-5xl font-black tracking-[-.05em] md:text-6xl">
              {post.title}
            </h1>
            {post.excerpt && <p className="brand-copy mt-5 text-xl leading-8">{post.excerpt}</p>}
          </div>
        </section>

        <section className="section brand-section-dark">
          <div className="container max-w-4xl">
            <div className={`${radiusClass()} card overflow-hidden`}>
              <div className="relative aspect-[16/9] bg-[var(--surface-2)]">
                <Image
                  src={getPostImage(post)}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover opacity-90"
                  sizes="(min-width: 1024px) 900px, 100vw"
                />
              </div>
              <div className="blog-content space-y-5 p-7 md:p-10">
                {renderContent(post.content)}
              </div>
            </div>

            <div className={`${radiusClass()} card mt-8 p-7 md:flex md:items-center md:justify-between md:gap-8`}>
              <div>
                <h2 className="text-2xl font-black">Chcesz podobną bazę firm?</h2>
                <p className="mt-2 leading-7">Zamów próbkę CSV albo opisz branżę i miasto, dla których mam przygotować leady.</p>
              </div>
              <Link
                href="/kontakt?topic=blog&message=Interesuje mnie baza leadów po przeczytaniu wpisu na blogu. Proszę o informację, jakie pakiety CSV są dostępne."
                className={getButtonClass({ tone: 'primary', className: 'mt-5 shrink-0 md:mt-0' })}
              >
                Zamów próbkę CSV
              </Link>
            </div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
