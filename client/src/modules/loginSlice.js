import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: null,
  userInfo: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.isLogin = true;
      state.userInfo = action.payload.userInfo;
    },
    LOGOUT: (state) => {
      state.isLogin = false;
      state.userInfo = null;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
