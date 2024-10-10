// /app/api/fetchall/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Example API fetch, replace with your real API endpoint
    const response = await fetch('https://api.paystack.co/subscription', {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Ensure this key is set correctly in your .env file
      },
    });

    if (!response.ok) {
      // Handle non-200 response codes from the API
      return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle server-side error
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
