// src/global.d.ts or ./global.d.ts
import type { RecaptchaVerifier } from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export {};
