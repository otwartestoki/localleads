import { redirect } from 'next/navigation';

type RedirectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: RedirectPageProps) {
  const { slug } = await params;
  redirect(`/uslugi/${slug}`);
}
