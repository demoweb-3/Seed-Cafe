export type MenuCategory = {
  id: string;
  title: string;
  display_order: number;
  created_at: string;
};

export type MenuItem = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
  tag: string | null;
  is_available: boolean;
  is_featured: boolean;
  display_order: number;
  created_at: string;
};

export type MenuItemWithCategory = MenuItem & {
  menu_categories?: MenuCategory;
};

export type GalleryImage = {
  id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
  span_class: string;
  created_at: string;
};

export type StoryContent = {
  id: number;
  heading: string | null;
  subheading: string | null;
  body_text: string | null;
  philosophy_heading: string | null;
  philosophy_text: string | null;
  main_image_url: string | null;
  secondary_image_url: string | null;
  updated_at: string;
};

export type CafeSettings = {
  id: number;
  cafe_name: string | null;
  logo_text: string | null;
  address_line1: string | null;
  address_line2: string | null;
  address_line3: string | null;
  phone: string | null;
  email: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  hours_weekdays: string | null;
  hours_weekends: string | null;
  latitude: number | null;
  longitude: number | null;
  map_url: string | null;
  updated_at: string;
};
