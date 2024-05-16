import { useSelector } from "react-redux";
import { Utensils, Shirt, Plane } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import VouchersGrid from "./VouchersGrid";
import { useState, useEffect } from "react";
import Logout from "./Logout";

export function Sidebar() {
  const { allvouchers } = useSelector((state) => state.vouchers);
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [remainingVouchers, setRemainingVouchers] = useState({});

  useEffect(() => {
    const visibleVouchers = allvouchers.filter(
      (item) =>
        !Array.isArray(item.status) ||
        !item.status.includes(`diklaim user ${user_id}`)
    );

    const remainingVouchersByCategory = visibleVouchers.reduce(
      (accumulator, item) => {
        const { kategori } = item;
        accumulator[kategori] = (accumulator[kategori] || 0) + 1;
        return accumulator;
      },
      {}
    );

    setRemainingVouchers(remainingVouchersByCategory);
  }, [allvouchers]);

  // console.log(allvouchers);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const user = JSON.parse(localStorage.getItem("userData"));
  const user_id = user.id;

  // // console.log(remainingVouchers);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <div className="flex justify-center my-6 text-xl font-bold">
                Kategori Voucher
              </div>
              <button
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-secondary ${
                  selectedCategory === "Food" ? "text-primary bg-secondary" : ""
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
              <div className="mt-8">
                <Logout />
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <VouchersGrid
          category={selectedCategory}
          remainingVouchers={remainingVouchers}
          setRemainingVouchers={setRemainingVouchers}
        />
      </div>
    </div>
  );
}

export default Sidebar;
