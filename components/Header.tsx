'use client'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {  Menu, Package2, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="/dashboard"
        className="text-foreground transition-colors hover:text-foreground"
      >
        Dashboard
      </Link>
      <Link
        href="/membership"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Subscription
      </Link>
      <Link
        href="/email"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Emails
      </Link>
      <Link
        href="/review"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Reviews
      </Link>
    </nav>
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <Link
            href="/membership"
            className="text-muted-foreground hover:text-foreground"
          >
            Subscription
          </Link>
          <Link
            href="/email"
            className="text-muted-foreground hover:text-foreground"
          >
           Emails
          </Link>
          <Link
            href="/review"
            className="text-muted-foreground hover:text-foreground"
          >
           Reviews
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
   
  </header>
  )
}

export default Header