import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Replace with your Paystack secret key
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: NextRequest) {
  try {
    const { email, amount } = await req.json();  // Get email and amount from request body

    if (!email || !amount) {
      return NextResponse.json({ error: 'Email and amount are required' }, { status: 400 });
    }

    // Prepare the data to send to Paystack
    const data = {
      email: email,            // Customer's email
      amount: amount * 100,    // Amount in kobo (1 Naira = 100 kobo)
      callback_url: 'https://ifitness-smoky.vercel.app/', // Callback URL
      currency: 'NGN',         // Optional: Set currency, default is NGN
    };

    // Send the request to Paystack to initialize the transaction
    const response = await axios.post('https://api.paystack.co/transaction/initialize', data, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // The payment URL where the user will complete the payment
    const { authorization_url } = response.data.data;

    // Respond with the payment URL
    return NextResponse.json({ paymentUrl: authorization_url });
  } catch (error) {
    console.error('Error initializing transaction:', error.response ? error.response.data : error.message);
    return NextResponse.json({ error: 'Transaction initialization failed' }, { status: 500 });
  }
}
