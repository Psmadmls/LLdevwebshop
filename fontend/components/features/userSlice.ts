import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  username: string;
  realname: string;
  point: number;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: "",
  username: "",
  realname: "",
  point: 0,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      return { ...action.payload, isLoggedIn: true };
    },
    logout: () => initialState,
    decrementPoint: (state, action: PayloadAction<number>) => {
      if (state.point >= action.payload) {
        state.point -= action.payload;
      }
    },
  },
});

export const { login, logout, decrementPoint } = userSlice.actions;
export default userSlice.reducer;
