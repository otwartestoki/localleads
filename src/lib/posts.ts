import { site } from '@/config/site';
import { getSupabaseClient } from '@/lib/supabase';

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  slug: string | null;
  created_at: string | null;
};

const POST_SELECT = 'id,title,excerpt,content,image_url,slug,created_at';
const DEFAULT_LANGUAGE = 'pl';

function blogConfig() {
  return site.blog ?? {};
}

function blogLanguage() {
  return (blogConfig() as any).language || DEFAULT_LANGUAGE;
}

export async function getPosts(limit?: number): Promise<BlogPost[]> {
  const supabase = getSupabaseClient();
  if (!supabase || !site.slug) return [];

  let query = supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('site_slug', site.slug)
    .eq('language', blogLanguage())
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error('[blog] Supabase posts error:', error.message);
    return [];
  }

  return (data ?? []) as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseClient();
  if (!supabase || !site.slug || !slug) return null;

  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('site_slug', site.slug)
    .eq('language', blogLanguage())
    .eq('published', true)
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('[blog] Supabase post error:', error.message);
    return null;
  }

  return data as BlogPost | null;
}

export function getPostImage(post: BlogPost) {
  return post.image_url || (blogConfig() as any).fallbackImage || '/media/hero.webp';
}

export function getPostHref(post: BlogPost) {
  return `/blog/${post.slug || post.id}`;
}

export function formatPostDate(value: string | null) {
  if (!value) return '';
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));
}
