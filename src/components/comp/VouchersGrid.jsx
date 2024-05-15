import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVouchers } from "../../redux/slice/voucherSlice";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function VouchersGrid({ category }) {
  const dispatch = useDispatch();
  const { vouchers } = useSelector((state) => state.vouchers);
  useEffect(() => {
    dispatch(getVouchers(category));
  }, [category, dispatch]);
  //   console.log(vouchers);
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 rounded-lg border border-dashed shadow-sm my-2 mr-2">
        <div className="flex justify-center ">
          <div className="grid grid-cols-3 gap-4">
            {vouchers.map((item, i) => (
              <div key={i}>
                <Card>
                  <CardContent>
                    <img
                      src={`http://localhost:3000${item.foto}`}
                      alt={item.nama}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div>
                      {item.nama}
                      <br />
                      {item.kategori} Discount Voucher
                    </div>
                    <Button>Claim</Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
export default VouchersGrid;
