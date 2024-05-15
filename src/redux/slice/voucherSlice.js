import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const voucherSlice = createSlice({
  name: "vouchers",
  initialState: {
    vouchers: [],
    voucherClaimed: [],
    message: "",
    status: "",
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = voucherSlice.actions;
export default voucherSlice.reducer;
