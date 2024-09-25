"use client";
import { FC, useState } from "react";
import OrderCards from "./OrderCards";
import OverviewContainer from "./Overview/OverviewContainer";
import OrdersAndRevenue from "./OrdersAndRevenue/OrdersAndRevenue";
import PieCharts from "./PieCharts";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { DatePickerWithRange } from "../DateRangePicker";

interface ReportsProps {}

const Reports: FC<ReportsProps> = ({}) => {
  // const [date, setDate] = useState<DateRange | undefined>({
  //   from: new Date(2022, 0, 20),
  //   to: addDays(new Date(2022, 0, 20), 20),
  // });
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const [date, setDate] = useState<DateRange | undefined>({
    from: yesterday,
    to: today,
  });
  console.log("date", date);
  return (
    <div className="pt-6 pr-12">
      <div className="text-4xl">
        Welcome, <strong>Abhay</strong>
      </div>
      <div className="flex gap-8 my-4 mb-10 flex-wrap">
        <OrderCards
          label="Orders"
          todayValue={"1,736"}
          percentage="5.81"
          yesterdayValue="1,971"
        />
        <OrderCards
          label="Revenue"
          todayValue={"₹28.55 Lakhs"}
          percentage="4"
          yesterdayValue="₹30.95 Lakhs"
        />{" "}
        <OrderCards
          label="Picked"
          todayValue={"2600"}
          percentage="13.19"
          yesterdayValue="2,299"
          profit
        />{" "}
        <OrderCards
          label="Delivered"
          todayValue={"1,049"}
          percentage="18.68"
          yesterdayValue="1,290"
        />{" "}
        <OrderCards
          label="RTO/DTO"
          todayValue={"247"}
          percentage="52.5"
          yesterdayValue="520"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Overview</div>
        {/* @ts-ignore */}
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      <hr className="mt-4 mb-8" />
      {/* <OverviewContainer /> */}
      {/* <OrdersAndRevenue date={date} /> */}
      <PieCharts date={date} />
    </div>
  );
};
export default Reports;
