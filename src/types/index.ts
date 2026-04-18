export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  subcategoryId: number;
  inStock: boolean;
  image: string;
  unit: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  name: string;
  count: number;
  image: string;
}
