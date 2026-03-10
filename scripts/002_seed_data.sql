-- Insert default categories
INSERT INTO menu_categories (name, slug, display_order) VALUES
  ('Fast Food', 'fast-food', 1),
  ('South Indian', 'south-indian', 2),
  ('Meals', 'meals', 3),
  ('Beverages', 'beverages', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category_id, is_available, is_popular) VALUES
  ('Samosa', 'Crispy fried pastry with spiced potato filling', 15.00, (SELECT id FROM menu_categories WHERE slug = 'fast-food'), true, true),
  ('Pav Bhaji', 'Spiced mixed vegetable mash served with buttered pav', 80.00, (SELECT id FROM menu_categories WHERE slug = 'fast-food'), true, true),
  ('Vada Pav', 'Mumbai style spiced potato fritter in a bun', 25.00, (SELECT id FROM menu_categories WHERE slug = 'fast-food'), true, true),
  ('Chole Bhature', 'Spiced chickpea curry with fried bread', 90.00, (SELECT id FROM menu_categories WHERE slug = 'fast-food'), true, false),
  ('Paneer Tikka', 'Grilled cottage cheese with spices', 120.00, (SELECT id FROM menu_categories WHERE slug = 'fast-food'), true, false),
  ('Masala Dosa', 'Crispy rice crepe with spiced potato filling', 70.00, (SELECT id FROM menu_categories WHERE slug = 'south-indian'), true, true),
  ('Idli Sambhar', 'Steamed rice cakes with lentil soup', 50.00, (SELECT id FROM menu_categories WHERE slug = 'south-indian'), true, false),
  ('Uttapam', 'Thick rice pancake with vegetables', 60.00, (SELECT id FROM menu_categories WHERE slug = 'south-indian'), true, false),
  ('Medu Vada', 'Crispy fried lentil donuts', 45.00, (SELECT id FROM menu_categories WHERE slug = 'south-indian'), true, false),
  ('Rava Dosa', 'Crispy semolina crepe', 75.00, (SELECT id FROM menu_categories WHERE slug = 'south-indian'), true, false),
  ('Thali', 'Complete meal with dal, sabzi, roti, rice, and more', 150.00, (SELECT id FROM menu_categories WHERE slug = 'meals'), true, true),
  ('Dal Rice', 'Lentil curry with steamed rice', 80.00, (SELECT id FROM menu_categories WHERE slug = 'meals'), true, false),
  ('Paneer Rice', 'Cottage cheese curry with rice', 100.00, (SELECT id FROM menu_categories WHERE slug = 'meals'), true, false),
  ('Masala Chai', 'Traditional Indian spiced tea', 20.00, (SELECT id FROM menu_categories WHERE slug = 'beverages'), true, true),
  ('Lassi', 'Sweet yogurt drink', 40.00, (SELECT id FROM menu_categories WHERE slug = 'beverages'), true, false),
  ('Cold Coffee', 'Chilled coffee with cream', 50.00, (SELECT id FROM menu_categories WHERE slug = 'beverages'), true, false),
  ('Fresh Lime Soda', 'Refreshing lime drink', 35.00, (SELECT id FROM menu_categories WHERE slug = 'beverages'), true, false),
  ('Mango Shake', 'Fresh mango milkshake', 60.00, (SELECT id FROM menu_categories WHERE slug = 'beverages'), true, false);

-- Insert default contact info
INSERT INTO contact_info (phone, whatsapp, address, city, state, pincode, google_maps_embed, business_hours) VALUES
  (
    '096301 55945',
    '919630155945',
    'Shop no 01, Vaibhav Merige Garden, Kolar Rd, MP Nagar, Lalita Nagar, Kolar Rd',
    'Bhopal',
    'Madhya Pradesh',
    '462042',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.5899999999997!2d77.4399999!3d23.2099999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAmrit+Aahar+Fast+Food+Cafe!5e0!3m2!1sen!2sin!4v1234567890',
    '{"monday": "9:00 AM - 10:00 PM", "tuesday": "9:00 AM - 10:00 PM", "wednesday": "9:00 AM - 10:00 PM", "thursday": "9:00 AM - 10:00 PM", "friday": "9:00 AM - 10:00 PM", "saturday": "9:00 AM - 10:00 PM", "sunday": "9:00 AM - 10:00 PM"}'
  );

-- Insert sample reviews
INSERT INTO customer_reviews (name, rating, review, is_featured) VALUES
  ('Rahul Sharma', 5, 'Best fast food in Bhopal! The Pav Bhaji is absolutely delicious. Highly recommended!', true),
  ('Priya Patel', 5, 'Amazing dosa and very friendly staff. Clean place with great ambiance.', true),
  ('Amit Singh', 4, 'Good quality food at reasonable prices. The thali is value for money.', true),
  ('Neha Gupta', 5, 'My go-to place for South Indian food. Fresh and tasty every time!', true);
