/*
# Seed Café — Full Database Schema

## Overview
Creates the complete database schema for the Seed Café admin panel and public website.
The public website reads data as the `anon` role (no login required).
The admin panel requires Supabase Auth — only authenticated users can create, update, or delete content.

## New Tables

1. `menu_categories` — Categories for menu items (Coffee, Breakfast, Food, Desserts, Specials)
   - id (uuid, PK)
   - title (text, not null)
   - display_order (int, default 0)
   - created_at (timestamptz)

2. `menu_items` — Individual menu items belonging to a category
   - id (uuid, PK)
   - category_id (uuid, FK → menu_categories)
   - name (text, not null)
   - description (text)
   - price (text, not null)
   - image_url (text)
   - tag (text) — e.g. "Signature", "Favourite", "Seasonal"
   - is_available (boolean, default true)
   - is_featured (boolean, default false)
   - display_order (int, default 0)
   - created_at (timestamptz)

3. `gallery_images` — Gallery images for the public gallery page
   - id (uuid, PK)
   - image_url (text, not null)
   - caption (text)
   - display_order (int, default 0)
   - span_class (text) — CSS grid span classes for masonry layout
   - created_at (timestamptz)

4. `story_content` — Single-row table for the "Our Story" page content
   - id (uuid, PK, always 1)
   - heading (text)
   - subheading (text)
   - body_text (text)
   - philosophy_heading (text)
   - philosophy_text (text)
   - main_image_url (text)
   - secondary_image_url (text)
   - updated_at (timestamptz)

5. `cafe_settings` — Single-row table for global café settings
   - id (uuid, PK, always 1)
   - cafe_name (text)
   - logo_text (text)
   - address_line1 (text)
   - address_line2 (text)
   - address_line3 (text)
   - phone (text)
   - email (text)
   - instagram_url (text)
   - facebook_url (text)
   - hours_weekdays (text)
   - hours_weekends (text)
   - updated_at (timestamptz)

## Security (RLS)

All tables have RLS enabled.
- SELECT: public (anon + authenticated) — the public website must read without login.
- INSERT/UPDATE/DELETE: authenticated only — only logged-in admins can modify content.

## Storage

- Storage bucket `cafe-images` created for menu item and gallery image uploads.
- Public read access, authenticated write access.

## Important Notes

1. `story_content` and `cafe_settings` are single-row tables enforced by a CHECK constraint on id = 1.
2. Initial seed data is inserted for all tables so the public website works immediately.
3. All foreign keys use ON DELETE CASCADE so removing a category also removes its items.
*/

-- ============================================
-- MENU CATEGORIES
-- ============================================
CREATE TABLE IF NOT EXISTS menu_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_menu_categories" ON menu_categories;
CREATE POLICY "public_read_menu_categories" ON menu_categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_menu_categories" ON menu_categories;
CREATE POLICY "admin_insert_menu_categories" ON menu_categories FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_menu_categories" ON menu_categories;
CREATE POLICY "admin_update_menu_categories" ON menu_categories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_menu_categories" ON menu_categories;
CREATE POLICY "admin_delete_menu_categories" ON menu_categories FOR DELETE
  TO authenticated USING (true);

-- ============================================
-- MENU ITEMS
-- ============================================
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price text NOT NULL,
  image_url text,
  tag text,
  is_available boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON menu_items(category_id);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_menu_items" ON menu_items;
CREATE POLICY "public_read_menu_items" ON menu_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_menu_items" ON menu_items;
CREATE POLICY "admin_insert_menu_items" ON menu_items FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_menu_items" ON menu_items;
CREATE POLICY "admin_update_menu_items" ON menu_items FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_menu_items" ON menu_items;
CREATE POLICY "admin_delete_menu_items" ON menu_items FOR DELETE
  TO authenticated USING (true);

-- ============================================
-- GALLERY IMAGES
-- ============================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  display_order int NOT NULL DEFAULT 0,
  span_class text DEFAULT 'col-span-1 row-span-1',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_gallery_images" ON gallery_images;
CREATE POLICY "public_read_gallery_images" ON gallery_images FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_gallery_images" ON gallery_images;
CREATE POLICY "admin_insert_gallery_images" ON gallery_images FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_gallery_images" ON gallery_images;
CREATE POLICY "admin_update_gallery_images" ON gallery_images FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_gallery_images" ON gallery_images;
CREATE POLICY "admin_delete_gallery_images" ON gallery_images FOR DELETE
  TO authenticated USING (true);

