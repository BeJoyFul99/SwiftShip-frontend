"use client";
import {
  fakeTrackingData,
  isDesktopMediaQuery,
  TrackingDataProp,
} from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/use-media-query";
import MyOrderDesktopView from "@/components/my-orders/desktop-view";
import MyOrderMobileView from "@/components/my-orders/mobile-view";
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
  const [selectedItem, setSelectedItem] = useState<TrackingDataProp | null>(
    null
  );
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

  const isDesktop = useMediaQuery(isDesktopMediaQuery);

  return (
    <div className="tracking-content flex items-center relative h-full w-full border">
      <MapComponent className="w-full h-full absolute z-10" />
      {isDesktop ? (
        <MyOrderDesktopView
          onFilter={onFilter}
          filteredData={filteredData}
          SelectItem={SelectItem}
          selectedItem={selectedItem}
          filterID={filterID}
          cancelItem={cancelSelect}
        />
      ) : (
        <MyOrderMobileView />
      )}
    </div>
  );
}

export default Page;
