'use client';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import AddressForm from '../components/AddressForm';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import { Address } from '../types';

const deliveryTimes = [
  '9:00 AM - 11:00 AM',
  '11:00 AM - 1:00 PM',
  '1:00 PM - 3:00 PM',
  '3:00 PM - 5:00 PM',
  '5:00 PM - 7:00 PM',
];

const paymentMethods = [
  { id: 'sslcommerz', name: 'Pay with SSL Commerz', icon: '💳' },
  { id: 'cash', name: 'Cash on Delivery', icon: '💵' },
];

export default function Checkout() {
  const { state: cartState } = useCart();
  const { state, dispatch } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    if (cartState.items.length === 0) {
      router.push('/cart');
    }
  }, [cartState.items.length, router]);

  const handleAddressSubmit = (address: Address) => {
    dispatch({ type: 'SET_SHIPPING_ADDRESS', payload: address });
    dispatch({ type: 'SET_STEP', payload: 2 });
  };

  const handleDeliveryTimeSelect = (time: string) => {
    dispatch({ type: 'SET_DELIVERY_TIME', payload: time });
    dispatch({ type: 'SET_STEP', payload: 3 });
  };

  const handlePaymentMethodSelect = async (method: string) => {
    dispatch({ type: 'SET_PAYMENT_METHOD', payload: method });

    if (method === 'sslcommerz') {
      try {
        const response = await fetch('/api/payment/sslcommerz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartItems: cartState.items,
            shippingAddress: state.shippingAddress,
            totalAmount: cartState.total + 5, // Including delivery fee
          }),
        });

        const data = await response.json();

        if (data.status === 'success') {
          // Redirect to SSL Commerz payment page
          window.location.href = data.redirectUrl;
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Payment error:', error);
        // Handle payment error (show error message to user)
      }
    } else {
      // Handle other payment methods
      router.push('/checkout/confirmation');
    }
  };

  return (
    <main className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {['Delivery Address', 'Delivery Time', 'Payment'].map((step, index) => (
                <div
                  key={step}
                  className={`flex-1 relative ${
                    index < state.step ? 'text-rose-600' : 'text-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        index < state.step
                          ? 'border-rose-600 bg-rose-600 text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {index < state.step ? <FaCheck /> : index + 1}
                    </div>
                    <div className="ml-2">{step}</div>
                  </div>
                  {index < 2 && (
                    <div
                      className={`absolute top-4 w-full h-0.5 ${
                        index < state.step - 1 ? 'bg-rose-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {state.step === 1 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Delivery Address</h2>
                <AddressForm onSubmit={handleAddressSubmit} />
              </div>
            )}

            {state.step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Choose Delivery Time</h2>
                <div className="space-y-3">
                  {deliveryTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleDeliveryTimeSelect(time)}
                      className="w-full p-4 text-left border rounded-lg hover:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {state.step === 3 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handlePaymentMethodSelect(method.id)}
                      className="w-full p-4 text-left border rounded-lg hover:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <span className="mr-2">{method.icon}</span>
                      {method.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 