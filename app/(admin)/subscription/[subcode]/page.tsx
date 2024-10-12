'use client';
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Countdown from 'react-countdown';
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/LoadingScreen";
import { nigerianCurrencyFormat } from "@/data";
import { useRouter } from "next/navigation";

const Subscription = ({ params }: { params: { subcode: string } }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const [subscription, setSubscription] = useState<any>();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch(`/api/fetchsub?subscriptionCode=${params.subcode}`, {
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
    };

    fetchSubscription();
  }, [params.subcode]);

  const cancelSubscription =   async () => {
    setIsLoading(true)
    if(subscription) {
        try {
          const response = await fetch('/api/cancelsub', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subscriptionCode: params?.subcode, token: subscription?.email_token }),
          });
    
          const data = await response.json();
          console.log(data);
    
          if (data.success) {
            toast.success('Subscription cancelled successfully.');
            setIsLoading(false);
            router.back();

          } else {
            toast.error(data.message || 'Failed to cancel subscription.');
            setIsLoading(false);
          }
        } catch (error) {
          toast.error('Error canceling subscription.');
          setIsLoading(false)
        }
  } else {
    setIsLoading(false)
  }
}

  if (!subscription) return <LoadingScreen message="Loading subscription details..." />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Subscription Header */}
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Subscription for {subscription?.customer.first_name}
        </h2>
        <div className="text-4xl font-semibold text-primary mt-4">
          {subscription && <Countdown date={subscription?.next_payment_date} />}
        </div>
        <div className="mt-6">
          {subscription?.status != 'active' ? (
            <h1 className='font-bold text-xl text-primary'>This subscription is not active</h1>
          ): (
            <Button variant="destructive"
          onClick={cancelSubscription}
          >Cancel Subscription</Button>
          )}
        </div>
      </div>

      {/* Subscription Details */}
      <div className="bg-gray-100 shadow rounded-lg mt-8 p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Subscription Details
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg text-gray-700">Plan ID:</span>
            <span className="text-lg text-primary">{subscription?.plan?.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg text-gray-700">Plan Name:</span>
            <span className="text-lg text-primary">{subscription?.plan?.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg text-gray-700">Plan Amount:</span>
            <span className="text-lg text-primary">{nigerianCurrencyFormat.format(subscription?.plan?.amount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg text-gray-700">Plan Interval:</span>
            <span className="text-lg text-primary">{subscription?.plan?.interval}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
