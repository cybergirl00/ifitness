'use client';
import { Button } from "./ui/button";
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PaystackPop from '@paystack/inline-js';
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "lucide-react";
import UserSubscription from "./UserSubscription";

const Membership = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(''); 
    const { user } = useUser();
    const updateUser = useMutation(api.users.updateSub);
    const userdb = user?.id ? useQuery(api.users.getUserById, { clerkId: user.id }) : null;

    console.log(userdb)
    const plans = [
        {
            name: "Basic plan",
            price: 10000,
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
            name: "Medium plan",
            price: 20000,
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
            name: "Premium Plan",
            price: 50000,
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
    
    // PLAN CODES
    const basicPlan = "PLN_fdim4sgxz70dzto";
    const premiumPlan = 'PLN_6lzajvdosrg3no2';
    const mediumPlan = "PLN_2hi2jrdpazj04zh";

    const onSuccess = async (planCode: string, selectedPlan: string) => {
        setIsLoading(true);
        try {
            const subscriptionResponse = await fetch('/api/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer: user?.emailAddresses[0]?.emailAddress,
                    plan: planCode,
                }),
            });

            if (!subscriptionResponse.ok) {
                throw new Error('Failed to create subscription');
            }

            const data = await subscriptionResponse.json();
            console.log('Subscription Data:', data);

            await updateUser({
                subscription: selectedPlan,
                subcode: data?.data?.subscription_code,
            });

            toast.success("Subscription created successfully.");
        } catch (error) {
            console.error('Failed to create subscription:', error);
            toast.error("Failed to create subscription.");
        } finally {
            setIsLoading(false);
            setSelectedPlan(''); // Reset the selected plan
        }
    };
    const subscribe = async (planName: string, price: number) => {
        try {
            setIsLoading(true);
            setSelectedPlan(planName); // Set the selected plan

            let planCode = '';

            // Set planCode based on the selected plan
            switch (planName) {
                case 'Basic plan':
                    planCode = basicPlan;
                    break;
                case 'Medium plan':
                    planCode = mediumPlan;
                    break;
                case 'Premium Plan':
                    planCode = premiumPlan;
                    break;
                default:
                    planCode = '';
            }

            if (user) {
                // Create user inside Paystack
                const customerResponse = await fetch('/api/customer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (customerResponse.ok) {
                    toast("Customer created.");

                    // Initialize Paystack
                    const handler = PaystackPop.setup({
                        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
                        email: user?.emailAddresses[0].emailAddress!,
                        amount: price * 100, // Convert to kobo
                        currency: 'NGN',
                        callback: async function (response: any) {
                            const reference = response.reference;
                            await onSuccess(planCode, planName); // Pass the actual planCode to onSuccess
                        },
                        onClose: function () {
                            toast.error("Payment was not completed.");
                            setIsLoading(false);
                        },
                    });

                    handler.openIframe(); // Open the payment modal
                } else {
                    toast.error("Failed to create customer.");
                }
            } else {
                router.push('/sign-in');
                toast.error("User not found! Please sign in.");
            }
        } catch (error) {
            toast.error(`Failed to create customer. ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    

if (user && userdb &&  userdb?.subscription !== 'standard') return <UserSubscription userdb={userdb} />;
   
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
                    {plans.map((item, idx) => (
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
                                {item.features.map((featureItem, idx) => (
                                    <li key={idx} className='flex items-center gap-5'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5 text-primary'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'>
                                            <path
                                                fillRule='evenodd'
                                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                clipRule='evenodd'></path>
                                        </svg>
                                        {featureItem}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex-1 flex items-end">
                                <Button
                                    className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white'
                                    onClick={() => subscribe(item.name, item.price)}
                                    disabled={isLoading} // Disable only the selected plan's button
                                >
                                    {isLoading && selectedPlan === item.name ? (
                                        <Loader className="animate-spin h-4 w-4" />
                                    ) : 'Get Started'}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Membership;
