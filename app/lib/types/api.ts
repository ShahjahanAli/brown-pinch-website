// API Response Types
export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  success: boolean;
  error?: string;
}

// API Request Types
export interface CreateCategoryRequest {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  id: number;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  category_id: number;
  image: string;
  images?: string[];
  details: {
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
    dietary?: string[];
    storageInfo: string;
    shelfLife: string;
    availableColors?: string[];
    availableFlavors?: string[];
  };
  isCustomizable?: boolean;
  isActive?: boolean;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number;
}

export interface UpdatePriceRequest {
  id: number;
  price: number;
  specialPrice?: number;
  validFrom?: Date;
  validTo?: Date;
} 