'use client';
import { useState, useEffect } from 'react';
import { useProducts } from '@/app/hooks/useProducts';
import { Product, CreateProductRequest } from '@/app/lib/types/api';
import { FaEdit, FaTrash, FaSearch, FaPlus, FaImages } from 'react-icons/fa';
import Image from 'next/image';

export default function ProductManager() {
  const { 
    loading, 
    error, 
    getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    uploadImages 
  } = useProducts();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Form state
  const [formData, setFormData] = useState<CreateProductRequest>({
    name: '',
    price: 0,
    description: '',
    category_id: 0,
    image: '',
    details: {
      weight: '',
      size: '',
      servings: '',
      allergens: [],
      ingredients: [],
      nutritionalInfo: {
        calories: '',
        fat: '',
        protein: '',
        carbs: '',
      },
      storageInfo: '',
      shelfLife: '',
    },
  });

  useEffect(() => {
    loadProducts();
  }, [currentPage, selectedCategory]);

  const loadProducts = async () => {
    try {
      const response = await getProducts({
        page: currentPage,
        limit: 10,
        category: selectedCategory,
        search: searchTerm,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      });
      
      if (response.success) {
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    await loadProducts();
  };

  const handleCreateProduct = async () => {
    try {
      const response = await createProduct(formData);
      if (response.success) {
        setIsModalOpen(false);
        resetForm();
        loadProducts();
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      const response = await updateProduct({
        id: selectedProduct.id,
        ...formData,
      });
      if (response.success) {
        setIsModalOpen(false);
        setSelectedProduct(null);
        resetForm();
        loadProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      const response = await deleteProduct(selectedProduct.id);
      if (response.success) {
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
        loadProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleImageUpload = async (productId: number, files: FileList) => {
    try {
      const response = await uploadImages(productId, files);
      if (response.success) {
        loadProducts();
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      description: '',
      category_id: 0,
      image: '',
      details: {
        weight: '',
        size: '',
        servings: '',
        allergens: [],
        ingredients: [],
        nutritionalInfo: {
          calories: '',
          fat: '',
          protein: '',
          carbs: '',
        },
        storageInfo: '',
        shelfLife: '',
      },
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-rose-700"
        >
          <FaPlus /> <span>Add Product</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="">All Categories</option>
            {/* Add your categories here */}
          </select>
          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              className="w-full border rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative h-16 w-16">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setFormData(product);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash size={20} />
                    </button>
                    <label className="cursor-pointer text-green-600 hover:text-green-900">
                      <FaImages size={20} />
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && handleImageUpload(product.id, e.target.files)}
                      />
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1
                ? 'bg-rose-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">Loading...</div>
        </div>
      )}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {selectedProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            {/* Add your form fields here */}
            <div className="space-y-4">
              {/* Basic Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
              </div>
              {/* Add more form fields for other product details */}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedProduct(null);
                  resetForm();
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={selectedProduct ? handleUpdateProduct : handleCreateProduct}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                {selectedProduct ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {selectedProduct?.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 