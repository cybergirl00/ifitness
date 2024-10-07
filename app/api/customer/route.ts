import { NextResponse } from 'next/server';
import axios from 'axios';
import { currentUser } from '@clerk/nextjs/server'


export async function POST(request: Request) {
    const user = await currentUser();

  try {
    const response = await axios.post(
      'https://api.paystack.co/customer',
      { email: user?.emailAddresses[0].emailAddress, first_name: user?.firstName, last_name: user?.lastName,},
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
