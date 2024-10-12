'use client'
import LoadingScreen from "@/components/LoadingScreen";
import { Table,  TableBody,  TableCaption, TableCell,  TableHead,  TableHeader,  TableRow, } from "@/components/ui/table";
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react"
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from "next/navigation";
  

const Email = () => {
    const router = useRouter();
    const { user } = useUser();

    const emails = useQuery(api.admin.getAllEmails);

    if(!user) return <LoadingScreen message='Please wait...' />

    if(user && user?.emailAddresses[0].emailAddress != 'dikkorabiat25@gmail.com') {
        router.push('/')
        return (
            <LoadingScreen message="Please wait..." />
        )
    }

    if(user && user?.emailAddresses[0].emailAddress === 'dikkorabiat25@gmail.com') 
  return (
    <div>
        <div className=" p-5">
            <h2 className="text-3xl font-bold ">Your Emails</h2>
        </div>

        <div className="p-4">
        <Table>
  <TableCaption>A list of your emails.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Sender</TableHead>
      <TableHead>Sender Email</TableHead>
      <TableHead>Content</TableHead>
      <TableHead className="text-right">Date</TableHead>
      {/* <TableHead className="text-right">Action</TableHead> */}
    </TableRow>
  </TableHeader>


  <TableBody>
    {emails?.map((email) => (
         <TableRow key={email?._id}>
         <TableCell className="font-medium">{email?.fromName}</TableCell>
         <TableCell>{email?.fromEmail}</TableCell>
         <TableCell>{email?.message}</TableCell>
         <TableCell className="text-right text-green-500 font-bold">{formatDistanceToNow(new Date(email?._creationTime), { addSuffix: true })}</TableCell>
         {/* <TableCell className="text-right">
            <Dialog>
  <DialogTrigger>
    <Button>Read</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        <h1>Message from: {email?.fromName}</h1>
      </DialogTitle>
    </DialogHeader>

    <Messages email={email} />
  </DialogContent>
</Dialog>
         </TableCell> */}
       </TableRow>
    ))}
  </TableBody>
</Table>

        </div>
    </div>
  )
}



export default Email