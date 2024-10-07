'use client'
import { Button } from "./ui/button";
import { useUser } from '@clerk/nextjs'
import { useState } from "react";
import { useRouter } from "next/navigation";
import PaystackPop from '@paystack/inline-js';

const paystackInstance = new PaystackPop();
const Membership = () => {
    const router = useRouter();
    const [phone, setPhone] = useState('')
    const { user } = useUser()
    const plans = [
        {
            name: "Basic plan",
            price: 12,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",

            ],
        },
        {
            name: "Startup",
            price: 35,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },
        {
            name: "Enterprise",
            price: 60,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },
    ];
    const onSuccess = async  () => {
        const subscriptionResponse = await fetch('/api/subscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customer: user?.emailAddresses[0].emailAddress }),
          });
  
          if (subscriptionResponse.ok) {
            const data = await subscriptionResponse.json();
            return data;
          } else {
            console.error('Failed to create subscription');
          }
    }
    
    const subscribe = async () => {
        if (user) {
          try {
            // CREATE USER INSIDE PAYSTACK
            const customerResponse = await fetch('/api/customer', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (customerResponse.ok) {
              // THEN CREATE SUBSCRIPTION
              const handler = PaystackPop.setup({
                key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!, // Make sure the key exists
                email: user?.emailAddresses[0].emailAddress!,
                amount: 10000 * 100, // Amount is in kobo, so multiply by 100
                currency: 'NGN',
                callback: function (response: any) {
                    const reference = response.reference;
                    // Handle successful payment
                    onSuccess(reference: any);
                },
                onClose: function () {
                    alert('Payment was not completed');
                },
            });

            handler.openIframe();
            } else {
              console.error('Failed to create customer');
            }
          } catch (error) {
            console.log('Error:', error);
          }
        } else {
          router.push('/sign-in');
        }
      };
      

  return (
    <section className='py-14'>
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className='relative max-w-xl mx-auto sm:text-center'>
            <h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
               Our <span className='text-primary'>Membership</span> Plans
            </h3>
            <div className='mt-3 max-w-xl'>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat nunc.
                </p>
            </div>
        </div>
        <div className='mt-16 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
            {
                plans.map((item, idx) => (
                    <div key={idx} className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2'>
                        <div>
                            <span className='text-primary font-medium'>
                                {item.name}
                            </span>
                            <div className='mt-4 text-gray-800 text-3xl font-semibold'>
                                ${item.price} <span className="text-xl text-gray-600 font-normal">/mo</span>
                            </div>
                        </div>
                        <ul className='py-8 space-y-3'>
                            {
                                item.features.map((featureItem, idx) => (
                                    <li key={idx} className='flex items-center gap-5'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5 text-primary'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'>
                                            <path
                                                fill-rule='evenodd'
                                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                clip-rule='evenodd'></path>
                                        </svg>
                                        {featureItem}
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="flex-1 flex items-end">
                        <Button className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white'
                        onClick={subscribe}
                   >
                                Get Started
                            </Button>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
</section>
  )
}

export default Membership