import apiClient from './apiClient';
import { ApiResponse, CreateProductRequest, UpdateProductRequest } from '../types/api';

export const productApi = {
  async getProducts(params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    // Strapi pagination
    if (params.page) {
      queryParams.append('pagination[page]', params.page.toString());
      queryParams.append('pagination[pageSize]', (params.limit || 10).toString());
    }

    // Strapi filters
    if (params.category) {
      queryParams.append('filters[category][id][$eq]', params.category);
    }
    if (params.search) {
      queryParams.append('filters[$or][0][name][$containsi]', params.search);
      queryParams.append('filters[$or][1][description][$containsi]', params.search);
    }
    if (params.minPrice) {
      queryParams.append('filters[price][$gte]', params.minPrice.toString());
    }
    if (params.maxPrice) {
      queryParams.append('filters[price][$lte]', params.maxPrice.toString());
    }

    // Strapi population
    queryParams.append('populate', '*');

    return apiClient<ApiResponse<any>>(`/products?${queryParams}`);
  },

  async getProduct(id: number) {
    return apiClient<ApiResponse<any>>(`/products/${id}?populate=*`);
  },

  async createProduct(data: CreateProductRequest) {
    return apiClient<ApiResponse<any>>('/products', {
      method: 'POST',
      body: { data },
    });
  },

  async updateProduct(data: UpdateProductRequest) {
    return apiClient<ApiResponse<any>>(`/products/${data.id}`, {
      method: 'PUT',
      body: { data },
    });
  },

  async deleteProduct(id: number) {
    return apiClient<ApiResponse<any>>(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  async uploadImages(productId: number, files: FileList) {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });
    formData.append('ref', 'api::product.product');
    formData.append('refId', productId.toString());
    formData.append('field', 'images');

    return apiClient<ApiResponse<any>>('/upload', {
      method: 'POST',
      headers: {
        'Content-Type': undefined,
      },
      body: formData,
    });
  },
}; 