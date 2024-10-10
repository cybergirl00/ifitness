'use client'
import { Dumbbell } from "lucide-react"
import { buttonVariants } from "./ui/button"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs'
import { useEffect } from "react";

const Navbar = () => {
    const { user } =  useUser();
    const pathname = usePathname();
    const admin = 'dikkorabiat25@gmail.com'

    useEffect(() => {
        if(user) {
            localStorage.setItem('clerkId', user?.id)
        }
     
    }, [user])
    

    if(pathname === '/sign-in' ||   pathname === '/sign-up') return null;
  return (
    <div className=" p-5  flex items-center justify-between sticky z-10 top-0 bg-white">
        <div className="flex items-center">
            <Dumbbell size={24} className='text-red-500'/>
            <h2 className='font-bold text-xl '>Fitness</h2>
        </div>

        <div className="flex items-center gap-3">
        <div className="">
                    {user && user?.emailAddresses[0].emailAddress === admin && (
                        <Link href='/dashboard' className='text-primary font-bold hover:underline'>
                            Dashboard
                        </Link>
                    ) }
                </div>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
            <div className="flex gap-3">
            <Link href='/sign-in'  className={buttonVariants({
                variant: 'ghost',
                className: 'text-red-500'
            })}>Sign in</Link>
            <Link href='/sign-up'  className={buttonVariants({
                variant: 'default',
            })}>Get Started</Link>
            
        </div>
            </SignedOut>
        </div>
    </div>
  )
}

export default Navbar