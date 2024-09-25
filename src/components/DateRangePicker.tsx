"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FC } from "react";

interface DatePickerWithRangeProps {
  date: DateRange | undefined;
  setDate: () => void;
  className?: string;
}

const DatePickerWithRange: FC<DatePickerWithRangeProps> = ({
  className,
  date,
  setDate,
}) => {
  //   const [date, setDate] = React.useState<DateRange | undefined>({
  //     from: new Date(2022, 0, 20),
  //     to: addDays(new Date(2022, 0, 20), 20),
  //   });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[200px] justify-start text-left font-normal sm:w-[250px]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {/* {format(date.from, "LLL dd, y")} -{" "} */}
                  {/* {format(date.to, "LLL dd, y")} */}
                  {format(date.from, "MM/dd/y")} - {format(date.to, "MM/dd/y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface ShowDateRangeProp {
  date: DateRange | undefined;
}

const ShowDateRange: FC<ShowDateRangeProp> = ({ date }) => {
  return (
    <>
      {date?.from ? (
        date.to ? (
          <>
            {/* {format(date.from, "LLL dd, y")} -{" "} */}
            {/* {format(date.to, "LLL dd, y")} */}
            {format(date.from, "MM-dd-y")} to {format(date.to, "MM-dd-y")}
          </>
        ) : (
          format(date.from, "LLL dd, y")
        )
      ) : null}
    </>
  );
};

export { DatePickerWithRange, ShowDateRange };
