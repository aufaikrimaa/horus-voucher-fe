import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVouchers,
  getVouchersClaimed,
} from "../../redux/slice/voucherSlice";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function VouchersGrid({ category, remainingVouchers, setRemainingVouchers }) {
  const dispatch = useDispatch();
  const { vouchers } = useSelector((state) => state.vouchers);

  const user = JSON.parse(localStorage.getItem("userData"));
  const user_id = user.id;

  useEffect(() => {
    dispatch(getVouchers(category));
  }, [category, dispatch]);

  useEffect(() => {
    const countVisibleCards = vouchers.reduce((count, item) => {
      if (
        !(
          Array.isArray(item.status) &&
          item.status.includes(`diklaim user ${user_id}`)
        )
      ) {
        return count + 1;
      }
      return count;
    }, 0);
    // console.log(countVisibleCards);
  }, [vouchers, user_id]);

  const handleClaim = async (id_voucher) => {
    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      const user_id = user.id;
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      const response = await axios.post(
        "http://localhost:3000/api/voucher/claim",
        {
          id_voucher,
          id_user: user_id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log(response.data);
      if (response.status === 200) {
        alert("Voucher berhasil diklaim!");
        dispatch(getVouchers(category));
        dispatch(getVouchersClaimed());
        setRemainingVouchers((prevState) => ({
          ...prevState,
          [category]: prevState[category] - 1,
        }));
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 rounded-lg border border-dashed shadow-sm my-2 mr-2">
        <div className="flex justify-center ">
          {remainingVouchers === 0 ? (
            <div className="flex justify-center mt-20 text-xl font-bold">
              Seluruh voucher disini sudah anda claim.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {vouchers.map((item, i) => (
                <div
                  key={i}
                  className={`${
                    Array.isArray(item.status) &&
                    item.status.includes(`diklaim user ${user_id}`)
                      ? "hidden"
                      : "block"
                  }`}
                >
                  <Card>
                    <img
                      src={`http://localhost:3000${item.foto}`}
                      alt={item.nama}
                    />
                    <CardContent></CardContent>
                    <CardFooter className="flex justify-between">
                      <div>
                        {item.nama}
                        <br />
                        {item.kategori} Discount Voucher
                      </div>
                      <Button onClick={() => handleClaim(item.id)}>
                        Claim
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
export default VouchersGrid;
