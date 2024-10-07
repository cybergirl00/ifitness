import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { Manrope } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"



const inter = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iFitness",
  description: "A fitness application.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
       <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <Navbar />
        <main className="">
        {children}
        </main>
        <Toaster />
      </body>
    </html>
    </ConvexClientProvider>
  );
}
