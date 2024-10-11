'use client'
import {  Card,  CardContent,  CardDescription,  CardHeader,   CardTitle, } from "@/components/ui/card"
import { Avatar,  AvatarFallback,  AvatarImage,} from "@/components/ui/avatar"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { formatDistanceToNow } from 'date-fns'
import LoadingScreen from "./LoadingScreen"
const Email = () => {

    const emails = useQuery(api.admin.getEmails);
  return (
    <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Emails</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8 ">
                {emails ?  emails.map((email) => (
                    <div className="flex items-center gap-4 cursor-pointer" key={email?._id}>
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>EM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {email?.fromName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {email?.fromEmail}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-green-500">{formatDistanceToNow(new Date(email?._creationTime), { addSuffix: true })}</div>
                  </div>
                )) : ( <LoadingScreen message={'Loading your emails'} /> )}
            </CardContent>
          </Card>
  )
}

export default Email