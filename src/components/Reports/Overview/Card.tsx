import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { FC } from "react";

interface CardProps {
  col: string;
  val1: string;
  val2?: string;
  last?: boolean;
}

const Card: FC<CardProps> = ({ col, val1, val2, last }) => {
  return (
    <div
      className={cn(
        "p-2 flex flex-col gap-4 items-start justify-start flex-1 ",
        last ? "" : "border-r-2"
      )}
    >
      <div className="flex items-center gap-2 text-sm">
        {col} <InfoIcon size={15} fill="#3e719d" stroke="#fff" />
      </div>
      <div className="text-md font-bold text-darkblue">{val1}</div>
      <div className="text-sm">{val2 ? `(${val2})` : ""}</div>
    </div>
  );
};

export default Card;
