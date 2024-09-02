import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { FC } from "react";
import Card from "./Card";

interface OverviewCardsProps {
  label: string;
}
 

const OverviewCardsTwo: FC<OverviewCardsProps> = ({ label }) => {
  return (
    <div className="w-full">
      <div className="text-md font-medium ">{label}</div>
      <div className="flex gap-4 rounded-lg mt-4 px-2 py-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <Card col="NDR Raised" val1="51,679" />
        <Card col="NDR Active " val1="51,679" val2="873" />
        <Card col="NDR Delivered" val1="57.9%" val2="873" />
        <Card col="RTO Post NDR" val1="51.9%" val2="873" last />
      </div>
    </div>
  );
};

export default OverviewCardsTwo;
