'use client'
import { ConvexReactClient } from 'convex/react';
import { ReactNode } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL  as string);

const ConvexClientProvider = ({children}: {children : ReactNode}) => (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
    appearance={{
      variables: {
        colorPrimary: '#ef4444'
      }
    }}
    >
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  </ClerkProvider>
)

export default ConvexClientProvider