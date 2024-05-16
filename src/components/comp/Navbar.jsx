import { Link } from "react-router-dom";
import { Ticket, ListCollapse, Shirt, Plane, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVouchersClaimed } from "../../redux/slice/voucherSlice";
import Logout from "./Logout";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Navbar({ selectedCategory, handleCategoryChange, remainingVouchers }) {
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
      <div className="block md:hidden ">
        <Sheet className="block md:hidden">
          <SheetTrigger asChild className="">
            <ListCollapse className="h-8 w-8" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Ticket className="h-8 w-8" />
                  <span className="">HORUS VOUCHER</span>
                </Link>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <div className="flex justify-center my-6 text-xl font-bold">
                  Kategori Voucher
                </div>
                <button
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-secondary ${
                    selectedCategory === "Food"
                      ? "text-primary bg-secondary"
                      : ""
                  }`}
                  onClick={() => handleCategoryChange("Food")}
                >
                  <Utensils className="h-4 w-4" />
                  Food Vouchers
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {remainingVouchers.Food || 0}
                  </Badge>
                </button>
                <button
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-secondary ${
                    selectedCategory === "Fashion"
                      ? "text-primary bg-secondary"
                      : ""
                  }`}
                  onClick={() => handleCategoryChange("Fashion")}
                >
                  <Shirt className="h-4 w-4" />
                  Fashion Vouchers
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {remainingVouchers.Fashion || 0}
                  </Badge>
                </button>
                <button
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-secondary ${
                    selectedCategory === "Travel"
                      ? "text-primary bg-secondary"
                      : ""
                  }`}
                  onClick={() => handleCategoryChange("Travel")}
                >
                  <Plane className="h-4 w-4" />
                  Travel Vouchers
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {remainingVouchers.Travel || 0}
                  </Badge>
                </button>
              </nav>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <div className="mt-8">
                  <Logout />
                </div>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
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
