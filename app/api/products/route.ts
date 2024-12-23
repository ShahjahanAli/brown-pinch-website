import { NextResponse } from 'next/server';
import { productApi } from '@/app/lib/api/products';
import { ApiResponse } from '@/app/lib/types/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      category: searchParams.get('category'),
      search: searchParams.get('search'),
      minPrice: searchParams.get('minPrice'),
      maxPrice: searchParams.get('maxPrice'),
    };

    const response = await productApi.getProducts(params as any);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json<ApiResponse<any>>(
      {
        data: [],
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await productApi.createProduct(body);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json<ApiResponse<any>>(
      {
        data: [],
        success: false,
        error: 'Failed to create product',
      },
      { status: 500 }
    );
  }
} 