/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const infoSlice = createSlice({
  name: "info",
  initialState: {
    data: null,
    show: false,
  },
  reducers: {
    addInfo: (state, action) => {
      state.data = action.payload;
    },
    addShow: (state, action) => {
      state.show = action.payload;
    },
    removeInfo: (state, action) => {
      state.data = null;
      state.show = false;
    },
  },
});

export const { addInfo, addShow, removeInfo } = infoSlice.actions;
export default infoSlice.reducer;
