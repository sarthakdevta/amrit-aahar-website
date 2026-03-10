export interface MenuCategory {
  id: string
  name: string
  description: string | null
  sort_order: number
  created_at: string
}

export interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_vegetarian?: boolean
  is_available: boolean
  sort_order?: number
  created_at: string
  category?: MenuCategory
}

export interface GalleryImage {
  id: string
  image_url: string
  caption: string | null
  sort_order: number
  created_at: string
}

export interface ContactInfo {
  id: string
  address: string
  phone: string
  email: string
  opening_hours: string
  map_url: string | null
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  is_read: boolean
  created_at: string
}

export interface CustomerReview {
  id: string
  customer_name?: string
  name?: string // Legacy column name
  rating: number
  review_text?: string | null
  review?: string | null // Legacy column name
  is_approved?: boolean
  is_featured?: boolean // Legacy column name
  created_at: string
}
