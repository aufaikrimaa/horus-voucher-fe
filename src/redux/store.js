import { configureStore } from "@reduxjs/toolkit";
import vouchers from "./slice/voucherSlice";

const store = configureStore({
  reducer: {
    vouchers,
  },
});

export default store;
