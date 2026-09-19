/*
# Add map location fields to cafe_settings

1. Modified Tables
- `cafe_settings`: adds three new nullable columns for map location support.
  - `latitude` (double precision) — café latitude coordinate
  - `longitude` (double precision) — café longitude coordinate
  - `map_url` (text) — optional full Google Maps URL (e.g. a place link)

2. Notes
- All three columns are nullable so existing rows and code keep working without changes.
- The public Contact page and Home page will use lat/lng when available to center
  the embedded map and build the "Get Directions" link, falling back to the
  address text query when lat/lng are absent.
- No RLS policy changes needed — existing policies on cafe_settings already
  allow anon read and authenticated update.
*/

ALTER TABLE cafe_settings
  ADD COLUMN IF NOT EXISTS latitude double precision,
  ADD COLUMN IF NOT EXISTS longitude double precision,
  ADD COLUMN IF NOT EXISTS map_url text;
