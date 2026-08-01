export type PlantCategory = 'all' | 'indoor' | 'outdoor' | 'fruits' | 'succulents' | 'pots_supplies' | 'native_assam';

export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  category: PlantCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  sunlight: 'Low Light' | 'Bright Indirect' | 'Full Sun' | 'Partial Shade';
  watering: 'Weekly' | '2-3 Times/Week' | 'When Top Soil Dry' | 'Minimal (Bi-weekly)';
  maintenance: 'Low Maintenance' | 'Moderate' | 'High Care';
  petFriendly: boolean;
  airPurifying: boolean;
  image: string;
  inStock: boolean;
  isBestseller?: boolean;
  isNativeAssam?: boolean;
  idealFor: string;
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  startingPrice: string;
  recommendedFor: string;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  plantPurchased?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'doctor';
  text: string;
  timestamp: string;
  plantContext?: string;
}

export interface FilterState {
  category: PlantCategory;
  search: string;
  maxPrice: number;
  sunlight: string;
  maintenance: string;
  petFriendlyOnly: boolean;
  airPurifyingOnly: boolean;
  nativeAssamOnly: boolean;
}
