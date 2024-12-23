import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse } from '@/lib/types/api';

// Get category by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        products: true,
      },
    });

    if (!category) {
      return NextResponse.json<ApiResponse<any>>(
        {
          success: false,
          error: 'Category not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json<ApiResponse<any>>(
      {
        success: false,
        error: 'Failed to fetch category',
      },
      { status: 500 }
    );
  }
}

// Update category
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(params.id) },
      data: body,
    });

    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: updatedCategory,
      message: 'Category updated successfully',
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json<ApiResponse<any>>(
      {
        success: false,
        error: 'Failed to update category',
      },
      { status: 500 }
    );
  }
}

// Delete category
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.category.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json<ApiResponse<any>>({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json<ApiResponse<any>>(
      {
        success: false,
        error: 'Failed to delete category',
      },
      { status: 500 }
    );
  }
} 