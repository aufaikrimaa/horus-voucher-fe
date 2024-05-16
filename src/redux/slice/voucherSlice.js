import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const voucherSlice = createSlice({
  name: "vouchers",
  initialState: {
    allvouchers: [],
    vouchers: [],
    voucherClaimed: [],
    voucherCountClaimed: [],
    message: "",
    status: "",
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setAllVouchers(state, action) {
      state.allvouchers = action.payload;
    },
    setVouchers(state, action) {
      state.vouchers = action.payload;
    },
    setVoucherClaimed(state, action) {
      state.voucherClaimed = action.payload;
    },
    setVoucherCountClaimed(state, action) {
      state.voucherCountClaimed = action.payload;
    },
  },
});

// export const getAllVouchers = () => {
//   return async (dispatch) => {
//     try {
//       const token = document.cookie.replace(
//         /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
//         "$1"
//       );
//       const response = await axios.get(
//         "http://localhost:3000/api/voucher/all",
//         {
//           headers: {
//             Authorization: `${token}`,
//           },
//         }
//       );
//       // // console.log("Response Data:", response.data.data);
//       const data = response.data.data;
//       // console.log(data);

//       dispatch(setAllVouchers(data));
//     } catch (error) {
//       console.error("Error fetching vouchers:", error);
//     }
//   };
// };

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
      // // console.log("Response Data:", response.data.data);
      const data = response.data.data;
      // console.log(data);

      const filteredVouchers = data.filter(
        (voucher) => voucher.kategori === category
      );

      dispatch(setAllVouchers(data));

      dispatch(setVouchers(filteredVouchers));
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };
};

export const getVouchersClaimed = () => {
  return async (dispatch) => {
    try {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      const user = JSON.parse(localStorage.getItem("userData"));
      const user_id = user.id;
      // // console.log(user_id);
      const response = await axios.get(
        "http://localhost:3000/api/voucher/claim",
        {
          body: {
            id_user: user_id,
          },
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.data.data;
      // console.log(data);

      const voucherCounts = data.reduce((counts, claim) => {
        const kategori = claim.voucher.kategori;
        counts[kategori] = (counts[kategori] || 0) + 1;
        return counts;
      }, {});

      // // console.log(voucherCounts);
      dispatch(setVoucherCountClaimed(voucherCounts));

      dispatch(setVoucherClaimed(data));
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };
};

export const {
  setStatus,
  setAllVouchers,
  setVouchers,
  setVoucherClaimed,
  setVoucherCountClaimed,
} = voucherSlice.actions;
export default voucherSlice.reducer;
