import { Button } from "@/components/ui/button";
import { Download, InfoIcon } from "lucide-react";
import { FC } from "react";
import { DateRange } from "react-day-picker";
import { ShowDateRange } from "../DateRangePicker";

interface HeaderBoxProps {
  label: string;
  date: DateRange | undefined;
  children: React.ReactNode;
}

const HeaderBox: FC<HeaderBoxProps> = ({
  label = "Order & Revenue",
  date,
  children,
}) => {
  return (
    <div className="bg-white w-full rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="rounded-t-lg border-b p-4 text-sm font-medium1 flex justify-between items-center ">
        <div className="flex gap-2 items-center">
          <div>
            {label}{" "}
            {date?.from ? (
              <span className="ml-2">
                ( <ShowDateRange date={date} /> ) 
              </span>
            ) : null}{" "}
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
      {children}
    </div>
  );
};

export default HeaderBox;
