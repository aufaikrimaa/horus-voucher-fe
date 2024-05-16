import { Utensils, Shirt, Plane } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import HistoryVoucherTable from "./HistoryVoucherTable";

export function SidebarClaimed() {
  const { voucherCountClaimed } = useSelector((state) => state.vouchers);

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <HistoryVoucherTable />
          </div>
          <div>
            <Card
              className="overflow-hidden h-[80vh]"
              x-chunk="dashboard-05-chunk-4"
            >
              <nav className="grid items-end px-2 text-sm font-medium lg:px-4 justify-self-end">
                <div className="flex justify-center my-6 text-xl font-bold">
                  Kategori Voucher
                </div>
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary">
                  <Utensils className="h-4 w-4" />
                  Food Vouchers
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {voucherCountClaimed.Food || 0}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary">
                  <Shirt className="h-4 w-4" />
                  Fashion Vouchers
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {voucherCountClaimed.Fashion || 0}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary">
                  <Plane className="h-4 w-4" />
                  Travel Vouchers
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {voucherCountClaimed.Travel || 0}
                  </Badge>
                </div>
              </nav>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SidebarClaimed;
