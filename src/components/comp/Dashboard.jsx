import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircleUser, Home, Package2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VouchersGrid from "./VouchersGrid";
import { useState } from "react";

export function Dashboard() {
  const { voucherCount } = useSelector((state) => state.vouchers);
  const [selectedCategory, setSelectedCategory] = useState("Food");

  console.log(voucherCount);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">HORUS VOUCHER</span>
            </Link>
          </div>
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
                <Home className="h-4 w-4" />
                Food Vouchers
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {voucherCount.Food}
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
                <Home className="h-4 w-4" />
                Fashion Vouchers
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {voucherCount.Fashion}
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
                <Home className="h-4 w-4" />
                Travel Vouchers
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {voucherCount.Travel}
                </Badge>
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <VouchersGrid category={selectedCategory} />
      </div>
    </div>
  );
}

export default Dashboard;
