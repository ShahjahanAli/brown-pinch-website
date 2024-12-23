import { NextResponse } from 'next/server';
import { categoryApi } from '@/app/lib/api/categories';
import { ApiResponse } from '@/app/lib/types/api';

export async function GET() {
  try {
    const response = await categoryApi.getCategories();
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json<ApiResponse<any>>(
      {
        success: false,
        error: 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await categoryApi.createCategory(body);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json<ApiResponse<any>>(
      {
        success: false,
        error: 'Failed to create category',
      },
      { status: 500 }
    );
  }
} 