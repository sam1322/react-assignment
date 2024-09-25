import LeftSideBar from "@/components/LeftSideBar/LeftSideBar";
import Reports from "@/components/Reports/Reports";
import { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <div>
      <LeftSideBar />
      <div className="pl-10 sm:pl-56 ">
        <Reports />
      </div>
    </div>
  );
};

export default HomePage;
