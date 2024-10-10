import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subscriptionCode = searchParams.get('subscriptionCode');

  if (!subscriptionCode) {
    return NextResponse.json({ error: 'Missing subscription code' }, { status: 400 });
  }

  // Fetch subscription details here using Paystack or any other service
  try {
    const response = await fetch(`https://api.paystack.co/subscription/${subscriptionCode}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Replace with your actual Paystack secret key
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch subscription from Paystack.');
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching subscription details:', error);
    return NextResponse.json({ error: 'Error fetching subscription details' }, { status: 500 });
  }
}
