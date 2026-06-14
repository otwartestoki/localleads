import type { Metadata } from 'next';
import { site } from '@/config/site';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localleads.pl';
export const ogImage = '/media/hero.webp';

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageMetadata({title,description,path='/',image=ogImage,noIndex=false}:{title:string;description:string;path?:string;image?:string;noIndex?:boolean;}): Metadata {
 const fullTitle = title.includes('LocalLeads') ? title : `${title} | LocalLeads`;
 return {title:fullTitle,description,alternates:{canonical:absoluteUrl(path)},openGraph:{type:'website',locale:'pl_PL',siteName:site.brand?.name||'LocalLeads',title:fullTitle,description,url:absoluteUrl(path),images:[{url:absoluteUrl(image),width:1200,height:630,alt:'Baza firm B2B CSV - LocalLeads'}]},twitter:{card:'summary_large_image',title:fullTitle,description,images:[absoluteUrl(image)]},robots:noIndex?{index:false,follow:false}:{index:true,follow:true,googleBot:{index:true,follow:true,'max-video-preview':-1,'max-image-preview':'large','max-snippet':-1}}};
}

export function organizationJsonLd(){return {'@context':'https://schema.org','@type':'Organization',name:site.brand?.name||'LocalLeads',url:siteUrl,logo:absoluteUrl('/media/brand/logo.png'),email:site.contact?.email,areaServed:'Polska',sameAs:[site.facebookUrl,site.instagramUrl].filter(Boolean),contactPoint:[{'@type':'ContactPoint',contactType:'sales',email:site.contact?.email,areaServed:'PL',availableLanguage:['Polish']}]}}

export function serviceJsonLd(){return {'@context':'https://schema.org','@type':'Service',name:'Bazy leadów B2B w CSV',provider:{'@type':'Organization',name:site.brand?.name||'LocalLeads',url:siteUrl},areaServed:'Polska',serviceType:'Baza leadów B2B',description:site.seo?.description||site.description,offers:{'@type':'AggregateOffer',priceCurrency:'PLN',lowPrice:'99',highPrice:'599',offerCount:'4'}}}

export function websiteJsonLd(){return {'@context':'https://schema.org','@type':'WebSite',name:site.brand?.name||'LocalLeads',url:siteUrl}}

export function localBusinessJsonLd(){return {'@context':'https://schema.org','@type':'ProfessionalService',name:site.brand?.name||'LocalLeads',url:siteUrl,logo:absoluteUrl('/media/brand/logo.png'),image:absoluteUrl('/media/hero.webp'),email:site.contact?.email,areaServed:'Polska'}}


export function productJsonLd({name,description,path,lowPrice='99',highPrice='599'}:{name:string;description:string;path:string;lowPrice?:string;highPrice?:string;}){return {'@context':'https://schema.org','@type':'Product',name,description,url:absoluteUrl(path),brand:{'@type':'Brand',name:site.brand?.name||'LocalLeads'},category:'Baza leadów B2B',offers:{'@type':'AggregateOffer',priceCurrency:'PLN',lowPrice,highPrice,offerCount:'4',availability:'https://schema.org/InStock',url:absoluteUrl(path)}}}
