import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "./firebase";  // Import auth from firebase.ts

// This is not used any more. Need to remove slowly. 
export const sendOTP = (phoneNumber: string, 
  recaptchaVerifier: RecaptchaVerifier) => {
  return new Promise((resolve, reject) => {
    signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        console.log("OTP sent to phone number:", phoneNumber);
        resolve(confirmationResult);  // Return the confirmationResult for later OTP verification
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        reject(new Error("Error sending OTP: " + error.message));
      });
  });
};

