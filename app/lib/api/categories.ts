import apiClient from './apiClient';
import { ApiResponse, CreateCategoryRequest, UpdateCategoryRequest } from '../types/api';

export const categoryApi = {
  async getCategories() {
    return apiClient<ApiResponse<any>>('/categories?populate=*');
  },

  async getCategory(id: number) {
    return apiClient<ApiResponse<any>>(`/categories/${id}?populate=*`);
  },

  async createCategory(data: CreateCategoryRequest) {
    return apiClient<ApiResponse<any>>('/categories', {
      method: 'POST',
      body: { data },
    });
  },

  async updateCategory(data: UpdateCategoryRequest) {
    return apiClient<ApiResponse<any>>(`/categories/${data.id}`, {
      method: 'PUT',
      body: { data },
    });
  },

  async deleteCategory(id: number) {
    return apiClient<ApiResponse<any>>(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
}; 