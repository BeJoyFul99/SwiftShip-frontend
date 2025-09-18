import { cn } from "@/lib/utils";
import { Check, CheckCircle } from "lucide-react";
import React from "react";

export interface HistoryListProp {
  className?: string;
  children: React.ReactNode;
}
function HistoryList({ className, children }: HistoryListProp) {
  console.log(children);
  return (
    <ul className={cn(className, "w-full h-fit flex flex-col items-center")}>
      {children}
    </ul>
  );
}

export interface HistoryItemProp {
  className?: string;
  isCompleted: boolean;
  children: React.ReactNode;
  date?: Date;
}

export function HistoryItem({
  className,
  isCompleted,
  children,
  date,
}: HistoryItemProp) {
  const formatter = new Intl.DateTimeFormat("en-us", { month: "short" });
  const formattedDateTime = {
    date: date?.getDate() + " " + formatter.format(date?.getMonth()),
    time: date?.getHours() + ":" + date?.getMinutes(),
  };
  return (
    <li
      data-slot="history-item"
      className={cn(className, "flex  gap-5 w-full min-h-max ")}
    >
      <span className="date-label flex flex-col  items-center gap-1 ">
        {formattedDateTime.date}
        <span className="w-max text-xs text-muted-foreground/80">
          {formattedDateTime.time}{" "}
          {Number(date?.getHours()) >= 12 ? "PM" : "AM"}
        </span>
      </span>
      <div className="indicator-group  flex flex-col justify-center items-center after:content-[''] after:block after:w-[3px] after:bg-green-500/80 after:min-h-15  after:h-full">
        <span
          className={cn(
            isCompleted
              ? "!bg-green-500/80"
              : "pinging-dot after:bg-green-300 after:!h-5 after:!w-5 after:!-translate-x-[4px] after:!translate-y-[4px] ",
            "indicator flex justify-center items-center h-10 w-7 content-[''] relative  blur-bg rounded-full"
          )}
        >
          {isCompleted && <Check className="w-4 h-4" />}
        </span>
      </div>
      <p className="content flex flex-col items-center">{children}</p>
    </li>
  );
}

export default HistoryList;
