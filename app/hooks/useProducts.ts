import { useState } from 'react';
import { productApi } from '@/app/lib/api/products';
import { CreateProductRequest, UpdateProductRequest, UpdatePriceRequest } from '@/app/lib/types/api';

export function useProducts() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRequest = async <T>(request: Promise<T>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await request;
            return response;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getProducts: (params: Parameters<typeof productApi.getProducts>[0]) =>
            handleRequest(productApi.getProducts(params)),
        getProduct: (id: number) => handleRequest(productApi.getProduct(id)),
        createProduct: (data: CreateProductRequest) =>
            handleRequest(productApi.createProduct(data)),
        updateProduct: (data: UpdateProductRequest) =>
            handleRequest(productApi.updateProduct(data)),
        updatePrice: (data: UpdatePriceRequest) =>
            handleRequest(productApi.updatePrice(data)),
        deleteProduct: (id: number) => handleRequest(productApi.deleteProduct(id)),
        uploadImages: (productId: number, files: FileList) =>
            handleRequest(productApi.uploadImages(productId, files)),
    };
} 