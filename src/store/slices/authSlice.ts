import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthStep = "phone" | "otp";

interface AuthState {
  phone: string;
  otp: string[];
  step: AuthStep;
  phoneError: string;
  otpError: string;
  loading: boolean;
  verifyingOtp: boolean;
  resendingOtp: boolean;
  timer: number;
  isAuthenticated: boolean;
  isProfileCreated: boolean;
}

const initialState: AuthState = {
  phone: "",
  otp: Array(6).fill(""),
  step: "phone",
  phoneError: "",
  otpError: "",
  loading: false,
  verifyingOtp: false,
  resendingOtp: false,
  timer: 0,
  isAuthenticated: false,
  isProfileCreated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
    setOtp(state, action: PayloadAction<{ index: number; value: string }>) {
      state.otp[action.payload.index] = action.payload.value;
    },
    setStep(state, action: PayloadAction<AuthStep>) {
      state.step = action.payload;
    },
    setPhoneError(state, action: PayloadAction<string>) {
      state.phoneError = action.payload;
    },
    setOtpError(state, action: PayloadAction<string>) {
      state.otpError = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setVerifyingOtp(state, action: PayloadAction<boolean>) {
      state.verifyingOtp = action.payload;
    },
    setResendingOtp(state, action: PayloadAction<boolean>) {
      state.resendingOtp = action.payload;
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
    decrementTimer(state) {
      state.timer = Math.max(0, state.timer - 1);
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setProfileCreated(state, action: PayloadAction<boolean>) {
      state.isProfileCreated = action.payload;
    },
    resetAuthState(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
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
  setAuthenticated,
  setProfileCreated,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
