declare global {
    interface Window {
      recaptchaVerifier: import("firebase/auth").RecaptchaVerifier;
    }
  }
  
  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    order_id: string;
    name?: string;
    description?: string;
    handler: (response: any) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    theme?: {
      color?: string;
    };
  }
  
  interface Razorpay {
    new (options: RazorpayOptions): Razorpay;
    open: () => void;
    on: (event: string, handler: () => void) => void;
  }
  
  interface Window {
    Razorpay: typeof Razorpay;
  }
  