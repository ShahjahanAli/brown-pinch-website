'use client';
import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useCheckout } from '../../context/CheckoutContext';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

export default function OrderConfirmation() {
  const { state: cartState, clearCart } = useCart();
  const { state: checkoutState, dispatch: checkoutDispatch } = useCheckout();

  useEffect(() => {
    // Clear cart and reset checkout after successful order
    clearCart();
    checkoutDispatch({ type: 'RESET_CHECKOUT' });
  }, [clearCart, checkoutDispatch]);

  return (
    <main className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-rose-600 mb-6">
            <FaCheckCircle className="w-16 h-16 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-8">
            Your order has been successfully placed. We'll send you an email confirmation shortly.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="text-left space-y-2">
              <p>
                <span className="font-medium">Delivery Address:</span>
                <br />
                {checkoutState.shippingAddress?.fullName}
                <br />
                {checkoutState.shippingAddress?.street}
                <br />
                {checkoutState.shippingAddress?.city}, {checkoutState.shippingAddress?.state} {checkoutState.shippingAddress?.zipCode}
              </p>
              <p>
                <span className="font-medium">Delivery Time:</span>
                <br />
                {checkoutState.deliveryTime}
              </p>
              <p>
                <span className="font-medium">Payment Method:</span>
                <br />
                {checkoutState.paymentMethod}
              </p>
            </div>
          </div>

          <Link
            href="/menu"
            className="inline-block bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
} 