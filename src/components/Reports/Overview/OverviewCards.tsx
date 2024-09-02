import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { FC } from "react";
import Card from "./Card";

interface OverviewCardsProps {
  label: string;
}


const OverviewCards: FC<OverviewCardsProps> = ({ label}) => {
  return (
    <div className="w-full">
      <div className="text-md font-medium ">{label}</div>
      <div className="flex gap-4 rounded-lg mt-4 px-2 py-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <Card col="Active Shipments" val1="51,679" />
        <Card col="Yet to be Picked" val1="51,679" val2="873" />
        <Card col="Open Shipments" val1="57.9%" val2="8773" />
        <Card col="Closed Shipment" val1="80.5%" val2="873" last />
      </div>
    </div>
  );
};

export default OverviewCards;
