import { NextResponse } from 'next/server';
import { SSLCommerzConfig } from '@/app/types/payment';

const SSLCOMMERZ_STORE_ID = process.env.SSLCOMMERZ_STORE_ID!;
const SSLCOMMERZ_STORE_PASSWORD = process.env.SSLCOMMERZ_STORE_PASSWORD!;
const SSLCOMMERZ_API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://securepay.sslcommerz.com/gwprocess/v4/api.php'
  : 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cartItems, shippingAddress, totalAmount } = body;

    // Generate a unique transaction ID
    const tranId = `BP-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const sslcommerzConfig: SSLCommerzConfig = {
      store_id: SSLCOMMERZ_STORE_ID,
      store_passwd: SSLCOMMERZ_STORE_PASSWORD,
      total_amount: totalAmount,
      currency: 'BDT',
      tran_id: tranId,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/ipn`,
      shipping_method: 'Delivery',
      product_name: cartItems.map((item: any) => item.name).join(', '),
      product_category: 'Food',
      product_profile: 'general',
      cus_name: shippingAddress.fullName,
      cus_email: 'customer@example.com', // You should get this from user data
      cus_add1: shippingAddress.street,
      cus_add2: '',
      cus_city: shippingAddress.city,
      cus_state: shippingAddress.state,
      cus_postcode: shippingAddress.zipCode,
      cus_country: 'Bangladesh',
      cus_phone: shippingAddress.phone,
      shipping_to: shippingAddress.fullName,
    };

    // Initialize SSL Commerz payment
    const response = await fetch(SSLCOMMERZ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(sslcommerzConfig as any).toString(),
    });

    const data = await response.json();

    if (data.status === 'SUCCESS') {
      return NextResponse.json({
        status: 'success',
        redirectUrl: data.GatewayPageURL,
        transactionId: tranId,
      });
    } else {
      throw new Error(data.failedreason || 'Payment initialization failed');
    }
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
} 