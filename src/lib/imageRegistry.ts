/**
 * Centralized image registry for all destination imagery.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS FILE EXISTS
 * ---------------------------------------------------------------------------
 * All destination, place, hero, gallery, and card imagery for the entire site
 * is managed here. Destination data files (src/lib/destinations.ts) NEVER hold
 * image URLs — they only describe content (name, description, tips…).
 *
 * Every page (homepage, /destinations, /destinations/:country, /destinations/
 * :country/:place, /packages, etc.) reads images through the helpers below
 * and will update automatically.
 *
 * ---------------------------------------------------------------------------
 * HOW IMAGES ARE LOADED (LOCAL ASSETS ONLY)
 * ---------------------------------------------------------------------------
 * Preferred (per-place) layout — every place owns its own folder:
 *
 *     src/assets/destinations/<countrySlug>/<placeSlug>/hero.{jpg|png|webp|avif}
 *     src/assets/destinations/<countrySlug>/<placeSlug>/01.jpg
 *     src/assets/destinations/<countrySlug>/<placeSlug>/02.jpg
 *     ...
 *
 *   - A file literally named `hero.*` becomes the hero. If none exists,
 *     the first file (alphanumerically) is promoted to hero.
 *   - All remaining files in the same folder become the gallery, sorted
 *     alphanumerically. The hero is NEVER repeated inside the gallery.
 *   - No image from another place can ever leak into a place's gallery.
 *   - `<placeSlug>` MUST equal `placeNameToSlug(place.name)`.
 *
 * Legacy (country-level) layout — still supported as a fallback so existing
 * folders keep working until per-place folders are added:
 *
 *     src/assets/destinations/<countrySlug>/*.{jpg,jpeg,png,webp,avif}
 *
 *   - File at index 0 → country cover & hero for the 1st place.
 *   - File at index i → hero for the i-th place declared in COUNTRIES.
 *   - Galleries rotate through the remaining files (excluding the hero).
 *
 * Per-place folders ALWAYS win over the country-level fallback for that
 * place's hero and gallery. Country cover prefers a country-level file at
 * the top of the folder; otherwise it falls back to the first place's hero.
 *
 * Files are picked up automatically at build time via Vite's
 * `import.meta.glob` — no manual imports, no remote URLs. Drop the files
 * in the right folder and they appear on the site.
 *
 * To override a single place programmatically (e.g. share an image across
 * folders) add an entry to PLACE_OVERRIDES below.
 */

import { COUNTRIES, placeNameToSlug } from "./destinations";

/**
 * Eagerly import every destination image as a URL string. Vite resolves this
 * at build time, so all assets are bundled, hashed, and tree-shaken normally.
 *
 * The glob matches BOTH layouts:
 *   - `destinations/<country>/<file>`            (legacy country-level)
 *   - `destinations/<country>/<place>/<file>`    (per-place, preferred)
 */
const ASSET_MODULES = import.meta.glob<string>(
  "../assets/destinations/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, query: "?url", import: "default" },
);

interface PlaceAssets {
  hero: string;
  gallery: string[];
}

function buildAssetMaps(): {
  countryFiles: Record<string, string[]>;
  placeFiles: Record<string, Record<string, PlaceAssets>>;
} {
  const countryRaw: Record<string, Array<{ name: string; url: string }>> = {};
  const placeRaw: Record<string, Record<string, Array<{ name: string; url: string }>>> = {};

  for (const [path, url] of Object.entries(ASSET_MODULES)) {
    // 3-level: ../assets/destinations/<country>/<place>/<file>
    const placeMatch = path.match(/destinations\/([^/]+)\/([^/]+)\/([^/]+)$/);
    if (placeMatch) {
      const [, country, place, file] = placeMatch;
      ((placeRaw[country] ??= {})[place] ??= []).push({ name: file, url });
      continue;
    }
    // 2-level: ../assets/destinations/<country>/<file>
    const countryMatch = path.match(/destinations\/([^/]+)\/([^/]+)$/);
    if (countryMatch) {
      const [, country, file] = countryMatch;
      (countryRaw[country] ??= []).push({ name: file, url });
    }
  }

  const byName = (a: { name: string }, b: { name: string }) =>
    a.name.localeCompare(b.name, undefined, { numeric: true });

  const countryFiles: Record<string, string[]> = {};
  for (const [country, files] of Object.entries(countryRaw)) {
    files.sort(byName);
    countryFiles[country] = files.map((f) => f.url);
  }

  const placeFiles: Record<string, Record<string, PlaceAssets>> = {};
  for (const [country, places] of Object.entries(placeRaw)) {
    placeFiles[country] = {};
    for (const [placeSlug, files] of Object.entries(places)) {
      files.sort(byName);
      // Explicit `hero.*` wins; otherwise the first file becomes the hero.
      const heroIdx = files.findIndex((f) => /^hero\.[a-z0-9]+$/i.test(f.name));
      const resolvedHeroIdx = heroIdx >= 0 ? heroIdx : files.length > 0 ? 0 : -1;
      const hero = resolvedHeroIdx >= 0 ? files[resolvedHeroIdx].url : "";
      const gallery = files
        .filter((_, i) => i !== resolvedHeroIdx)
        .map((f) => f.url);
      placeFiles[country][placeSlug] = { hero, gallery };
    }
  }

  return { countryFiles, placeFiles };
}

const { countryFiles: COUNTRY_ASSETS, placeFiles: PLACE_ASSETS } = buildAssetMaps();

