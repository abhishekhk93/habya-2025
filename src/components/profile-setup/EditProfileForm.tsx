"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setName,
  setGender,
  setDob,
  setErrors,
  setSubmitting,
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
import { setUser } from "@/store/slices/userSlice";
import { useEffect } from "react";

export default function EditProfileForm() {
  const user = useSelector((state: RootState) => state.user.user);
  const phone = user?.phone || "";

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setName(user.name || ""));
      dispatch(setGender(user.gender || ""));
      dispatch(setDob(user.dob ? new Date(user.dob).toISOString() : null));
    }
  }, [dispatch, user]);

  const { name, gender, errors, submitting } = useSelector(
    (state: RootState) => state.profile
  );
  const dobString = useSelector((state: RootState) => state.profile.dob);
  const dob = dobString ? new Date(dobString) : null;
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
      const res = await fetch("/api/auth/edit-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name, gender, dob }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update user");

      const data = await res.json();
      dispatch(setUser(data.user));
      router.push("/");
    } catch (err) {
      console.error("Edit profile failed", err);
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  return (
    <div className="flex items-center justify-center text-white transition-all duration-1000 ease-in-out">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg p-6 max-w-md w-full shadow-lg border-2 border-transparent bg-gradient-to-r from-gray-900 via-black to-gray-900 transition-all duration-300 ease-in-out"
        style={{
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
        }}
      >
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block mb-2 text-2xl text-gray-400"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            disabled
            className="w-full p-2 text-gray-400 text-2xl bg-gray-800 border border-gray-700 rounded-md cursor-not-allowed"
            style={{ fontFamily: "'Alumni Sans Pinstripe', cursive" }}
          />
        </div>

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
          onChange={(d) => dispatch(setDob(d ? d.toISOString() : null))}
          error={errors.dob}
        />

        <button
          type="submit"
          disabled={submitting}
          className="
            mt-6
            block
            mx-auto
            px-8 py-3
            text-2xl sm:text-3xl
            font-medium
            rounded-full
            border
            border-transparent
            shadow-md
            transition-transform duration-300 ease-in-out
            active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            bg-transparent
          "
          style={{
            fontFamily: "'Alumni Sans Pinstripe', cursive",
            borderImageSlice: 1,
            borderImageSource: "linear-gradient(to right, #14b8a6, #3b82f6)",
          }}
        >
          <span
            className="relative z-10"
            style={{
              background: "linear-gradient(to right, #4ade80, #2563eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            {submitting ? "Saving..." : "Save Changes"}
          </span>
        </button>
      </form>
    </div>
  );
}
