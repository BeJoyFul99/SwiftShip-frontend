import { cn, getStatusColor, TrackingDataProp } from "@/lib/utils";
import React from "react";
import ShapedButton from "../ui/shaped-button";
import { Progress } from "../ui/progress";

function TrackingItem({
  data,
  selectItem,
  isSelected,
}: {
  data: TrackingDataProp;
  selectItem: (data: TrackingDataProp) => void;
  isSelected: boolean;
}) {
  return (
    <ShapedButton
      variant={isSelected ? "tracking-item-active" : "default"}
      className="border rounded-none"
      onClick={() => selectItem(data)}
    >
      <div className="tacking-order-item flex gap-2 flex-col p-2  w-full">
        <div className="item-head flex items-center justify-between">
          <h1 className="text-foreground ">{data.trackingNumber}</h1>
          <p className={cn(getStatusColor(data.status), "text-xs blur-bg")}>
            {data.status}
          </p>
        </div>
        <div className="item-progress flex w-full items-center justify-between gap-2">
          <span className="origin-data data-label blur-bg">{data.origin.code}</span>
          <Progress
            className="w-full *>[data-slot='progress-indicator']:bg-white bg-background "
            value={20}
          ></Progress>
          <span className="dest-data data-label blur-bg">{data.destination.code}</span>
        </div>
        <div className="tracking-data-details-name flex w-full items-center justify-between gap-5 text-base text-foreground/30">
          <p className="max-w-xl  ">
            {data.origin.city},{data.origin.country}
          </p>
          <p>
            {data.destination.city},{data.destination.country}
          </p>
        </div>{" "}
        <div className="tracking-data-details-name flex w-full items-center justify-between gap-5 text-xs text-foreground/30">
          <p className="max-w-xl  ">{data.departureDate}</p>
          <p>{data.arrivalDate}</p>
        </div>
      </div>
    </ShapedButton>
  );
}

export default TrackingItem;
