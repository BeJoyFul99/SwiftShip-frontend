"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import TrackingItem from "@/components/tracking/tracking-item";
import { fakeTrackingData, TrackingDataProp } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { TrackingFilter } from "@/components/tracking/TrackingFilter";

// The MapComponent will only be imported and rendered on the client side
const MapComponent = dynamic(() => import("../../../components/MapComponent"), {
  ssr: false,
});
export default function Page() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredData, setFilteredData] = useState<TrackingDataProp[]>([]);
  const [filterID, setFilterID] = useState("");
  const onFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const filtered = fakeTrackingData.filter((data) =>
      data.trackingNumber.includes(value.toUpperCase())
    );
    setFilteredData(filtered);
    setFilterID(value);
  };

  const selectItem = (data: TrackingDataProp) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log(params);
    params.set("trackingNumber", data.trackingNumber);
    router.push("/dashboard/my-orders" + "?" + params.toString());
  };
  return (
    <div className="grid grid-rows-1 md:grid-cols-6 md:grid-rows-2 h-full w-full gap-2 p-3">
      <Card className="panel md:col-span-4 blur-bg text-foreground">
        <CardHeader>
          {isLoading ? (
            <Skeleton className="h-5" />
          ) : (
            <h2 className="panel-title flex items-center">
              Welcome {user?.username}
            </h2>
          )}
        </CardHeader>
        <CardContent className="h-[90%] ">
          {isLoading ? (
            <Skeleton className="h-3" />
          ) : (
            <div className="flex w-full h-full gap-5">
              <div className="bg-background h-full w-full flex-col flex overflow-hidden flex-1/3 shadow rounded-lg p-4">
                <TrackingFilter onFilter={onFilter} />
                <ScrollArea className="overflow-y-auto w-full relative ">
                  <div className="flex flex-col justify-start ">
                    {filterID && filteredData.length > 0 ? (
                      filteredData.map((data, index) => (
                        <TrackingItem
                          data={data}
                          key={index}
                          selectItem={selectItem}
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
                          selectItem={selectItem}
                        />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
              <MapComponent className="h-full flex-2/3 w-full rounded-4xl" />
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="panel md:col-span-2 blur-bg text-foreground">
        <CardHeader>
          {isLoading ? (
            <Skeleton className="h-5" />
          ) : (
            <h2 className="panel-title flex items-center">Drop Off Points</h2>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? <Skeleton className="h-3" /> : <p>ab</p>}
        </CardContent>
      </Card>
      <Card className="panel md:col-span-2 blur-bg text-foreground">
        <CardHeader>
          {isLoading ? (
            <Skeleton className="h-5" />
          ) : (
            <h2 className="panel-title flex items-center">My Packages</h2>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? <Skeleton className="h-3" /> : <p>abc</p>}
        </CardContent>
      </Card>
      <Card className="panel md:col-span-4 blur-bg text-foreground">
        <CardHeader>
          {isLoading ? (
            <Skeleton className="h-5" />
          ) : (
            <h2 className="panel-title flex items-center">News</h2>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? <Skeleton className="h-3" /> : <p>abc</p>}
        </CardContent>
      </Card>
    </div>
  );
}
