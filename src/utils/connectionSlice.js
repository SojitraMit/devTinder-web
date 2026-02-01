/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: () => null,
  },
});

export default connectionSlice.reducer;
export const { addConnections, removeConnections } = connectionSlice.actions;
