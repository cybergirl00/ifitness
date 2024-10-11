'use client'
import { useUser } from "@clerk/clerk-react";
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "./ui/button";
import Countdown from 'react-countdown';
import { toast } from "sonner";
import Membership from "./Membership";


const UserSubscription = ({ userdb }: { userdb: any }) => {
  const { user } = useUser();
  const [subscription, setSubscription] = useState(null)
  
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
          setSubscription(data.data.data)
        } catch (error) {
          console.error('Error fetching subscription:', error);
          toast.error('Error fetching subscription details.');
        }
      }
    };
    fetchSubscription();
  }, [user, userdb])

  const cancelMembership = async () => {
    if(subscription) {
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
          } else {
            toast.error(data.message || 'Failed to cancel subscription.');
          }
        } catch (error) {
          toast.error('Error canceling subscription.');
        }
  }
}
  // if (subscription && subscription?.status != 'active' && subscription?.status === 'non-reviewing') return <Membership />
  return (
    <div className="bg-white  rounded-lg p-8 max-w-5xl mx-auto">
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
          {subscription && subscription?.status != 'active' ? (
             <div className="mt-4 justify-center ">
             <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md" onClick={cancelMembership}>
               Renew membership
             </Button>
           </div>
          ):  <div className="mt-4 justify-center ">
          <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md" onClick={cancelMembership}>
            Cancel Membership
          </Button>
        </div>}
        </div>
      </div>
    </div>
  )
}

export default UserSubscription
