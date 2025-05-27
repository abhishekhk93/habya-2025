import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO7siKXAt5ytEORKHZpwu-vkZtWeybU2Y",
  authDomain: "habya-2025.firebaseapp.com",
  projectId: "habya-2025",
  storageBucket: "habya-2025.firebasestorage.app",
  messagingSenderId: "571404570193",
  appId: "1:571404570193:web:5235a8536ffd64d93af270",
  measurementId: "G-384JX5JHJD"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(firebaseApp);

// Export everything you need for phone auth
export { firebaseApp, auth, RecaptchaVerifier, signInWithPhoneNumber };