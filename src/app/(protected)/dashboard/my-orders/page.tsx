"use client";
import TrackingItemDetail from "@/components/tracking/tacking-item-detail";
import TrackingItem from "@/components/tracking/tracking-item";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapedButton from "@/components/ui/shaped-button";
import { fakeTrackingData, TrackingDataProp } from "@/lib/utils";
import { EllipsisVertical, Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TrackingFilter } from "@/components/tracking/TrackingFilter";

// The MapComponent will only be imported and rendered on the client side
const MapComponent = dynamic(
  () => import("../../../../components/MapComponent"),
  {
    ssr: false,
  }
);
function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectItem, setSelectedItem] = useState<TrackingDataProp | null>(null);
  const [filteredData, setFilteredData] = useState<TrackingDataProp[]>([]);
  const [filterID, setFilterID] = useState("");
  const onFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const filtered = fakeTrackingData.filter((data) =>
      data.trackingNumber.includes(value)
    );
    setFilteredData(filtered);
    setFilterID(value);
  };
  useEffect(() => {
    const trackingNumber = searchParams.get("trackingNumber");
    if (trackingNumber) {
      fakeTrackingData.map((data) => {
        if (data.trackingNumber === trackingNumber) setSelectedItem(data);
      });
    }
  }, []);

  // Function to create a new URL with updated query parameters
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const SelectItem = (data: TrackingDataProp) => {
    const trackingNumber = searchParams.get("trackingNumber");
    if (trackingNumber === data.trackingNumber) return;
    router.push(
      pathname + "?" + createQueryString("trackingNumber", data.trackingNumber)
    );
    setSelectedItem(data);
  };

  const cancelSelect = () => {
    router.push(pathname);
    setSelectedItem(null);
  };

  return (
    <div className="tracking-content flex items-center relative h-full w-full">
      <MapComponent className="w-full h-full absolute z-10" />
      <div className=" -ml-3 tracking-list bg-background h-full flex overflow-hidden flex-col z-20">
        <TrackingFilter onFilter={onFilter} />
        <ScrollArea className="overflow-y-auto w-full">
          <div className="flex flex-col justify-start ">
            {filterID && filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <TrackingItem
                  data={data}
                  key={index}
                  selectItem={SelectItem}
                  isSelected={
                    data?.trackingNumber === selectItem?.trackingNumber
                  }
                />
              ))
            ) : filterID && filteredData.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full w-full gap-2">
                <p className="text-foreground">No results found</p>
              </div>
            ) : (
              fakeTrackingData.map((data, index) => (
                <TrackingItem
                  data={data}
                  key={index}
                  selectItem={SelectItem}
                  isSelected={
                    data?.trackingNumber === selectItem?.trackingNumber
                  }
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
      {selectItem && (
        <TrackingItemDetail data={selectItem} close={cancelSelect} />
      )}
    </div>
  );
}

export default Page;
