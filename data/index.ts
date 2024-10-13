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




                    // try {
                    //     const paystack = new PaystackPop();
                    //     paystack.newTransaction({
                    //         key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Paystack public key
                    //         email: user?.emailAddresses[0]?.emailAddress,
                    //         amount: price * 100, // Amount in kobo
                    //         onSuccess: async (transaction) => {
                    //             // Payment was successful, trigger onSuccess with the selected plan and plan code
                    //             await onSuccess(planCode, planName);
                    //             toast.success("Payment successful!");
                    //         },
                    //         onCancel: () => {
                    //             toast.error("Payment cancelled.");
                    //         },
                    //     });
                    //   } catch (error) {
                    //     console.error('Error:', error);
                    //   }