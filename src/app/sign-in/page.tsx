"use client";
// TO-DO: Due to dependency on re-captcha verifier, this file is not split and migrated to utils as of now
// Currently, it is a big file, re-structure it when needed
import { useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

import { PhoneInput, OtpInput } from "@/components/sign-in";
import { sendOtp } from "@/lib/firebase/otp-service/utils";
import { mapFirebaseError } from "./utils/firebase-error-mapper";

import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "@/lib/firebase/otp-service/firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  setPhone,
  setOtp,
  setStep,
  setPhoneError,
  setOtpError,
  setLoading,
  setVerifyingOtp,
  setResendingOtp,
  setTimer,
  decrementTimer,
} from "@/store/slices/authSlice";
import type { RootState } from "@/store/store";

export default function SignIn() {
  const router = useRouter();

  const phone = useSelector((state: RootState) => state.auth.phone);
  const otp = useSelector((state: RootState) => state.auth.otp);
  const step = useSelector((state: RootState) => state.auth.step);
  const phoneError = useSelector((state: RootState) => state.auth.phoneError);
  const otpError = useSelector((state: RootState) => state.auth.otpError);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const verifyingOtp = useSelector(
    (state: RootState) => state.auth.verifyingOtp
  );
  const resendingOtp = useSelector(
    (state: RootState) => state.auth.resendingOtp
  );
  const timer = useSelector((state: RootState) => state.auth.timer);
  const dispatch = useDispatch();

  const confirmationResultRef = useRef<any>(null);

  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA verified");
          },
          "expired-callback": () => {
            console.warn("reCAPTCHA expired");
          },
        }
      );

      recaptchaVerifierRef.current.render();
    }
  }, []);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    dispatch(setPhone(value));
    dispatch(setPhoneError(""));
  };

  const validatePhoneAndSendOtp = async () => {
    if (!/^[0-9]\d{9}$/.test(phone)) {
      dispatch(
        setPhoneError("Enter a valid 10-digit number starting with 6-9")
      );
      return;
    }
    localStorage.setItem("habyaphone", phone);
    dispatch(setLoading(true));
    dispatch(setPhoneError(""));

    try {
      if (!recaptchaVerifierRef.current) {
        throw new Error("reCAPTCHA not ready");
      }
      const confirmationResult = await sendOtp(
        phone,
        recaptchaVerifierRef.current
      );
      confirmationResultRef.current = confirmationResult;
      dispatch(setStep("otp"));
      dispatch(setTimer(30));
    } catch (err: any) {
      console.log(err);
      dispatch(setPhoneError(mapFirebaseError(err)));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    dispatch(setOtp({ index, value }));
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const validateOtp = async () => {
    const joined = otp.join("");
    if (!/^\d{6}$/.test(joined)) {
      dispatch(setOtpError("Enter a valid 6-digit OTP"));
      return;
    }

    dispatch(setVerifyingOtp(true)); // ➡️ Start loading when user clicks verify
    try {
      if (!confirmationResultRef.current)
        throw new Error("Confirmation result not available");

      await confirmationResultRef.current.confirm(joined);
      dispatch(setOtpError(""));
      // Call backend API to get/set JWT cookie
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!res.ok) {
        // handle error if needed
        return;
      }
      router.push("/profile-setup"); // REDIRECT after success
    } catch (err: any) {
      dispatch(setOtpError(mapFirebaseError(err)));
    } finally {
      dispatch(setVerifyingOtp(false));
    }
  };

  const handleResendOtp = async () => {
    dispatch(setResendingOtp(true));
    try {
      if (!recaptchaVerifierRef.current) {
        throw new Error("reCAPTCHA not ready");
      }
      const confirmationResult = await sendOtp(
        phone,
        recaptchaVerifierRef.current
      );
      confirmationResultRef.current = confirmationResult;
      dispatch(setTimer(30));
      dispatch(setOtpError(""));
    } catch (err: any) {
      dispatch(setOtpError(mapFirebaseError(err)));
    } finally {
      dispatch(setResendingOtp(false));
    }
  };

  return (
    <>
      <Head>
        <title>Sign In | Habya 2025</title>
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 to-blue-200 px-4 py-10">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 space-y-6">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
            Sign Up
          </h1>

          <div id="recaptcha-container"></div>

          {step === "phone" ? (
            <PhoneInput
              phone={phone}
              onChange={handlePhoneChange}
              phoneError={phoneError}
              loading={loading}
              onSendOtp={validatePhoneAndSendOtp}
            />
          ) : (
            <OtpInput
              otp={otp}
              onOtpChange={handleOtpChange}
              otpError={otpError}
              timer={timer}
              onVerifyOtp={validateOtp}
              onResendOtp={handleResendOtp}
              verifyingOtp={verifyingOtp}
              resendingOtp={resendingOtp}
            />
          )}
        </div>
      </div>
    </>
  );
}
