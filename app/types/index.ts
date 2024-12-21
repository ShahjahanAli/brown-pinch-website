export interface ProductDetails {
  weight: string;
  size: string;
  servings: string;
  allergens: string[];
  ingredients: string[];
  nutritionalInfo: {
    calories: string;
    fat: string;
    protein: string;
    carbs: string;
  };
  dietary?: string[]; // e.g., ['Vegetarian', 'Gluten-Free']
  storageInfo: string;
  shelfLife: string;
  availableColors?: string[]; // For customizable cakes
  availableFlavors?: string[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  images: string[]; // Array of additional product images
  category: string;
  details: ProductDetails;
  customization?: {
    message?: string;
    size?: string;
    flavor?: string;
    color?: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
  customization?: {
    message?: string;
    size?: string;
    flavor?: string;
  };
}

export interface Address {
  id?: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
} 