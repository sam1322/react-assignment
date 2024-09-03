import { FC } from "react";
import DonutChartComponents from "./Charts/DonutChartComponents";
import PieChartComponent from "./Charts/PieChartComponent";
import ZonePieChart from "./Charts/ZonePieChart";
import HeaderBox from "./HeaderBox";

interface PieChartsProps {}

const PieCharts: FC<PieChartsProps> = ({}) => {
  return (
    <>
      <div className="w-full flex items-center mt-4 gap-4">
        <HeaderBox label="Zone Wise Distribution">
          <ZonePieChart />
        </HeaderBox>
        <HeaderBox label="Delivery Timeline">
          <DonutChartComponents />
        </HeaderBox>
      </div>
      <div className="w-full flex items-center my-4 gap-4  mb-0 pb-6">
        <HeaderBox label="Zone Wise Distribution">
          <PieChartComponent />
        </HeaderBox>
        <div className="w-full"> </div>
      </div>
    </>
  );
};

export default PieCharts;
