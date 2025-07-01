"use client";

import { useEffect, useState } from "react";
import NewUserForm from "@/components/sign-in/v2/NewUserForm";
import RegisteredUserForm from "@/components/sign-in/v2/RegisteredUserForm";
import { resetAuthState } from "@/store/slices/authSlice";
import { resetProfileForm } from "@/store/slices/profileSlice";
import { useDispatch } from "react-redux";

export default function UserAccessPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetAuthState());
    dispatch(resetProfileForm());
  }, [dispatch]);
  const [userType, setUserType] = useState<"new" | "registered">("new");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4">
      <div
        className="rounded-lg p-6 w-full max-w-md shadow-lg bg-gradient-to-r from-gray-900 via-black to-gray-900"
        style={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
        }}
      >
        <h2
          className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 text-3xl font-extrabold text-center mb-6"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          Sign up/ Login
        </h2>

        <div
          className="flex justify-center gap-4 mb-6 text-2xl"
          style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
        >
          <label className="text-gray-300 flex items-center gap-2">
            <input
              type="radio"
              name="user-type"
              value="new"
              checked={userType === "new"}
              onChange={() => setUserType("new")}
            />
            New User
          </label>
          <label className="text-gray-300 flex items-center gap-2">
            <input
              type="radio"
              name="user-type"
              value="registered"
              checked={userType === "registered"}
              onChange={() => setUserType("registered")}
            />
            Registered User
          </label>
        </div>

        {userType === "new" ? (
          <NewUserForm key="new-user-form" />
        ) : (
          <RegisteredUserForm key="registered-user-form" />
        )}
      </div>
    </div>
  );
}
