declare module '@paystack/inline-js' {
    const PaystackPop: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        callback: (response: { reference: string }) => void;
        onClose?: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  
    export default PaystackPop;
  }
  