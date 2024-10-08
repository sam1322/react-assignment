import LeftSideBar from "@/components/LeftSideBar/LeftSideBar";
import NodeContainer from "@/components/ReactFlowComponent/nodeContainer";
import Reports from "@/components/Reports/Reports";
import { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <div className="flex items-center justify-center">
      <NodeContainer />
    </div>
  );
};

export default HomePage;
