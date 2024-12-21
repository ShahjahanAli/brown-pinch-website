'use client';
import { Product } from '../types';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';

interface ProductDetailsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <IoMdClose size={24} />
          </button>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Product Image */}
            <div className="relative h-72 md:h-full rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-rose-600 font-bold text-xl mt-2">${product.price.toFixed(2)}</p>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Weight</p>
                  <p className="text-gray-900">{product.details.weight}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Size</p>
                  <p className="text-gray-900">{product.details.size}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Servings</p>
                  <p className="text-gray-900">{product.details.servings}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Shelf Life</p>
                  <p className="text-gray-900">{product.details.shelfLife}</p>
                </div>
              </div>

              {/* Ingredients & Allergens */}
              <div>
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <p className="text-gray-600 text-sm">{product.details.ingredients.join(', ')}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Allergens</h3>
                <div className="flex flex-wrap gap-2">
                  {product.details.allergens.map((allergen) => (
                    <span 
                      key={allergen}
                      className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutritional Information */}
              <div>
                <h3 className="font-semibold mb-2">Nutritional Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600">Calories</p>
                    <p className="font-medium">{product.details.nutritionalInfo.calories}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600">Fat</p>
                    <p className="font-medium">{product.details.nutritionalInfo.fat}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600">Protein</p>
                    <p className="font-medium">{product.details.nutritionalInfo.protein}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600">Carbs</p>
                    <p className="font-medium">{product.details.nutritionalInfo.carbs}</p>
                  </div>
                </div>
              </div>

              {/* Dietary Information */}
              {product.details.dietary && product.details.dietary.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Dietary Information</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.details.dietary.map((diet) => (
                      <span 
                        key={diet}
                        className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Information */}
              <div>
                <h3 className="font-semibold mb-2">Storage Information</h3>
                <p className="text-gray-600 text-sm">{product.details.storageInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 