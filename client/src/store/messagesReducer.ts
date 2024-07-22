import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: null,
  },
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
  },
});
export const { setMessages } = messageSlice.actions;
export default messageSlice.reducer;
