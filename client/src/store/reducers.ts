import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    allUsers: null,
    userDetail: null,
    onlineUsers: null,
  },
  reducers: {
    setAuthUser: (state, { payload }) => {
      state.authUser = payload;
    },
    setAllUser: (state, { payload }) => {
      state.allUsers = payload;
    },
    setUserDetail: (state, { payload }) => {
      state.userDetail = payload;
    },
    setOnlineUser: (state, { payload }) => {
      state.onlineUsers = payload;
    },
  },
});

export const { setAuthUser, setAllUser, setUserDetail, setOnlineUser } =
  userSlice.actions;
export default userSlice.reducer;
