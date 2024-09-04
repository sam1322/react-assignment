"use client";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import BarChart from "../Charts/BarChart";
import { Download, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { ShowDateRange } from "@/components/DateRangePicker";

interface OrdersAndRevenueProps {
  date: DateRange | undefined;
}

interface BoxProps {
  value: number;
  index: number;
  onClick: () => void;
  label: string;
  first?: boolean;
  last?: boolean;
}

const Box: FC<BoxProps> = ({ value, index, onClick, label, first, last }) => {
  return (
    <div
      className={cn(
        "border-r border-r-darkblue p-2 py-2 xl:px-6  ",
        value == index ? "bg-darkblue text-white " : "cursor-pointer",
        first && "rounded-l-sm",
        last && "rounded-r-sm border-r-0"
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

const OrdersAndRevenue: FC<OrdersAndRevenueProps> = ({ date }) => {
  const [value, setValue] = useState(0);
  return (
    <div className="w-full rounded-lg bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="rounded-t-lg border-b p-4 text-sm font-medium1 flex justify-between items-center ">
        <div className="flex gap-2 items-center">
          <div>
            Orders & Revenue
            {date?.from ? (
              <span className="ml-2">
                ( <ShowDateRange date={date} /> )
              </span>
            ) : null}
            {/* (15-04-2024 to 15-05-2024) */}
          </div>{" "}
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
        <div className=" hidden lg:flex  items-center rounded-md border border-darkblue">
          <Box
            value={value}
            index={0}
            label="Orders"
            first
            onClick={() => setValue(0)}
          />
          <Box
            value={value}
            index={1}
            label="Picked"
            onClick={() => setValue(1)}
          />
          <Box
            value={value}
            index={2}
            label="Delivered"
            last
            onClick={() => setValue(2)}
          />
        </div>
      </div>
      <BarChart />
    </div>
  );
};

export default OrdersAndRevenue;
