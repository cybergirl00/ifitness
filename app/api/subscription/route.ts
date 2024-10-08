import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const { customer, plan } = await request.json();

    // Validate customer and plan data
    if (!customer || !plan) {
      return NextResponse.json({ error: 'Customer or plan code missing' }, { status: 400 });
    }

    console.log('Request Data:', { customer, plan });

    // Send request to Paystack
    const response = await axios.post(
      'https://api.paystack.co/subscription',
      { customer, plan },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`, // Use Paystack Secret Key
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Paystack Response:', response.data);

    // Check if Paystack response is successful
    if (response.data.status) {
      return NextResponse.json(response.data); // Return successful response
    } else {
      return NextResponse.json({ error: 'Subscription creation failed' }, { status: 400 });
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create subscription';
    console.error('Error')
    }

}