export const trainners = [
    {
        name: 'John Doe',
        imageUrl: '/girl1.jpg',
        about: 'John is a very good and dedicated trainner'
    },
    {
        name: 'John Doe',
        imageUrl: '/girl2.jpg',
        about: 'John is a very good and dedicated trainner'
    },
    {
        name: 'John Doe',
        imageUrl: '/girl3.jpg',
        about: 'John is a very good and dedicated trainner'
    },
    {
        name: 'John Doe',
        imageUrl: '/girl1.jpg',
        about: 'John is a very good and dedicated trainner'
    },
]

export const nigerianCurrencyFormat = new Intl.NumberFormat('en-NG', { 
    currency: 'NGN', 
    style: 'currency', 
});



      //     // Ensure Paystack is available only in the client
                //     if (isBrowser()) {
                //         const handler = PaystackPop.setup({
                //             key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
                //             email: user?.emailAddresses[0].emailAddress!,
                //             amount: price * 100, // Convert to kobo
                //             currency: 'NGN',
                //             callback: async (response: any) => {
                //                 const reference = response.reference;
                //                 await onSuccess(planCode, planName);
                //             },
                //             onClose: () => {
                //                 toast.error("Payment was not completed.");
                //                 setIsLoading(false);
                //             },
                //         });

                //         handler.openIframe();
                //     }
                // } else {
                //     toast.error("Failed to create customer.");
                // }




            //     if (isBrowser()) {
            //         const handler = PaystackPop.setup({
            //             key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
            //             email: user?.emailAddresses[0].emailAddress!,
            //             amount: price * 100, // Convert to kobo
            //             currency: 'NGN',
            //             callback: async (response: any) => {
            //                 const reference = response.reference;
            //                 await onSuccess(planCode, planName);
            //             },
            //             onClose: () => {
            //                 toast.error("Payment was not completed.");
            //                 setIsLoading(false);
            //             },
            //         });

            //         handler.openIframe();
            //     }
            // } else {
            //     toast.error("Failed to create customer.");
            // }




             // Ensure Paystack is available only in the client
                    // if (isBrowser()) {
                    //     const handler = PaystackPop.setup({
                    //         key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
                    //         email: user?.emailAddresses[0].emailAddress!,
                    //         amount: price * 100, // Convert to kobo
                    //         currency: 'NGN',
                    //         callback: async (response: any) => {
                    //             const reference = response.reference;
                    //             await onSuccess(planCode, planName);
                    //         },
                    //         onClose: () => {
                    //             toast.error("Payment was not completed.");
                    //             setIsLoading(false);
                    //         },
                    //     });

                    //     handler.openIframe();
                    // 