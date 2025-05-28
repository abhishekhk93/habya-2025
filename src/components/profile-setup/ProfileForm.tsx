"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setName,
  setGender,
  setDob,
  setErrors,
  setSubmitting,
  setProfileSaved,
} from "@/store/slices/profileSlice";
import { useRouter } from "next/navigation";
import NameInput from "./NameInput";
import GenderSelect from "./GenderSelect";
import DobPicker from "./DobPicker";
import {
  validateName,
  validateGender,
  validateDob,
} from "@/components/profile-setup/utils/utils";
import { useEffect, useState } from "react";
import { setAuthenticated, setProfileCreated } from "@/store/slices/authSlice";
import { setUser } from "@/store/slices/userSlice";

export default function ProfileForm() {
  const { name, gender, errors, submitting, profileSaved } = useSelector(
    (state: RootState) => state.profile
  );
  const dobString = useSelector((state: RootState) => state.profile.dob);
  const phone = useSelector((state: RootState) => state.auth.phone);
  const dob = dobString ? new Date(dobString) : null;
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameErr = validateName(name);
    const genderErr = validateGender(gender);
    const dobErr = validateDob(dob);

    if (nameErr || genderErr || dobErr) {
      dispatch(setErrors({ name: nameErr, gender: genderErr, dob: dobErr }));
      return;
    }

    dispatch(setSubmitting(true));

    try {
      const res = await fetch("/api/auth/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name, gender, dob }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to create user");

      const data = await res.json();
      dispatch(setUser(data.user));
      dispatch(setAuthenticated(true));
      dispatch(setProfileCreated(true));
      dispatch(setProfileSaved(true));
      router.push("/");
    } catch (err) {
      console.error(
        "Profile save failed, There was an error saving your profile",
        err
      );
      router.push("/sign-in");
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  if (profileSaved) {
    return <ProfileSavedSuccess />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <NameInput
        value={name}
        onChange={(v) => dispatch(setName(v))}
        error={errors.name}
      />
      <GenderSelect
        value={gender}
        onChange={(v) => dispatch(setGender(v))}
        error={errors.gender}
      />
      <DobPicker
        value={dob}
        onChange={(d) => dispatch(setDob(d?.toISOString() || null))}
        error={errors.dob}
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full relative inline-flex justify-center items-center px-5 py-2.5 overflow-hidden font-medium text-teal-800 transition duration-300 ease-out border border-teal-300 rounded-full shadow-md group hover:shadow-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-100 to-white opacity-50 group-hover:opacity-80 rounded-full blur-sm" />
        <span className="relative z-10">
          {submitting ? "Saving..." : "Complete Setup"}
        </span>
      </button>
    </form>
  );
}

// Inline small component
function ProfileSavedSuccess() {
  const router = useRouter();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    if (counter === 0) {
      clearInterval(timer);
      router.push("/");
    }

    return () => clearInterval(timer);
  }, [counter, router]);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      <div className="animate-bounce text-6xl text-green-500">🎉</div>
      <h2 className="text-3xl font-bold text-teal-600">
        Profile Added Successfully!
      </h2>
      <p className="text-gray-700">Redirecting to Home page in {counter}...</p>
    </div>
  );
}
