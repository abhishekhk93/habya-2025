declare global {
  interface Window {
    recaptchaVerifier: import("firebase/auth").RecaptchaVerifier;
    Razorpay: typeof Razorpay;
  }
}

type RazorpayHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name?: string;
  description?: string;
  handler: (response: RazorpayHandlerResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

declare class Razorpay {
  constructor(options: RazorpayOptions);
  open(): void;
  on(event: string, handler: () => void): void;
}

interface Window {
  Razorpay: typeof Razorpay;
}
