import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Verify the payment status with SSL Commerz
    const validationResponse = await fetch(
      'https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          val_id: body.val_id,
          store_id: process.env.SSLCOMMERZ_STORE_ID!,
          store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD!,
        }).toString(),
      }
    );

    const validationData = await validationResponse.json();

    if (validationData.status === 'VALID' || validationData.status === 'VALIDATED') {
      // Payment is successful
      // Update your database
      // Send confirmation email
      // Update order status
      
      return NextResponse.json({ status: 'success' });
    } else {
      throw new Error('Payment validation failed');
    }
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
} 