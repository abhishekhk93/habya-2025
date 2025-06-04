import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gender } from "@/lib/events-utils/eventRules";

export interface User {
  id: string;
  name: string;
  phone: string;
  gender: Gender;
  dob: Date;
}

interface UserState {
  user: User | null; // null if not logged in or no user data
}

const initialState: UserState = {
  user: null, // start with no user
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
