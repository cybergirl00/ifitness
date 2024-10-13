'use client'
import { useUser } from "@clerk/clerk-react";
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "./ui/button";
import Countdown from 'react-countdown';
import { toast } from "sonner";
import PaystackPop from "@paystack/inline-js";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const UserSubscription = ({ userdb }: { userdb: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const [subscription, setSubscription] = useState<any>(null);
  const updateUser = useMutation(api.users.updateSub);

  const basicPlan = "PLN_fdim4sgxz70dzto";
  const mediumPlan = "PLN_2hi2jrdpazj04zh";
  const premiumPlan = 'PLN_6lzajvdosrg3no2';
  
  useEffect(() => {
    const fetchSubscription = async () => {
      if (user && userdb) {
        try {
          const response = await fetch(`/api/fetchsub?subscriptionCode=${userdb?.subcode}`, {
            method: 'GET',
          });
          if (!response.ok) {
            throw new Error('Failed to fetch subscription details.');
          }
          const data = await response.json();
          console.log('Subscription Data:', data.data.data);
          setSubscription(data.data.data);
        } catch (error) {
          console.error('Error fetching subscription:', error);
          toast.error('Error fetching subscription details.');
        }
      }
    };
    fetchSubscription();
  }, [user, userdb]);

  const cancelMembership = async () => {
    if (!subscription) return; // Early return if no subscription

    try {
      const response = await fetch('/api/cancelsub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionCode: userdb?.subcode, token: userdb?.email_token }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        toast.success('Subscription cancelled successfully.');
        // Optionally fetch updated subscription details here
      } else {
        toast.error(data.message || 'Failed to cancel subscription.');
      }
    } catch (error) {
      toast.error('Error canceling subscription.');
    }
  };

  const onSuccess = async (planCode: string, selectedPlan: string) => {
    setIsLoading(true);
    try {
      const subscriptionResponse = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: user?.emailAddresses[0]?.emailAddress, plan: planCode }),
      });

      if (!subscriptionResponse.ok) throw new Error('Failed to create subscription');

      const data = await subscriptionResponse.json();
      await updateUser({ subscription: selectedPlan, subcode: data?.data?.subscription_code });

      toast.success("Subscription created successfully.");
    } catch (error) {
      toast.error("Failed to create subscription.");
    } finally {
      setIsLoading(false);
    }
  };

  const renew = async (selectedPlan: string) => {
    try {
      const plan = userdb?.subscription;
      const planCode = 
        plan === 'Basic plan' ? basicPlan : 
        plan === 'Medium plan' ? mediumPlan : 
        premiumPlan;

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Paystack public key
        email: user?.emailAddresses[0]?.emailAddress,
        amount: 5000 * 100, // Amount in kobo
        onSuccess: async (transaction) => {
          // Payment was successful, trigger onSuccess with the selected plan and plan code
          await onSuccess(planCode, plan);
          toast.success("Payment successful!");
        },
        onCancel: () => {
          toast.error("Payment cancelled.");
        },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold">Your Subscription</h3>
        <p className="text-lg text-gray-600">
          You are currently on: <span className="text-primary font-bold">{userdb?.subscription}</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <Image
            src={'/orange2.jpg'} 
            width={350}
            height={350}
            alt='Membership Image'
            className='rounded-lg shadow-lg'
          />
        </div>

        {/* Subscription Details Section */}
        <div className="flex-1 space-y-6">
          <div className="text-left">
            <h1 className="text-xl font-semibold">
              Hello, <span className="text-primary font-light">{user?.firstName}</span>!
            </h1>
            <p className="text-gray-700 mt-2">
              Welcome to our community. We’re glad to have you on board.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-800">Subscription Details</h2>
            <p className="text-gray-600 mt-2">Your current subscription ends at:</p>
            <h3 className="text-4xl font-bold text-primary mt-2">
              {subscription?.next_payment_date ? (
                <Countdown date={subscription?.next_payment_date} />
              ) : (
                <span>Loading...</span>
              )}
            </h3>
          </div>

          {subscription && subscription.status === 'active' ? (
            <div className="mt-4 justify-center">
              <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md" onClick={cancelMembership}>
                Cancel Membership
              </Button>
            </div>
          ) : (
            <div className="mt-4 justify-center">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md"  onClick={() => renew(userdb?.subscription)}>
                Renew Membership
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSubscription;
