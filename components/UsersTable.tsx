'use client'
import {  Card,  CardContent,   CardDescription,  CardHeader,   CardTitle,} from "@/components/ui/card"
import {  Table,  TableBody,  TableCell,  TableHead,  TableHeader, TableRow,} from "@/components/ui/table"
import { Button } from "./ui/button"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import LoadingScreen from "./LoadingScreen"


const UsersTable = () => {
    const subscribers = useQuery(api.admin.getSubscribers);

    if(subscribers && subscribers.length === 0 ) return (
        <div className="">
            <h1 className="">No Subscribers</h1>
        </div>
    )
  return (
    <Card
    className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
  >
    <CardHeader className="flex flex-row items-center">
      <div className="grid gap-2">
        <CardTitle>Subscribers</CardTitle>
        <CardDescription>
          Recent Subscribers.
        </CardDescription>
      </div>
      <Button asChild size="sm" className="ml-auto gap-1">
        <Link href="/membership">
          View All
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden xl:table-column">
              Type
            </TableHead>
            <TableHead className="hidden xl:table-column">
              Status
            </TableHead>
            <TableHead className="hidden xl:table-column">
              Date
            </TableHead>
            <TableHead className="text-right">Plan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {subscribers ? subscribers.map((sub) => (     
                 <TableRow className='cursor-pointer' key={sub?._id}>
                <TableCell>
                <Link href={`/subscription/${sub?.subcode}`}>
                  <div className="font-medium">{sub?.name}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {sub?.email}
                  </div>
                  </Link>
                </TableCell>
                <TableCell className="hidden xl:table-column">
                  Sale
                </TableCell>
                <TableCell className="hidden xl:table-column">
                  <Badge className="text-xs" variant="outline">
                    Approved
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                  2023-06-23
                </TableCell>
                <TableCell className={`text-right ${sub?.subscription === 'Premium Plan' && 'text-yellow-500 font-bold' || sub?.subscription === 'Medium Plan' && 'text-green-500' || sub?.subscription === 'Basic Plan' && 'text-primary' }`}>
                <Link href={`/subscription/${sub?.subcode}`}>
                    {sub?.subscription}
                    </Link>
                </TableCell>
              </TableRow>
               
            )) : (
                <div className="flex items-center justify-center p-6">
                    <LoadingScreen message="Please wait..." /> 
                </div>
             )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  )
}

export default UsersTable