"use client";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import BarChart from "../Charts/BarChart";
import { Download, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrdersAndRevenueProps {}

const OrdersAndRevenue: FC<OrdersAndRevenueProps> = ({}) => {
  const [value, setValue] = useState(0);
  return (
    <div className="w-full rounded-lg bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="rounded-t-lg border-b p-4 text-sm font-medium1 flex justify-between items-center ">
        <div className="flex gap-2 items-center">
          <div>Orders & Revenue (15-04-2024 to 15-05-2024) </div>{" "}
          <InfoIcon size={15} fill="#3e719d" stroke="#fff" />
        </div>
        {/* <Button variant={"ghost"} className="p-4 py-0">
          <Download size={15} stroke="#3e719d" />
        </Button> */}
        <Button variant={"link"} className="p-4 py-0">
          <Download size={15} stroke="#3e719d" />
        </Button>
      </div>
      <div className="w-full rounded-t-lg border-b-2 p-4 text-sm font-medium flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-lg min-w-64">
            <div className="text-sm">Total Orders</div>
            <div className="text-lg font-semibold text-darkblue">65,010</div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg min-w-64">
            <div className="text-sm">Total Revenue</div>
            <div className="text-lg font-semibold text-darkblue">
              ₹10,65,010
            </div>
          </div>
        </div>
        <div className="flex items-center rounded-md border border-darkblue">
          <div
            className={cn(
              "border-r   border-r-darkblue rounded-l-sm p-6 py-2",
              value == 0 ? "bg-darkblue text-white " : "cursor-pointer"
            )}
            onClick={() => setValue(0)}
          >
            Orders
          </div>
          <div
            className={cn(
              "border-r border-r-darkblue p-6 py-2",
              value == 1 ? "bg-darkblue text-white " : "cursor-pointer"
            )}
            onClick={() => setValue(1)}
          >
            Picked
          </div>
          <div
            className={cn(
              " border-r-darkblue rounded-r-sm p-6 py-2",
              value == 2 ? "bg-darkblue text-white " : "cursor-pointer"
            )}
            onClick={() => setValue(2)}
          >
            Delivered
          </div>
        </div>
      </div>
      <BarChart />
    </div>
  );
};

export default OrdersAndRevenue;
