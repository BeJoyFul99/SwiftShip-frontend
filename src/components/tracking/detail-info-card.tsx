import React from "react";
export interface DetailInfoCardProp {
  data: {
    location: {
      city: string;
      country: string;
      code: string;
    };
    scheduledTime: string;
    actualTime: string;
    isDest: boolean;
  };
}
function DetailInfoCard({ data }: DetailInfoCardProp) {
  return (
    <div className="bg-blur p-2 flex  flex-col items-center justify-center w-full max-w-[450px] h-full rounded-xl blur-bg">
      <div className="location text-center border-b-2 border-b-amber-50/20 w-full pb-3  ">
        <h1>{data.location.code}</h1>
        <h2>
          {data.location.city}, {data.location.country}
        </h2>
      </div>
      <div className="time w-full flex items-center flex-col text-foreground/70">
        <div className="scheduled w-full flex items-center justify-between px-2 py-1">
          <span>Scheduled</span>
          <span>{data.scheduledTime}</span>
        </div>
        <div className="actual w-full flex items-center justify-between px-2 py-1 text-foreground/70">
          <span>Estimated</span>
          <span>{data.actualTime}</span>
        </div>
      </div>
    </div>
  );
}

export default DetailInfoCard;
