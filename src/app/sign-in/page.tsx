"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

import { PhoneInput, OtpInput } from "@/components/sign-in";
import { useSelector, useDispatch } from "react-redux";
import {
  setPhone,
  setOtp,
  setStep,
  setTimer,
  decrementTimer,
  setAuthenticated,
  resetAuthState,
} from "@/store/slices/authSlice";
import type { RootState } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import { resetProfileForm } from "@/store/slices/profileSlice";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux states
  const phone = useSelector((state: RootState) => state.auth.phone);
  const otp = useSelector((state: RootState) => state.auth.otp);
  const step = useSelector((state: RootState) => state.auth.step);
  const timer = useSelector((state: RootState) => state.auth.timer);

  // Local states
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);

  // Reset auth state on mount
  useEffect(() => {
    dispatch(resetAuthState());
    dispatch(resetProfileForm());
  }, [dispatch]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, dispatch]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    dispatch(setPhone(value));
    setPhoneError("");
  };

  const validatePhoneAndSendOtp = async () => {
    if (!/^[0-9]\d{9}$/.test(phone)) {
      setPhoneError("Enter a valid 10-digit number starting with 6-9");
      return;
    }

    setLoading(true);
    setPhoneError("");

    try {
      const res = await fetch("/api/auth/otp/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(setStep("otp"));
        dispatch(setTimer(30));
      } else {
        setPhoneError(data.error || "Failed to send OTP");
      }
    } catch (err) {
      console.log("Error: ", err);
      setPhoneError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
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
      setOtpError("Enter a valid 6-digit OTP");
      return;
    }

    setVerifyingOtp(true);

    try {
      const res = await fetch("/api/auth/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: joined }),
      });

      const data = await res.json();
      if (data.success) {
        setOtpError("");

        const loginRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
          credentials: "include",
        });

        const loginData = await loginRes.json();

        if (loginData.status === "logged-in") {
          dispatch(setUser(loginData.user));
          dispatch(setAuthenticated(true));
          router.push("/");
        } else if (loginData.status === "new-user") {
          router.push("/profile-setup");
        }
      } else {
        setOtpError("Invalid OTP");
      }
    } catch (err) {
      console.log("Error: ", err);
      setOtpError("Verification failed. Try again.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    setResendingOtp(true);
    try {
      const res = await fetch("/api/auth/otp/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(setTimer(30));
        setOtpError("");
      } else {
        setOtpError(data.error || "Failed to resend OTP");
      }
    } catch (err) {
      console.log("Error: ", err);
      setOtpError("Something went wrong. Try again.");
    } finally {
      setResendingOtp(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In | Habya 2025</title>
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br  from-gray-900 via-black to-gray-900 text-white px-4 py-10">
        <div
          className="max-w-md w-full rounded-full p-8 space-y-6"
          style={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderRadius: "0.375rem",
            borderImageSlice: 1,
            borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
          }}
        >
          <h1
            className="text-4xl sm:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-10 leading-tight"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Sign up
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
