'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'localleads-cookie-consent-v1';

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
};

type ClarityFunction = ((...args: unknown[]) => void) & { q?: IArguments[] };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: ClarityFunction;
    __localleadsGaConfigured?: boolean;
    __localleadsClarityConfigured?: boolean;
  }
}

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function consentValue(value: boolean) {
  return value ? 'granted' : 'denied';
}

function updateGoogleConsent(consent: Pick<ConsentState, 'analytics' | 'marketing'>) {
  window.gtag?.('consent', 'update', {
    analytics_storage: consentValue(consent.analytics),
    ad_storage: consentValue(consent.marketing),
    ad_user_data: consentValue(consent.marketing),
    ad_personalization: consentValue(consent.marketing),
  });
}

function ensureGoogleAnalytics(consent: Pick<ConsentState, 'analytics' | 'marketing'>) {
  if (!gaMeasurementId) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer?.push(arguments);
    };

  if (!window.__localleadsGaConfigured) {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.__localleadsGaConfigured = true;
  }

  updateGoogleConsent(consent);
  window.gtag('config', gaMeasurementId, { anonymize_ip: true });
}

function updateClarityConsent(consent: Pick<ConsentState, 'analytics' | 'marketing'>) {
  window.clarity?.('consentv2', {
    ad_Storage: consentValue(consent.marketing),
    analytics_Storage: consentValue(consent.analytics),
  });

  if (!consent.analytics) {
    window.clarity?.('consent', false);
  }
}

function ensureClarity(consent: Pick<ConsentState, 'analytics' | 'marketing'>) {
  if (!clarityProjectId) return;

  if (!window.__localleadsClarityConfigured) {
    window.clarity =
      window.clarity ||
      function clarity() {
        (window.clarity!.q = window.clarity!.q || []).push(arguments);
      };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${encodeURIComponent(clarityProjectId)}`;
    document.head.appendChild(script);
    window.__localleadsClarityConfigured = true;
  }

  updateClarityConsent(consent);
}

function applyConsent(consent: ConsentState | null) {
  const current = {
    analytics: Boolean(consent?.analytics),
    marketing: Boolean(consent?.marketing),
  };

  if (current.analytics) {
    ensureGoogleAnalytics(current);
    ensureClarity(current);
    return;
  }

  updateGoogleConsent(current);
  updateClarityConsent(current);
}

export default function AnalyticsScripts() {
  useEffect(() => {
    applyConsent(readConsent());

    const onConsentChange = (event: Event) => {
      applyConsent((event as CustomEvent<ConsentState>).detail);
    };

    window.addEventListener('localleads-cookie-consent-change', onConsentChange);
    return () => window.removeEventListener('localleads-cookie-consent-change', onConsentChange);
  }, []);

  return null;
}
