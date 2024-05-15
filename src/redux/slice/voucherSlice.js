import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const voucherSlice = createSlice({
  name: "vouchers",
  initialState: {
    vouchers: [],
    voucherClaimed: [],
    voucherCount: [],
    message: "",
    status: "",
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setVouchers(state, action) {
      state.vouchers = action.payload;
    },
    setVoucherCount(state, action) {
      state.voucherCount = action.payload;
    },
  },
});

export const getVouchers = (category) => {
  return async (dispatch) => {
    try {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      const response = await axios.get(
        "http://localhost:3000/api/voucher/all",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log("Response Data:", response.data.data);
      const data = response.data.data;
      console.log(data);

      const voucherCounts = data.reduce((counts, voucher) => {
        counts[voucher.kategori] = (counts[voucher.kategori] || 0) + 1;
        return counts;
      }, {});

      console.log(voucherCounts);
      dispatch(setVoucherCount(voucherCounts));

      const filteredVouchers = data.filter(
        (voucher) => voucher.kategori === category
      );

      dispatch(setVouchers(filteredVouchers));
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };
};

export const { setStatus, setVouchers, setVoucherCount } = voucherSlice.actions;
export default voucherSlice.reducer;
