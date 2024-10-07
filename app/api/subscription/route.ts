import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_PLAN_CODE = process.env.PAYSTACK_BASIC_PLAN; // Ensure this environment variable is correct

export async function POST(request: NextRequest) {
  try {
    const { customer } = await request.json();

    // Make sure customer data is valid before making the request
    if (!customer || !PAYSTACK_PLAN_CODE) {
      return NextResponse.json({ error: 'Customer or plan code missing' }, { status: 400 });
    }

    const response = await axios.post(
      'https://api.paystack.co/subscription',
      {
        customer, // Customer ID or email
        plan: PAYSTACK_PLAN_CODE, // Plan code from the environment
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`, // Use Paystack Secret Key
          'Content-Type': 'application/json',
        },
      }
    );

    // Check if subscription was successfully created
    if (response.data.status === 'success') {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json({ error: 'Subscription creation failed' }, { status: 400 });
    }
  } catch (error) {
    // Extract a more detailed error message, if available
    const errorMessage = error.response?.data?.message || 'Failed to create subscription';
    console.error('Error creating subscription:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
