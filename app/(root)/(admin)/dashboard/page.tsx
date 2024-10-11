'use client'
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Email from "@/components/Email";
import UsersTable from "@/components/UsersTable";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { nigerianCurrencyFormat } from "@/data";
import { useUser } from "@clerk/clerk-react";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const emails = useQuery(api.admin.getAllEmails);
  const reviews = useQuery(api.admin.getAllReviews);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("/api/fetchall", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch subscriptions");
        }
        const data = await response.json();
        console.log(data);
        setSubscriptions(data.data);

        // Calculate the total revenue by summing up subscription amounts
        const total = data.data.reduce((sum: number, subscription: any) => {
          return sum + (subscription.amount || 0);
        }, 0);
        setTotalRevenue(total);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        toast.error("Error fetching subscription details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (user && user?.emailAddresses[0].emailAddress != 'dikkorabiat25@gmail.com') {
    router.push('/')

    return (
      <LoadingScreen message='Pushing back to home page...'/>
    )
  }
  if(!user) return <LoadingScreen message='Confirming tour identity...'/>

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
               {nigerianCurrencyFormat.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Link href="/membership">{subscriptions?.length}</Link>
              </div>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="cursor-pointer">
              <Link href="/email">
                <div className="text-2xl font-bold">+{emails?.length}</div>
              </Link>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviews</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Link href="/reviews">{reviews?.length}</Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <UsersTable />
          <Email />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
