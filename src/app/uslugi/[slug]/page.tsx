import { redirect } from 'next/navigation';

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ServicePageProps) {
  await params;
  return {
    title: 'LocalLeads - darmowa baza firm',
    description: 'LocalLeads udostępnia dane firmowe za darmo. Jeśli brakuje branży lub miasta, skontaktuj się przez formularz.',
  };
}

export default function ServiceDetailPage() {
  redirect('/oferta');
}
