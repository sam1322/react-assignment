import { FC } from "react";
import OverviewCards from "./OverviewCards";
import OverviewCardsTwo from "./OverviewCards2";

interface OverviewContainerProps {}

const OverviewContainer: FC<OverviewContainerProps> = ({}) => {
  return (
    <div className="flex gap-6 mb-6">
      <OverviewCards label="Shipping" />
      <OverviewCardsTwo label="NDR" />
    </div>
  );
};

export default OverviewContainer;
