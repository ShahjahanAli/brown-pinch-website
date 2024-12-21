'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customization, setCustomization] = useState({
    message: '',
    size: 'medium',
    flavor: 'vanilla'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity)); // Prevent quantity from going below 1
  };

  const handleAddToCart = () => {
    if (product.category === 'Special Occasions') {
      setIsCustomizing(true);
    } else {
      addToCart(product, quantity);
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      // Reset quantity after adding to cart
      setQuantity(1);
    }
  };

  const handleCustomizationSubmit = () => {
    addToCart(product, quantity, customization);
    setIsCustomizing(false);
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    // Reset quantity and customization after adding to cart
    setQuantity(1);
    setCustomization({
      message: '',
      size: 'medium',
      flavor: 'vanilla'
    });
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center justify-center space-x-4 bg-gray-50 p-2 rounded-lg">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
        >
          <FaMinus className="text-gray-600 text-sm" />
        </button>
        <span className="w-12 text-center font-medium">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
        >
          <FaPlus className="text-gray-600 text-sm" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full bg-rose-600 text-white py-3 px-4 rounded-lg hover:bg-rose-700 transition-colors relative ${
          showSuccess ? 'bg-green-600 hover:bg-green-700' : ''
        }`}
      >
        {showSuccess ? 'Added to Cart!' : 'Add to Cart'}
      </button>

      {/* Customization Modal */}
      {isCustomizing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Customize Your Order</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Message on Cake</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  value={customization.message}
                  onChange={(e) => setCustomization({ ...customization, message: e.target.value })}
                  placeholder="Happy Birthday!"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  value={customization.size}
                  onChange={(e) => setCustomization({ ...customization, size: e.target.value })}
                >
                  <option value="small">Small (6")</option>
                  <option value="medium">Medium (8")</option>
                  <option value="large">Large (10")</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Flavor</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  value={customization.flavor}
                  onChange={(e) => setCustomization({ ...customization, flavor: e.target.value })}
                >
                  <option value="vanilla">Vanilla</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="strawberry">Strawberry</option>
                  <option value="red-velvet">Red Velvet</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsCustomizing(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomizationSubmit}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 