/** Generic fallback if a country/place has no local imagery yet. */
const FALLBACK_IMAGE: string =
  Object.values(COUNTRY_ASSETS).find((arr) => arr && arr.length > 0)?.[0] ??
  Object.values(PLACE_ASSETS)
    .flatMap((places) => Object.values(places))
    .find((p) => p.hero)?.hero ??
  "";

export interface CountryImageSet {
  /** Country cover used on listing cards & country hero. */
  cover: string;
  /** Ordered hero images — one per place, in the order declared in COUNTRIES. */
  placeImages: string[];
}

/**
 * Image set per country, derived from files on disk. The cover prefers a
 * country-level file; the per-place hero list is built from each place's
 * dedicated folder when present, falling back to the country rotation.
 */
export const COUNTRY_IMAGES: Record<string, CountryImageSet> = (() => {
  const out: Record<string, CountryImageSet> = {};
  const countrySlugs = new Set<string>([
    ...Object.keys(COUNTRY_ASSETS),
    ...Object.keys(PLACE_ASSETS),
    ...COUNTRIES.map((c) => c.slug),
  ]);
  for (const slug of countrySlugs) {
    const countryUrls = COUNTRY_ASSETS[slug] ?? [];
    const places = PLACE_ASSETS[slug] ?? {};
    const country = COUNTRIES.find((c) => c.slug === slug);
    const placeImages: string[] = country
      ? country.places.map((p, i) => {
          const ps = placeNameToSlug(p.name);
          return (
            places[ps]?.hero ??
            countryUrls[i] ??
            countryUrls[0] ??
            FALLBACK_IMAGE
          );
        })
      : [
          ...countryUrls,
          ...Object.values(places)
            .map((p) => p.hero)
            .filter(Boolean),
        ];
    const cover = countryUrls[0] ?? placeImages[0] ?? FALLBACK_IMAGE;
    out[slug] = { cover, placeImages };
  }
  return out;
})();

/**
 * Per-place overrides — use sparingly when a specific place needs imagery
 * that lives outside its dedicated folder. Key format:
 * `${countrySlug}/${placeSlug}` where placeSlug = placeNameToSlug(place.name).
 *
 *   import tanahLot from "@/assets/destinations/bali/tanah-lot-temple/hero.jpg";
 *   export const PLACE_OVERRIDES = {
 *     "bali/tanah-lot-temple": { hero: tanahLot, gallery: [tanahLot, ...] },
 *   };
 */
export const PLACE_OVERRIDES: Record<string, { hero?: string; gallery?: string[] }> = {};

/** Resolve the ordered index of a place inside its country. */
function getPlaceIndex(countrySlug: string, placeSlug: string): number {
  const country = COUNTRIES.find((c) => c.slug === countrySlug);
  if (!country) return -1;
  return country.places.findIndex((p) => placeNameToSlug(p.name) === placeSlug);
}

/** Country cover image (used by listing cards, hero backdrops, package cards). */
export function getCountryCover(countrySlug: string): string {
  return COUNTRY_IMAGES[countrySlug]?.cover ?? FALLBACK_IMAGE;
}

/** Hero image for a specific place. */
export function getPlaceHero(countrySlug: string, placeSlug: string): string {
  const override = PLACE_OVERRIDES[`${countrySlug}/${placeSlug}`]?.hero;
  if (override) return override;

  // 1. Per-place folder (preferred).
  const placeHero = PLACE_ASSETS[countrySlug]?.[placeSlug]?.hero;
  if (placeHero) return placeHero;

  // 2. Legacy country-level rotation.
  const set = COUNTRY_IMAGES[countrySlug];
  if (!set || set.placeImages.length === 0) return FALLBACK_IMAGE;
  const idx = getPlaceIndex(countrySlug, placeSlug);
  if (idx < 0) return set.cover;
  return set.placeImages[idx % set.placeImages.length] ?? set.cover;
}

/**
 * Gallery for a place.
 *  - If the place has its own folder, returns ONLY that folder's images,
 *    with the hero excluded. No images from other places can appear.
 *  - Otherwise falls back to rotating through the country's image set
 *    (up to 5 images), excluding the place's hero.
 *  - Returns an empty array (UI handles this gracefully) if nothing is
 *    available.
 */
export function getPlaceGallery(countrySlug: string, placeSlug: string): string[] {
  const override = PLACE_OVERRIDES[`${countrySlug}/${placeSlug}`]?.gallery;
  if (override && override.length > 0) return override;

  // 1. Per-place folder — return that folder's images only, hero excluded.
  const placeBucket = PLACE_ASSETS[countrySlug]?.[placeSlug];
  if (placeBucket) {
    return placeBucket.gallery.filter((url) => url !== placeBucket.hero);
  }

  // 2. Legacy fallback: rotate the country pool, excluding this place's hero.
  const set = COUNTRY_IMAGES[countrySlug];
  if (!set || set.placeImages.length === 0) return [];
  const heroForPlace = getPlaceHero(countrySlug, placeSlug);
  const idx = Math.max(0, getPlaceIndex(countrySlug, placeSlug));
  const out: string[] = [];
  for (let k = 1; k <= set.placeImages.length && out.length < 5; k++) {
    const pick = set.placeImages[(idx + k) % set.placeImages.length];
    if (pick && pick !== heroForPlace && !out.includes(pick)) out.push(pick);
  }
  return out;
}
