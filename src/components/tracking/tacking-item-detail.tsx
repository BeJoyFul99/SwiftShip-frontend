import { getStatusColor, TrackingDataProp } from "@/lib/utils";
import { Copy, Headset, X } from "lucide-react";
import React, { use } from "react";
import ShapedButton from "../ui/shaped-button";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DetailInfoCard from "./detail-info-card";
import airplane from "../../../public/airplane-white.png";
import { Progress } from "../ui/progress";
import HistoryList, { HistoryItem } from "../ui/history-list";
import OrderItem from "./OrderItem";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
export interface TrackingItemDetailProp {
  data: TrackingDataProp;
  close: () => void;
}
function TrackingItemDetail({ data, close }: TrackingItemDetailProp) {
  const deliverDate = new Date();
  const router = useRouter();
  const customerSupport = () => {
    router.push(
      "/dashboard/messages?type=support&trackingNumber=" + data.trackingNumber
    );
  };
  return (
    <ScrollArea className="relative top-0 z-20 max-w-[455px] w-full tracking-order-detail !bg-transparent h-full overflow-y-auto min-w-[450px]  ">
      <div className="bg-muted w-full flex flex-col items-center gap-8 pb-8 border border-foreground/15">
        <ShapedButton
          shape={"pill"}
          className="absolute right-5 top-5"
          onClick={close}
        >
          <X />
        </ShapedButton>
        <div className="top-notch blur-bg text-xs flex  items-center justify-center p-2 px-4 rounded-br-xl rounded-bl-xl bg-muted w-max mx-auto ">
          <span className={getStatusColor(data.status)}>
            {data.status} • {data.arrivalDate}(UTC)
          </span>
        </div>
        <div className="tracking-number p-2 flex items-center gap-2">
          <h1>{data.trackingNumber}</h1>
          <ShapedButton className="p-1">
            <Copy className="text-muted-foreground/50" />
          </ShapedButton>
        </div>
        <div className="tracking-item-image w-full">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            <Image
              src={airplane}
              alt="Photo by Drew Beamer"
              fill
              className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </AspectRatio>
        </div>
        <div className="transportation-provider flex flex-col justify-center items-center gap-4">
          <Avatar className="h-13 w-13">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{data.transportationProvider}</AvatarFallback>
          </Avatar>
          <h1 className="text-xl text-foreground px-5 max-w-fit text-ellipsis">
            Transportation by {data.transportationProvider} {"  "}
            {data.transportationType}
          </h1>
        </div>
        {/* <div className="info-card-group text-sm flex gap-1 items-center w-full px-3">
          <DetailInfoCard
            data={{
              location: {
                city: data.origin.city,
                country: data.origin.country,
                code: data.origin.code,
              },
              scheduledTime: data.scheduledDepartureTime,
              actualTime: data.actualDepartureTime,
              isDest: false,
            }}
          />
          <DetailInfoCard
            data={{
              location: {
                city: data.destination.city,
                country: data.destination.country,
                code: data.destination.code,
              },
              scheduledTime: data.scheduledArrivalTime,
              actualTime: data.arrivalDate,
              isDest: true,
            }}
          />
        </div> */}
      </div>
      <div className="route-info blur-bg !bg-muted/10 w-full flex flex-col gap-5 items-center px-3 py-5 border border-foreground/10">
        <div className="flex justify-between items-center w-full">
          <span>Progress</span>
          <span className="text-foreground/40 ">
            {data.status === "ARRIVED" ? "ARRIVED" : "ON THE WAY"}
          </span>
        </div>
        <div className="w-full">
          <Progress value={50} />
          <div className="flex justify-between text-xs   items-center mt-4 w-full">
            <span className="glass-text !text-muted-foreground p-1">
              {data.origin.code}
            </span>
            <span className="glass-text !text-muted-foreground p-1 ">
              {data.destination.code}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center w-full ">
          <p>
            {data.origin.city},{data.origin.country}
          </p>
          <p>
            {data.destination.city},{data.destination.city}
          </p>
        </div>{" "}
        <div className="flex justify-between items-center w-full text-xs text-muted -mt-3.5 ">
          <p className="glass-text !bg-muted-foreground">
            {data.departureDate}
          </p>
          <p className="glass-text !bg-muted-foreground">
            ETA: {data.arrivalDate}
          </p>
        </div>
      </div>
      <div className="order-status blur-bg !bg-muted/10 w-full flex flex-col gap-5 items-center px-3 py-5 border border-foreground/10">
        <span className="text-left w-full">Order Status</span>
        <HistoryList className="">
          <HistoryItem date={deliverDate} isCompleted={false}>
            Parcel received from shop
          </HistoryItem>{" "}
          <HistoryItem date={deliverDate} isCompleted={true}>
            Parcel Send from shop
          </HistoryItem>
          <HistoryItem date={deliverDate} isCompleted={true}>
            IN Transit
          </HistoryItem>
          <HistoryItem date={deliverDate} isCompleted={true}>
            Delivered
          </HistoryItem>
        </HistoryList>
      </div>
      <div className="order-details blur-bg !bg-muted/10 w-full flex flex-col gap-5 items-center px-3 py-5 border border-foreground/10">
        <span className="text-left w-full text-foreground">Items </span>
        <OrderItem
          name="Toy"
          category="05.Bags"
          product_origin="China"
          material="Cotton"
          net_weight={5}
          unit_value={600}
          qty={1}
        />{" "}
        <OrderItem
          name="Toy"
          category="05.Bags"
          product_origin="China"
          material="Cotton"
          net_weight={5}
          unit_value={600}
          qty={1}
        />{" "}
        <OrderItem
          name="Toy"
          category="05.Bags"
          product_origin="China"
          material="Cotton"
          net_weight={5}
          unit_value={600}
          qty={1}
        />{" "}
        <OrderItem
          name="Toy"
          category="05.Bags"
          product_origin="China"
          material="Cotton"
          net_weight={5}
          unit_value={600}
          qty={1}
        />
      </div>
      <div className="order-details blur-bg !bg-muted/10 w-full flex flex-col gap-5 items-center px-3 py-5 border border-foreground/10">
        <span className="text-left w-full text-foreground">Help </span>
        <div className="flex w-full">
          <Button
            onClick={customerSupport}
            className="w-full hover:shadow-xl border-accent-foreground  bg-transparent hover:bg-foreground p-6 border hover:text-background  text-foreground  rounded-none  hover:cursor-pointer "
          >
            <Headset /> Customer Agent
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

export default TrackingItemDetail;
