import { fakeTrackingData, TrackingDataProp } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { SelectItem } from "@radix-ui/react-select";
import React from "react";
import TrackingItemDetail, {
  TrackingItemDetailProp,
} from "../tracking/tacking-item-detail";
import TrackingItem from "../tracking/tracking-item";
import { TrackingFilter, TrackingFilterProp } from "../tracking/TrackingFilter";
export interface MyOrderDestktopViewProp extends TrackingFilterProp {
  selectedItem: TrackingDataProp | null;
  SelectItem: (data: TrackingDataProp) => void;
  filterID: string;
  filteredData: TrackingDataProp[];
  cancelItem: () => void;
}
function MyOrderDesktopView({
  onFilter,
  filteredData,
  filterID,
  selectedItem,
  SelectItem,
  cancelItem,
}: MyOrderDestktopViewProp) {
  return (
    <>
      <div className="tracking-list bg-background h-full flex overflow-hidden flex-col z-20">
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
                    data?.trackingNumber === selectedItem?.trackingNumber
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
                    data?.trackingNumber === selectedItem?.trackingNumber
                  }
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
      {selectedItem && (
        <TrackingItemDetail data={selectedItem} close={cancelItem} />
      )}{" "}
    </>
  );
}

export default MyOrderDesktopView;
