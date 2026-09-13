/*
# Seed Café — Storage Bucket and Policies

## Overview
Creates a public storage bucket `cafe-images` for uploading menu item images and gallery images.
Sets up storage policies so that:
- Anyone (anon + authenticated) can READ images — the public website needs to display them.
- Only authenticated users (admins) can UPLOAD, UPDATE, and DELETE files.

## Storage Bucket
- Name: `cafe-images`
- Public: true (allows public read access via URL)

## Storage Policies
- public read: SELECT for anon, authenticated
- admin write: INSERT, UPDATE, DELETE for authenticated only
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('cafe-images', 'cafe-images', true)
ON CONFLICT DO NOTHING;

-- Public read access
DROP POLICY IF EXISTS "public_read_cafe_images" ON storage.objects;
CREATE POLICY "public_read_cafe_images" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'cafe-images');

-- Admin upload
DROP POLICY IF EXISTS "admin_insert_cafe_images" ON storage.objects;
CREATE POLICY "admin_insert_cafe_images" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'cafe-images');

-- Admin update
DROP POLICY IF EXISTS "admin_update_cafe_images" ON storage.objects;
CREATE POLICY "admin_update_cafe_images" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'cafe-images') WITH CHECK (bucket_id = 'cafe-images');

-- Admin delete
DROP POLICY IF EXISTS "admin_delete_cafe_images" ON storage.objects;
CREATE POLICY "admin_delete_cafe_images" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'cafe-images');
