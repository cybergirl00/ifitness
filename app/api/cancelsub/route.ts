import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subscriptionCode, token } = body;

    // Use your secret key from Paystack
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

    const response = await fetch(`https://api.paystack.co/subscription/disable`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: subscriptionCode,
        token,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to cancel subscription.');
    }
    

    return NextResponse.json({ success: true, message: 'Subscription cancelled successfully.' });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return NextResponse.json({ success: false, message: 'Error canceling subscription.' }, { status: 500 });
  }
}
