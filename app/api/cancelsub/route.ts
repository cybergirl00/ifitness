import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { subscriptionCode, token } = req.body;

    try {
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

      res.status(200).json({ success: true, message: 'Subscription cancelled successfully.' });
    } catch (error) {
      console.error('Error canceling subscription:', error);
      res.status(500).json({ success: false, message: 'Error canceling subscription.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
