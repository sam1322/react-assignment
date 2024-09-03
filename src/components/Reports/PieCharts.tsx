import { FC } from "react";
import HeaderBox from "./HeaderBox";
import PieChartComponent from "./Charts/PieChartComponent";
import DonutChartComponents from "./Charts/DonutChartComponents";

interface PieChartsProps {}

const PieCharts: FC<PieChartsProps> = ({}) => {
  return (
    <>
      <div className="w-full flex items-center mt-4 gap-4">
        {/* <HeaderBox label="Zone Wise Distribution">
          <PieChartComponent />
        </HeaderBox> */}
        <HeaderBox label="Zone Wise Distribution">
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
