-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_available BOOLEAN DEFAULT TRUE,
  is_popular BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  category TEXT DEFAULT 'food',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact_info table (single row for business info)
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  whatsapp TEXT,
  address TEXT NOT NULL,
  city TEXT,
  state TEXT,
  pincode TEXT,
  google_maps_embed TEXT,
  business_hours JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact_messages table for customer inquiries
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create customer_reviews table
CREATE TABLE IF NOT EXISTS customer_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for menu, gallery, contact info, and reviews
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access to gallery_images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access to contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access to customer_reviews" ON customer_reviews FOR SELECT USING (true);

-- Public can insert contact messages
CREATE POLICY "Allow public to insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Admin policies (authenticated users can manage all data)
CREATE POLICY "Allow authenticated to manage categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated to manage menu_items" ON menu_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated to manage gallery_images" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated to manage contact_info" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated to manage contact_messages" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated to manage customer_reviews" ON customer_reviews FOR ALL USING (auth.role() = 'authenticated');
