-- Add missing columns to menu_items
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS is_vegetarian BOOLEAN DEFAULT TRUE;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;

-- Add missing columns to menu_categories
ALTER TABLE menu_categories ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE menu_categories RENAME COLUMN display_order TO sort_order;

-- Add missing column to customer_reviews
ALTER TABLE customer_reviews ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE;

-- Rename columns in customer_reviews to match types
ALTER TABLE customer_reviews RENAME COLUMN name TO customer_name;
ALTER TABLE customer_reviews RENAME COLUMN review TO review_text;

-- Add missing columns to contact_info
ALTER TABLE contact_info ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE contact_info ADD COLUMN IF NOT EXISTS opening_hours TEXT;
ALTER TABLE contact_info ADD COLUMN IF NOT EXISTS map_url TEXT;

-- Add missing column to gallery_images
ALTER TABLE gallery_images RENAME COLUMN display_order TO sort_order;

-- Update existing data to have proper values
UPDATE menu_items SET is_vegetarian = TRUE WHERE is_vegetarian IS NULL;
UPDATE menu_items SET sort_order = 0 WHERE sort_order IS NULL;
UPDATE customer_reviews SET is_approved = TRUE WHERE is_approved IS NULL;
