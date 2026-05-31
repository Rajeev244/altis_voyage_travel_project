# Destination Images

Local image assets for every destination. The image registry
(`src/lib/imageRegistry.ts`) loads everything in this directory
automatically via `import.meta.glob` — no code changes needed when
adding artwork.

## Preferred layout — per place (one folder per place)

```
src/assets/destinations/
  <country-slug>/
    <place-slug>/
      hero.jpg     # hero image for THIS place only
      01.jpg       # gallery image 1
      02.jpg       # gallery image 2
      03.jpg       # ...
```

- `<country-slug>` MUST match the `slug` in `COUNTRIES`
  (`src/lib/destinations.ts`).
- `<place-slug>` MUST equal `placeNameToSlug(place.name)` — e.g.
  the place "Tanah Lot Temple" → folder `tanah-lot-temple/`.
- `hero.*` is used as the hero. If no `hero.*` exists, the
  first file (alphanumerically) is used.
- All other files in the folder become the gallery, sorted
  alphanumerically. The hero is NEVER repeated in the gallery.
- No image from another place can ever leak into this place's
  gallery — galleries are scoped strictly to the place's folder.
- Supported extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.

Drop a new `<country>/<place>/` folder onto disk and it works
automatically — no code edits required.

## Legacy layout — country level (fallback)

Still supported for countries that don't have per-place folders yet:

```
src/assets/destinations/
  <country-slug>/
    00.jpg   # country cover + hero for the 1st place
    01.jpg   # hero for the 2nd place
    ...
```

Per-place folders always win over the legacy country pool for that
specific place.

## Programmatic override

For one-off cases (sharing an image across places, etc.), add an
entry to `PLACE_OVERRIDES` in `src/lib/imageRegistry.ts`.
