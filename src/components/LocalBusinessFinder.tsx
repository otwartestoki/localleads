"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, LocateFixed, MapPin, Navigation, Phone, Search } from "lucide-react";
import { radiusClass } from "@/lib/style";

type LocalBusiness = {
  id: string;
  name: string;
  category: string;
  city: string;
  address: string;
  website: string;
  phone: string;
  rating: number;
  reviews: number;
  latitude: number;
  longitude: number;
  distanceKm: number;
};

type ApiResponse = {
  data: LocalBusiness[];
  error: string | null;
  demo?: boolean;
};

type GoogleMapsApi = {
  maps: {
    LatLngBounds: new () => {
      extend: (position: { lat: number; lng: number }) => void;
    };
    Map: new (
      element: HTMLElement,
      options: {
        center: { lat: number; lng: number };
        zoom: number;
        mapTypeControl?: boolean;
        streetViewControl?: boolean;
        fullscreenControl?: boolean;
      },
    ) => {
      fitBounds: (bounds: unknown) => void;
      setCenter: (position: { lat: number; lng: number }) => void;
      setZoom: (zoom: number) => void;
    };
    Marker: new (options: {
      position: { lat: number; lng: number };
      map: unknown;
      title?: string;
      label?: string;
      icon?: string;
    }) => {
      addListener: (eventName: string, handler: () => void) => void;
      setMap: (map: unknown | null) => void;
      setZIndex: (zIndex: number) => void;
    };
    Geocoder: new () => {
      geocode: (
        request: { address: string },
        callback: (
          results: Array<{
            formatted_address?: string;
            geometry: {
              location: {
                lat: () => number;
                lng: () => number;
              };
            };
          }> | null,
          status: string,
        ) => void,
      ) => void;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleMapsApi;
    localLeadsGoogleMapsPromise?: Promise<void>;
  }
}

const defaultLocation = {
  lat: 51.7474004,
  lng: 19.4866352,
  label: "Łódź, punkt startowy",
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

function formatDistance(value: number) {
  if (value < 1) return `${Math.round(value * 1000)} m`;
  return `${value.toFixed(1)} km`;
}

function normalizeUrl(value: string) {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}

function mapsUrl(business: LocalBusiness) {
  return `https://www.google.com/maps/search/?api=1&query=${business.latitude},${business.longitude}`;
}

function googleMapsLocationUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

function googleMapsEmbedUrl(lat: number, lng: number, zoom: number) {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function distanceBetweenPoints(fromLat: number, fromLng: number, toLat: number, toLng: number) {
  const earthRadiusKm = 6371;
  const dLat = ((toLat - fromLat) * Math.PI) / 180;
  const dLng = ((toLng - fromLng) * Math.PI) / 180;
  const lat1 = (fromLat * Math.PI) / 180;
  const lat2 = (toLat * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getFallbackMapBounds(userLocation: { lat: number; lng: number }, businesses: LocalBusiness[]) {
  const points = [
    { lat: userLocation.lat, lng: userLocation.lng },
    ...businesses.map((business) => ({ lat: business.latitude, lng: business.longitude })),
  ];
  const lats = points.map((point) => point.lat);
  const lngs = points.map((point) => point.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latPadding = Math.max((maxLat - minLat) * 0.2, 0.004);
  const lngPadding = Math.max((maxLng - minLng) * 0.2, 0.004);
  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;
  const maxDistanceKm = Math.max(
    0.6,
    ...points.map((point) => distanceBetweenPoints(centerLat, centerLng, point.lat, point.lng)),
  );

  return {
    minLat: minLat - latPadding,
    maxLat: maxLat + latPadding,
    minLng: minLng - lngPadding,
    maxLng: maxLng + lngPadding,
    centerLat,
    centerLng,
    maxDistanceKm,
  };
}

function getFallbackZoom(maxDistanceKm: number) {
  if (maxDistanceKm <= 1) return 15;
  if (maxDistanceKm <= 3) return 14;
  if (maxDistanceKm <= 7) return 13;
  if (maxDistanceKm <= 15) return 12;
  return 11;
}

function loadGoogleMaps() {
  if (typeof window === "undefined") return Promise.reject(new Error("Mapa jest dostępna tylko w przeglądarce."));
  if (window.google?.maps) return Promise.resolve();
  if (!googleMapsApiKey) return Promise.reject(new Error("Brakuje NEXT_PUBLIC_GOOGLE_MAPS_API_KEY."));
  if (window.localLeadsGoogleMapsPromise) return window.localLeadsGoogleMapsPromise;

  window.localLeadsGoogleMapsPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(googleMapsApiKey)}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Nie udało się załadować Google Maps."));
    document.head.appendChild(script);
  });

  return window.localLeadsGoogleMapsPromise;
}

function geocodeAddress(address: string) {
  return loadGoogleMaps().then(
    () =>
      new Promise<{ lat: number; lng: number; label: string }>((resolve, reject) => {
        if (!window.google?.maps) {
          reject(new Error("Nie udało się uruchomić Google Maps."));
          return;
        }

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          const firstResult = results?.[0];

          if (status !== "OK" || !firstResult) {
            reject(new Error("Nie znalazłem takiego adresu. Spróbuj dopisać miasto."));
            return;
          }

          resolve({
            lat: firstResult.geometry.location.lat(),
            lng: firstResult.geometry.location.lng(),
            label: firstResult.formatted_address || address,
          });
        });
      }),
  );
}

function GoogleBusinessMap({
  businesses,
  userLocation,
  activeId,
  onActivate,
}: {
  businesses: LocalBusiness[];
  userLocation: { lat: number; lng: number };
  activeId: string;
  onActivate: (id: string) => void;
}) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<InstanceType<GoogleMapsApi["maps"]["Map"]> | null>(null);
  const markersRef = useRef<InstanceType<GoogleMapsApi["maps"]["Marker"]>[]>([]);
  const [mapError, setMapError] = useState("");
  const activeBusiness = businesses.find((business) => business.id === activeId) || businesses[0];
  const fallbackBounds = useMemo(
    () => getFallbackMapBounds(userLocation, businesses),
    [businesses, userLocation.lat, userLocation.lng],
  );
  const fallbackZoom = getFallbackZoom(fallbackBounds.maxDistanceKm);
  const fallbackPointStyle = (lat: number, lng: number) => {
    const x = ((lng - fallbackBounds.minLng) / (fallbackBounds.maxLng - fallbackBounds.minLng || 1)) * 100;
    const y = 100 - ((lat - fallbackBounds.minLat) / (fallbackBounds.maxLat - fallbackBounds.minLat || 1)) * 100;

    return {
      left: `${clamp(x, 5, 95)}%`,
      top: `${clamp(y, 5, 95)}%`,
    };
  };

  useEffect(() => {
    if (!mapElementRef.current) return;

    let disposed = false;

    loadGoogleMaps()
      .then(() => {
        if (disposed || !window.google?.maps || !mapElementRef.current) return;

        const google = window.google;
        const center = { lat: userLocation.lat, lng: userLocation.lng };

        if (!mapRef.current) {
          mapRef.current = new google.maps.Map(mapElementRef.current, {
            center,
            zoom: 13,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          });
        }

        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(center);

        markersRef.current.push(
          new google.maps.Marker({
            position: center,
            map: mapRef.current,
            title: "Twoja lokalizacja",
            label: "Ty",
            icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }),
        );

        businesses.forEach((business, index) => {
          const marker = new google.maps.Marker({
            position: { lat: business.latitude, lng: business.longitude },
            map: mapRef.current,
            title: `${business.name} (${formatDistance(business.distanceKm)})`,
            label: String(index + 1),
          });

          marker.addListener("click", () => onActivate(business.id));
          marker.setZIndex(activeId === business.id ? 1000 : index + 1);
          bounds.extend({ lat: business.latitude, lng: business.longitude });
          markersRef.current.push(marker);
        });

        if (businesses.length) {
          mapRef.current.fitBounds(bounds);
        } else {
          mapRef.current.setCenter(center);
          mapRef.current.setZoom(13);
        }

        setMapError("");
      })
      .catch((error) => setMapError((error as Error).message));

    return () => {
      disposed = true;
    };
  }, [activeId, businesses, onActivate, userLocation.lat, userLocation.lng]);

  return (
    <div className={`${radiusClass()} relative min-h-[520px] overflow-hidden border border-white/10 bg-[#07111f]`}>
      {googleMapsApiKey ? (
        <div ref={mapElementRef} className="absolute inset-0" />
      ) : (
        <>
          <iframe
            title="Google Maps"
            src={googleMapsEmbedUrl(fallbackBounds.centerLat, fallbackBounds.centerLng, fallbackZoom)}
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div
            className="absolute z-20 flex h-10 min-w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#38bdf8] px-2 text-xs font-black text-slate-950 shadow-[0_0_24px_rgba(56,189,248,.5)]"
            style={fallbackPointStyle(userLocation.lat, userLocation.lng)}
            title="Twoja lokalizacja"
          >
            Ty
          </div>
          {businesses.map((business, index) => (
            <button
              key={business.id}
              type="button"
              onClick={() => onActivate(business.id)}
              className={`absolute z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-black shadow-xl transition ${
                activeBusiness?.id === business.id
                  ? "scale-110 border-amber-200 bg-amber-300 text-slate-950"
                  : "border-white/80 bg-white text-slate-950 hover:scale-105"
              }`}
              style={fallbackPointStyle(business.latitude, business.longitude)}
              title={`${business.name} (${formatDistance(business.distanceKm)})`}
            >
              {index + 1}
            </button>
          ))}
        </>
      )}

      <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/15 bg-slate-950/85 p-4 text-sm text-white/75 shadow-2xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-black text-white">Google Maps</p>
            <p className="mt-1 text-xs leading-5 text-white/55">
              {googleMapsApiKey
                ? "Pinezki pokazują firmy z bazy i Twoją lokalizację."
                : "To podgląd Google Maps. Dodaj NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, żeby włączyć przesuwaną mapę z natywnymi pinezkami."}
            </p>
          </div>
          <Link
            href={googleMapsLocationUrl(activeBusiness?.latitude || fallbackBounds.centerLat, activeBusiness?.longitude || fallbackBounds.centerLng)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-black text-white hover:border-[var(--brand-primary)]/60"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Otwórz w Google
          </Link>
        </div>
        {mapError ? <p className="mt-2 text-xs font-bold text-amber-100">{mapError}</p> : null}
      </div>
    </div>
  );
}

export default function LocalBusinessFinder() {
  const [location, setLocation] = useState(defaultLocation);
  const [radiusKm, setRadiusKm] = useState("5");
  const [category, setCategory] = useState("");
  const [minRating, setMinRating] = useState("4");
  const [minReviews, setMinReviews] = useState("0");
  const [sort, setSort] = useState("distance");
  const [businesses, setBusinesses] = useState<LocalBusiness[]>([]);
  const [activeId, setActiveId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationMessage, setLocationMessage] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      lat: String(location.lat),
      lng: String(location.lng),
      radiusKm,
      sort,
    });

    if (category.trim()) params.set("category", category.trim());
    if (minRating) params.set("minRating", minRating);
    if (minReviews) params.set("minReviews", minReviews);
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") params.set("demo", "1");

    setIsLoading(true);
    setError(null);

    fetch(`/api/local-businesses?${params.toString()}`, { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        const result = (await response.json()) as ApiResponse;
        if (!response.ok || result.error) throw new Error(result.error || "Nie udało się pobrać firm.");
        setBusinesses(result.data || []);
        setActiveId(result.data?.[0]?.id || "");
      })
      .catch((fetchError) => {
        if ((fetchError as Error).name !== "AbortError") {
          setBusinesses([]);
          setActiveId("");
          setError((fetchError as Error).message);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [category, location.lat, location.lng, minRating, minReviews, radiusKm, sort]);

  const useBrowserLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage("Ta przeglądarka nie udostępnia geolokalizacji.");
      return;
    }

    setLocationMessage("Pobieram lokalizację...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: "Twoja lokalizacja",
        });
        setLocationMessage("Używam Twojej lokalizacji.");
      },
      () => setLocationMessage("Nie udało się pobrać lokalizacji. Zostawiam punkt startowy."),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const useAddressLocation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const address = addressInput.trim();
    if (!address) {
      setLocationMessage("Wpisz adres, miasto albo dzielnicę.");
      return;
    }

    setIsGeocoding(true);
    setLocationMessage("Szukam adresu...");

    geocodeAddress(address)
      .then((result) => {
        setLocation(result);
        setLocationMessage(`Używam adresu: ${result.label}`);
      })
      .catch((geocodeError) => setLocationMessage((geocodeError as Error).message))
      .finally(() => setIsGeocoding(false));
  };

  const activeBusiness = businesses.find((business) => business.id === activeId) || businesses[0];

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.25fr]">
        <section className={`${radiusClass()} border border-white/10 bg-[var(--brand-surface)]/75 p-4 md:p-5`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[.14em] text-[var(--brand-primary-soft)]">Punkt startowy</p>
              <p className="mt-2 text-sm font-bold text-white">{location.label}</p>
              <p className="mt-1 text-xs font-semibold text-white/45">
                {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
              </p>
            </div>
            <button
              type="button"
              onClick={useBrowserLocation}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-[var(--brand-primary)] bg-[var(--brand-primary)] px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-sky-300"
            >
              <LocateFixed className="h-4 w-4" />
              Użyj GPS
            </button>
          </div>

          <form onSubmit={useAddressLocation} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)]">
              Wpisz adres
              <input
                value={addressInput}
                onChange={(event) => setAddressInput(event.target.value)}
                placeholder="np. Piotrkowska 120, Łódź"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[var(--brand-primary)]/70"
              />
            </label>
            <button
              type="submit"
              disabled={isGeocoding}
              className="inline-flex items-center justify-center gap-2 self-end rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:border-[var(--brand-primary)]/60 disabled:opacity-50"
            >
              <Search className="h-4 w-4" />
              {isGeocoding ? "Szukam..." : "Ustaw adres"}
            </button>
          </form>

          {locationMessage ? <p className="mt-3 text-xs font-semibold text-white/50">{locationMessage}</p> : null}
        </section>

        <section className={`${radiusClass()} border border-white/10 bg-[var(--brand-surface)]/75 p-4 md:p-5`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[.14em] text-[var(--brand-primary-soft)]">Filtry katalogu</p>
              <p className="mt-1 text-sm font-semibold text-white/45">Zawężaj firmy według branży, promienia i jakości profilu.</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)] xl:col-span-2">
              Branża
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="np. fryzjer, kosmetyczka"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[var(--brand-primary)]/70"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)]">
              Promień
              <select value={radiusKm} onChange={(event) => setRadiusKm(event.target.value)} className="rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[var(--brand-primary)]/70">
                <option value="1">1 km</option>
                <option value="3">3 km</option>
                <option value="5">5 km</option>
                <option value="10">10 km</option>
                <option value="25">25 km</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)]">
              Ocena
              <select value={minRating} onChange={(event) => setMinRating(event.target.value)} className="rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[var(--brand-primary)]/70">
                <option value="">Dowolna</option>
                <option value="3.5">3.5+</option>
                <option value="4">4.0+</option>
                <option value="4.5">4.5+</option>
                <option value="4.8">4.8+</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)]">
              Opinie
              <select value={minReviews} onChange={(event) => setMinReviews(event.target.value)} className="rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[var(--brand-primary)]/70">
                <option value="0">Dowolnie</option>
                <option value="10">10+</option>
                <option value="50">50+</option>
                <option value="100">100+</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-[var(--brand-muted)] md:col-span-2 xl:col-span-1">
              Sortuj
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[var(--brand-primary)]/70">
                <option value="distance">Najbliżej</option>
                <option value="rating">Najlepiej oceniane</option>
                <option value="reviews">Najwięcej opinii</option>
              </select>
            </label>
          </div>
        </section>
      </div>

      {error ? (
        <div className={`${radiusClass()} border border-red-400/30 bg-red-500/10 p-5 text-sm font-bold text-red-100`}>
          {error}
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
          <GoogleBusinessMap businesses={businesses} userLocation={location} activeId={activeBusiness?.id || ""} onActivate={setActiveId} />

          <div className={`${radiusClass()} border border-white/10 bg-[var(--brand-surface)]/75 p-4`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[.14em] text-[var(--brand-primary-soft)]">Najbliższe firmy</p>
                <h2 className="mt-1 text-2xl font-black text-white">{isLoading ? "Ładowanie..." : `${businesses.length} wyników`}</h2>
              </div>
              <Navigation className="h-5 w-5 text-[var(--brand-primary-soft)]" />
            </div>

            <div className="mt-4 grid max-h-[620px] gap-3 overflow-y-auto pr-1">
              {businesses.map((business, index) => (
                <article
                  key={business.id}
                  className={`rounded-2xl border p-4 transition ${
                    activeBusiness?.id === business.id
                      ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/10"
                      : "border-white/10 bg-white/[.035] hover:border-white/20"
                  }`}
                  onMouseEnter={() => setActiveId(business.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black text-[var(--brand-primary-soft)]">#{index + 1} • {formatDistance(business.distanceKm)}</p>
                      <h3 className="mt-1 line-clamp-2 font-black text-white">{business.name}</h3>
                      {business.category ? <p className="mt-1 text-sm font-bold text-white/55">{business.category}</p> : null}
                    </div>
                    <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-black text-amber-100">
                      {business.rating ? `${business.rating.toFixed(1)} ★` : "brak oceny"}
                    </span>
                  </div>
                  <p className="mt-3 flex gap-2 text-sm text-white/60">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                    <span>{[business.city, business.address].filter(Boolean).join(" • ")}</span>
                  </p>
                  <p className="mt-2 text-xs font-bold text-white/45">{business.reviews ? `${business.reviews} opinii` : "Brak liczby opinii"}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={mapsUrl(business)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-black text-white/70 hover:border-[var(--brand-primary)]/50 hover:text-[var(--brand-primary-soft)]">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Google Maps
                    </Link>
                    {business.phone ? (
                      <Link href={`tel:${business.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-black text-white/70 hover:border-[var(--brand-primary)]/50 hover:text-[var(--brand-primary-soft)]">
                        <Phone className="h-3.5 w-3.5" />
                        Zadzwoń
                      </Link>
                    ) : null}
                    {business.website ? (
                      <Link href={normalizeUrl(business.website)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-black text-white/70 hover:border-[var(--brand-primary)]/50 hover:text-[var(--brand-primary-soft)]">
                        <ExternalLink className="h-3.5 w-3.5" />
                        WWW
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))}
              {!isLoading && !businesses.length ? (
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-6 text-center text-sm font-bold text-white/55">
                  Brak firm w wybranym promieniu lub filtrach.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
