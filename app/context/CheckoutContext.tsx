'use client';
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Address } from '../types';

interface CheckoutState {
  step: number;
  shippingAddress: Address | null;
  paymentMethod: string | null;
  deliveryTime: string | null;
}

type CheckoutAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_SHIPPING_ADDRESS'; payload: Address }
  | { type: 'SET_PAYMENT_METHOD'; payload: string }
  | { type: 'SET_DELIVERY_TIME'; payload: string }
  | { type: 'RESET_CHECKOUT' };

const CheckoutContext = createContext<{
  state: CheckoutState;
  dispatch: React.Dispatch<CheckoutAction>;
} | null>(null);

const initialState: CheckoutState = {
  step: 1,
  shippingAddress: null,
  paymentMethod: null,
  deliveryTime: null,
};

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_SHIPPING_ADDRESS':
      return { ...state, shippingAddress: action.payload };
    case 'SET_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload };
    case 'SET_DELIVERY_TIME':
      return { ...state, deliveryTime: action.payload };
    case 'RESET_CHECKOUT':
      return initialState;
    default:
      return state;
  }
}

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}; 