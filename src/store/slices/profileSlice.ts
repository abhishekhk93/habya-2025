// Reading of profileSlice is limited to only during profile creation
// For form related activities like, show spinner on submit etc

// For other purposes, fetch profile details from userSlice which is set after login

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  name: string;
  gender: string;
  dob: string | null;
  errors: { name: string; gender: string; dob: string };
  submitting: boolean;
  profileSaved: boolean;
}

const initialState: ProfileState = {
  name: "",
  gender: "",
  dob: null as string | null,
  errors: { name: "", gender: "", dob: "" },
  submitting: false,
  profileSaved: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
    setDob(state, action: PayloadAction<string | null>) {
      state.dob = action.payload;
    },
    setErrors(state, action: PayloadAction<ProfileState["errors"]>) {
      state.errors = action.payload;
    },
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.submitting = action.payload;
    },
    setProfileSaved(state, action: PayloadAction<boolean>) {
      state.profileSaved = action.payload;
    },
    resetProfileForm() {
      return initialState;
    },
  },
});

export const {
  setName,
  setGender,
  setDob,
  setErrors,
  setSubmitting,
  setProfileSaved,
  resetProfileForm,
} = profileSlice.actions;

export default profileSlice.reducer;
