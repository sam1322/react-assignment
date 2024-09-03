import { FC } from "react";
import OrderCards from "./OrderCards";
import OverviewContainer from "./Overview/OverviewContainer";
import OrdersAndRevenue from "./OrdersAndRevenue/OrdersAndRevenue";
import PieCharts from "./PieCharts";

interface ReportsProps {}

const Reports: FC<ReportsProps> = ({}) => {
  return (
    <div className="pt-6 pr-12">
      <div className="text-4xl">
        Welcome, <strong>Abhay</strong>
      </div>
      <div className="flex gap-8 my-4 mb-10">
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
      <div className="text-xl font-semibold">Overview</div>
      <hr className="mt-4 mb-8" />
      <OverviewContainer />
      <OrdersAndRevenue />
      <PieCharts />
    </div>
  );
};

export default Reports;
