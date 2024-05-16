import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVouchersClaimed } from "../../redux/slice/voucherSlice";

function Navbar() {
  const dispatch = useDispatch();

  const { voucherClaimed } = useSelector((state) => state.vouchers);
  useEffect(() => {
    dispatch(getVouchersClaimed());
  }, [dispatch]);

  console.log(voucherClaimed);
  return (
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 ">
      <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
        <Ticket className="h-8 w-8" />
        <span className="">HORUS VOUCHER</span>
      </Link>
      <div className="w-full flex-1 flex justify-center">
        Vouchers Dashboard
      </div>
      <Link to="/history">
        <Button>
          <Badge
            variant="secondary"
            className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
          >
            {voucherClaimed.length}
          </Badge>
          History
        </Button>
      </Link>
    </div>
  );
}

export default Navbar;
