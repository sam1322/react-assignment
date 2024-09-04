import DownArrow from "@public/svg/downwardArrow";
import UpArrow from "@public/svg/upwardArrow";
import { InfoIcon, ShoppingCartIcon } from "lucide-react";
import { FC } from "react";

interface OrderCardsProps {
  label: string;
  todayValue: string;
  yesterdayValue: string;
  percentage: string;
  profit?: boolean;
}

const OrderCards: FC<OrderCardsProps> = ({
  label,
  todayValue,
  yesterdayValue,
  percentage,
  profit,
}) => {
  const arrowWidth = 10;
  const arrowHeight = 5;
  return (
    <div className="min-w-[300px]">
      {/* <div className="w-full"> */}
      <div className="flex items-center gap-1 mb-2 text-sm font-medium">
        {label} <InfoIcon size={15} fill="#3e719d" stroke="#fff" />
      </div>
      <div
        className="flex items-center gap-4 rounded-xl p-4 w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] "
        // style={{ boxShadow: " 1px 1px 4px 0px rgba(0,0,0,0.75)" }}
      >
        <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center">
          <ShoppingCartIcon strokeWidth={1.5} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm">Today</div>
          <div className="flex items-center gap-4">
            <div className="text-darkblue font-bold text-lg truncate">
              {todayValue}
            </div>
            {profit ? (
              <div className="text-green-500 flex items-center gap-1 text-sm">
                <UpArrow
                  width={arrowWidth}
                  height={arrowHeight}
                  color="#22c55e"
                />
                <div>{percentage}% </div>
              </div>
            ) : (
              <div className="text-red-500 flex items-center gap-1 text-sm">
                <DownArrow
                  width={arrowWidth}
                  height={arrowHeight}
                  color="#ef4444"
                />
                <div>{percentage}%</div>
              </div>
            )}
          </div>
          <div className="text-sm flex items-start gap-2">
            <div>Y&apos;day -</div> <div className="font-bold">{yesterdayValue}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCards;
