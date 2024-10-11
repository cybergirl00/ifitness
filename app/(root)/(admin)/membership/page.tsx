'use client'
import LoadingScreen from "@/components/LoadingScreen";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell,  TableHead,  TableHeader,  TableRow,} from "@/components/ui/table"
import { nigerianCurrencyFormat } from "@/data";
import Link from "next/link";
  

import { useEffect, useState } from "react";
import { toast } from "sonner";

const Membership = () => {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchSubscriptions = async () => {
          try {
            const response = await fetch('/api/fetchall', {
              method: 'GET',
            });
            if (!response.ok) {
              throw new Error('Failed to fetch subscriptions');
            }
            const data = await response.json();
            console.log(data)
            setSubscriptions(data.data); // Assuming the Paystack API returns subscriptions in data.data
          } catch (error) {
            console.error('Error fetching subscriptions:', error);
            toast.error('Error fetching subscription details.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchSubscriptions();
      }, []);
  return (
    <div>
        <div className="p-4">
            <h2 className="text-3xl font-bold ">Your Subscribers</h2>
        </div>

        <div className="p-5">
        <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">code</TableHead>
      <TableHead>Email</TableHead>
      <TableHead >Name</TableHead>
      <TableHead >Plan name</TableHead>
      <TableHead >Created at</TableHead>
      <TableHead>Next payment</TableHead>
      <TableHead >Interval</TableHead>
      <TableHead >Status</TableHead>
      <TableHead >Amount</TableHead>
      <TableHead >Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>

  {subscriptions ? subscriptions.map((sub) => (
    <TableRow key={sub?._id}>
    <TableCell className="font-medium">{sub?.customer?.customer_code}</TableCell>
    <TableCell>{sub?.customer?.email}</TableCell>
    <TableCell className="text-right">{sub?.customer?.first_name}</TableCell>
    <TableCell className="font-medium">{sub?.plan?.name}</TableCell>
    <TableCell>{sub?.plan?.createdAt}</TableCell>
    <TableCell>{sub?.next_payment_date}</TableCell>
    <TableCell className="text-right">{sub?.plan?.interval}</TableCell>
    <TableCell className={`text-right ${sub?.status != 'active' ? 'text-primary' : 'text-green-500'}`}>
    {sub?.status != 'active' ? 'canceled' : 'active'}
    </TableCell>
    <TableCell className="text-right">{nigerianCurrencyFormat.format(sub?.amount)}</TableCell>
    <TableCell className="text-right">
      <Link href={`/subscription/${sub?.subscription_code}`}
      className={buttonVariants({
        variant: 'default'
      })}
      >View</Link>
    </TableCell>
  </TableRow>
  )): (
    <LoadingScreen message="Loading subscriptions" />
  )}
  </TableBody>
</Table>

        </div>
    </div>
  )
}

export default Membership