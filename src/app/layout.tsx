import type { Metadata } from 'next';
import './globals.css';
import CookieConsent from '@/components/CookieConsent';
import { site } from '@/config/site';
import { organizationJsonLd,pageMetadata,serviceJsonLd,siteUrl,websiteJsonLd,localBusinessJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
 metadataBase:new URL(siteUrl),
 ...pageMetadata({title:site.seo?.title ?? 'LocalLeads — baza leadów B2B CSV',description:site.seo?.description ?? site.description,path:'/'}),
 applicationName:'LocalLeads',
 category:'business'
};

export default function RootLayout({children}:{children:React.ReactNode}) {
 const vars={ '--primary':site.theme.primary,'--secondary':site.theme.secondary,'--accent':site.theme.accent,'--background':site.theme.background,'--foreground':site.theme.foreground } as React.CSSProperties;
 return <html lang="pl" data-scroll-behavior="smooth"><body style={vars}><script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{__html:JSON.stringify([organizationJsonLd(),serviceJsonLd(),websiteJsonLd(),localBusinessJsonLd()])}} />{children}<CookieConsent /></body></html>
}
