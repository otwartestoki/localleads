import Image from 'next/image';
import Link from 'next/link';

import { site } from '@/config/site';
import { getPostHref, getPostImage, getPosts, formatPostDate } from '@/lib/posts';
import { radiusClass, sectionBg } from '@/lib/style';
import { getButtonClass } from '@/lib/uiStyles';
import Reveal from '../ui/Reveal';

export default async function Blog() {
  const config = (site.blog ?? {}) as any;
  const pageConfig = ((site as any).pages?.blog ?? {}) as any;
  const blogEnabled = config.enabled === true || pageConfig.enabled === true || (site as any).sections?.enabled?.blog === true;
  if (!blogEnabled) return null;

  const posts = await getPosts(config.landingLimit ?? 3);

  return (
    <section id="blog" className={`section ${sectionBg('blog' as any)}`}>
      <div className="container">
        <Reveal>
          <p className="text-sm font-black uppercase tracking-[.2em]" style={{ color: site.colors.primary }}>
            Blog
          </p>
          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-black tracking-[-.04em] md:text-5xl">
                {config.title ?? 'Porady i aktualności'}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 opacity-75">
                {config.description ?? 'Najnowsze wpisy z bloga.'}
              </p>
            </div>
            <Link href="/blog" className={getButtonClass({ tone: 'secondary' })}>
              Zobacz wszystkie
            </Link>
          </div>
        </Reveal>

        {posts.length === 0 ? (
          <div className={`${radiusClass()} card mt-8 p-7`}>
            <h3 className="text-2xl font-black">{config.emptyTitle ?? 'Brak wpisów'}</h3>
            <p className="mt-3 leading-7 opacity-70">
              {config.emptyDescription ?? 'Wkrótce pojawią się tu poradniki o prospectingu, bazach firm i lokalnym SEO.'}
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.id} from={index % 2 ? 'right' : 'left'}>
                <article className={`${radiusClass()} card h-full overflow-hidden`}>
                  {config.showImages !== false && (
                    <div className="relative aspect-[16/10] bg-[var(--secondary)]">
                      <Image
                        src={getPostImage(post)}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.created_at && (
                      <p className="text-sm font-bold opacity-55">{formatPostDate(post.created_at)}</p>
                    )}
                    <h3 className="mt-2 text-2xl font-black leading-tight">{post.title}</h3>
                    {post.excerpt && <p className="mt-3 leading-7 opacity-70">{post.excerpt}</p>}
                    <Link href={getPostHref(post)} className={getButtonClass({ tone: 'primary', className: 'mt-5' })}>
                      Czytaj wpis
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
