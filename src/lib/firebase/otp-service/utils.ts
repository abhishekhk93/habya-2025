import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";

export const sendOtp = async (
  phone: string,
  recaptchaVerifier: RecaptchaVerifier
) => {
  //const appVerifier = setupRecaptcha();
  const fullPhone = `+1${phone}`;
  try {
    // Attempt to send OTP
    return await signInWithPhoneNumber(auth, fullPhone, recaptchaVerifier);
  } catch (err: any) {
    throw err;
  }
};
