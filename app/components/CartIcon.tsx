'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import CartDrawer from './CartDrawer';

export default function CartIcon() {
  const { state } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <button 
        className="relative"
        onClick={() => setIsDrawerOpen(true)}
      >
        <FaShoppingCart className="h-6 w-6 text-gray-700 hover:text-rose-600" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            {itemCount}
          </span>
        )}
      </button>
      <CartDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
} 