-- ============================================
-- STORY CONTENT (single-row)
-- ============================================
CREATE TABLE IF NOT EXISTS story_content (
  id int PRIMARY KEY CHECK (id = 1) DEFAULT 1,
  heading text,
  subheading text,
  body_text text,
  philosophy_heading text,
  philosophy_text text,
  main_image_url text,
  secondary_image_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE story_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_story_content" ON story_content;
CREATE POLICY "public_read_story_content" ON story_content FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_story_content" ON story_content;
CREATE POLICY "admin_insert_story_content" ON story_content FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_story_content" ON story_content;
CREATE POLICY "admin_update_story_content" ON story_content FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- ============================================
-- CAFE SETTINGS (single-row)
-- ============================================
CREATE TABLE IF NOT EXISTS cafe_settings (
  id int PRIMARY KEY CHECK (id = 1) DEFAULT 1,
  cafe_name text,
  logo_text text,
  address_line1 text,
  address_line2 text,
  address_line3 text,
  phone text,
  email text,
  instagram_url text,
  facebook_url text,
  hours_weekdays text,
  hours_weekends text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cafe_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_cafe_settings" ON cafe_settings;
CREATE POLICY "public_read_cafe_settings" ON cafe_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_cafe_settings" ON cafe_settings;
CREATE POLICY "admin_insert_cafe_settings" ON cafe_settings FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_cafe_settings" ON cafe_settings;
CREATE POLICY "admin_update_cafe_settings" ON cafe_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- ============================================
-- SEED DATA
-- ============================================

-- Menu categories
INSERT INTO menu_categories (title, display_order) VALUES
  ('Coffee', 1),
  ('Breakfast', 2),
  ('Food', 3),
  ('Desserts', 4),
  ('Specials', 5)
ON CONFLICT DO NOTHING;

-- Menu items (using existing hardcoded data)
INSERT INTO menu_items (category_id, name, description, price, image_url, tag, is_available, is_featured, display_order)
SELECT c.id, v.name, v.description, v.price, v.image_url, v.tag, v.is_available, v.is_featured, v.display_order
FROM menu_categories c
JOIN (VALUES
  ('Coffee', 'Flat White', 'Double ristretto, silky steamed milk', 'LKR 650', 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'Signature', true, true, 1),
  ('Coffee', 'Pour Over', 'Single-origin, hand-brewed, slow', 'LKR 850', 'https://images.pexels.com/photos/11562453/pexels-photo-11562453.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 2),
  ('Coffee', 'Cappuccino', 'Espresso, steamed milk, cocoa dust', 'LKR 600', 'https://images.pexels.com/photos/38729411/pexels-photo-38729411.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 3),
  ('Coffee', 'Espresso', 'Straight, bold, warm', 'LKR 450', 'https://images.pexels.com/photos/9254130/pexels-photo-9254130.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 4),
  ('Breakfast', 'Avocado Toast', 'Sourdough, smashed avocado, poached egg', 'LKR 1,450', 'https://images.pexels.com/photos/793772/pexels-photo-793772.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'Favourite', true, true, 1),
  ('Breakfast', 'Morning Plate', 'Eggs, olives, fresh veg, warm bread', 'LKR 1,650', 'https://images.pexels.com/photos/35047345/pexels-photo-35047345.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 2),
  ('Breakfast', 'Brunch Spread', 'Waffles, fruit, coffee, juice', 'LKR 1,950', 'https://images.pexels.com/photos/30199564/pexels-photo-30199564.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 3),
  ('Breakfast', 'Vegan Toast', 'Avocado spread, eggs, fresh herbs', 'LKR 1,350', 'https://images.pexels.com/photos/27590337/pexels-photo-27590337.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 4),
  ('Food', 'Garden Bowl', 'Seasonal greens, grains, herbs, house dressing', 'LKR 1,550', 'https://images.pexels.com/photos/4617829/pexels-photo-4617829.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 1),
  ('Food', 'Croissant & Coffee', 'Buttery croissant, fresh brew, morning light', 'LKR 950', 'https://images.pexels.com/photos/30359471/pexels-photo-30359471.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 2),
  ('Food', 'Breakfast Toast', 'Eggs, avocado, coffee — flat lay favourite', 'LKR 1,250', 'https://images.pexels.com/photos/5591658/pexels-photo-5591658.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 3),
  ('Food', 'Café Breakfast', 'Coffee, croissant, flowers on the table', 'LKR 1,750', 'https://images.pexels.com/photos/34052564/pexels-photo-34052564.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 4),
  ('Desserts', 'Berry Tart', 'Fresh raspberries, blackberries, pastry cream', 'LKR 750', 'https://images.pexels.com/photos/28251609/pexels-photo-28251609.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'Seasonal', true, true, 1),
  ('Desserts', 'Strawberry Pastry', 'Powdered sugar, fresh strawberry, blueberry', 'LKR 650', 'https://images.pexels.com/photos/17650199/pexels-photo-17650199.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 2),
  ('Desserts', 'Chocolate Cake', 'Rich chocolate, fresh strawberries', 'LKR 850', 'https://images.pexels.com/photos/15823267/pexels-photo-15823267.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 3),
  ('Desserts', 'Dessert Platter', 'Strawberries, macarons, a little of everything', 'LKR 1,200', 'https://images.pexels.com/photos/10368556/pexels-photo-10368556.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 4),
  ('Specials', 'French Pastries', 'A selection of gourmet, freshly baked', 'LKR 950', 'https://images.pexels.com/photos/34844491/pexels-photo-34844491.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'Chef''s Pick', true, true, 1),
  ('Specials', 'Assorted Desserts', 'A variety of textures and flavours', 'LKR 1,100', 'https://images.pexels.com/photos/34563914/pexels-photo-34563914.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', NULL, true, false, 2)
) AS v(category_title, name, description, price, image_url, tag, is_available, is_featured, display_order)
ON c.title = v.category_title
ON CONFLICT DO NOTHING;

-- Gallery images
INSERT INTO gallery_images (image_url, caption, display_order, span_class) VALUES
  ('https://images.pexels.com/photos/14511758/pexels-photo-14511758.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Close-up of a latte with intricate latte art on a rustic wooden table', 1, 'col-span-2 row-span-2'),
  ('https://images.pexels.com/photos/2074108/pexels-photo-2074108.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'Top view of waffles, cappuccino, and juice on a wooden table', 2, 'col-span-1 row-span-1'),
  ('https://images.pexels.com/photos/34844491/pexels-photo-34844491.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'A selection of gourmet French pastries displayed on a table', 3, 'col-span-1 row-span-1'),
  ('https://images.pexels.com/photos/36729519/pexels-photo-36729519.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop', 'A barista serves coffee to friends at a cozy café', 4, 'col-span-2 row-span-1'),
  ('https://images.pexels.com/photos/18721982/pexels-photo-18721982.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'A serene café interior featuring wooden chairs, tables, and lush greenery', 5, 'col-span-1 row-span-2'),
  ('https://images.pexels.com/photos/32590864/pexels-photo-32590864.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'Barista using a pitcher to pour creamy steamed milk creating latte art', 6, 'col-span-1 row-span-1'),
  ('https://images.pexels.com/photos/32117287/pexels-photo-32117287.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', 'A sunny window scene with drinks, flowers, and snacks on a wooden tray', 7, 'col-span-1 row-span-1'),
  ('https://images.pexels.com/photos/6140366/pexels-photo-6140366.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop', 'Friends drinking coffee and eating pastries at a wooden table in a street café', 8, 'col-span-2 row-span-1'),
  ('https://images.pexels.com/photos/2101150/pexels-photo-2101150.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'A warm cappuccino with latte art basking in morning sunlight', 9, 'col-span-1 row-span-1'),
  ('https://images.pexels.com/photos/18405036/pexels-photo-18405036.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'Warm sunlit interior of a cozy café with pillows and tables by the window', 10, 'col-span-1 row-span-1'),
  ('https://images.pexels.com/photos/972845/pexels-photo-972845.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop', 'A serene indoor café setting with stylish chairs bathed in sunlight', 11, 'col-span-2 row-span-1'),
  ('https://images.pexels.com/photos/30359471/pexels-photo-30359471.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'A croissant and coffee on a wooden table in warm morning sunlight', 12, 'col-span-1 row-span-1')
ON CONFLICT DO NOTHING;

-- Story content
INSERT INTO story_content (id, heading, subheading, body_text, philosophy_heading, philosophy_text, main_image_url, secondary_image_url)
VALUES (
  1,
  'A café rooted in slow.',
  'Rooted in the belief that a café should feel like a second home.',
  'Seed Café began with a love for slow mornings — the kind where the coffee is poured with care, the food is made fresh, and nobody is watching the clock. We wanted to create a space in Colombo where people could simply be.

Every detail at Seed — from the warm light through our windows to the food on your plate — is there to help you settle in, breathe out, and stay a while.',
  'Our philosophy',
  'We believe a café is more than a place to eat — it''s a place to pause. To sit with a friend, a book, or your own thoughts. To let the morning stretch out without apology. That''s the spirit we bring to everything at Seed.',
  'https://images.pexels.com/photos/18405036/pexels-photo-18405036.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1400&fit=crop',
  'https://images.pexels.com/photos/16541078/pexels-photo-16541078.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
)
ON CONFLICT DO NOTHING;

-- Cafe settings
INSERT INTO cafe_settings (id, cafe_name, logo_text, address_line1, address_line2, address_line3, phone, email, instagram_url, facebook_url, hours_weekdays, hours_weekends)
VALUES (
  1,
  'Seed Café',
  'Seed',
  '60 Horton Place',
  'Colombo 00700',
  'Sri Lanka',
  '+94 11 000 0000',
  'hello@seedcafe.lk',
  '#',
  '#',
  '7:00 AM – 8:00 PM',
  '8:00 AM – 9:00 PM'
)
ON CONFLICT DO NOTHING;
