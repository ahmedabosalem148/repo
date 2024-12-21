export interface Bundle {
  id: string;
  name: string;
  type: 'Premium' | 'Standard' | 'Basic';
  price: number;
  description: string;
  items: BundleItem[];
  savings: number;
  popularity: number;
}

export interface BundleItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export interface CartItem extends BundleItem {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}