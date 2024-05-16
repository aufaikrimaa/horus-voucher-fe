import { Link } from "react-router-dom";
import { Ticket, ListCollapse } from "lucide-react";
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

  // console.log(voucherClaimed);
  return (
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 relative">
      <div className="hidden md:block">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <Ticket className="h-8 w-8" />
          <span className="">HORUS VOUCHER</span>
        </Link>
      </div>
      <div className="block md:hidden">
        <ListCollapse className="h-8 w-8" />
      </div>
      <div className="w-full flex-1 flex justify-center">
        <div className="hidden md:block"> Vouchers Dashboard</div>
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
