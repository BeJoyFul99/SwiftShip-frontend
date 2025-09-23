"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { fakeTrackingData } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import MapPanel from "@/components/dashboard/MapPanel";
import ActiveShipments from "@/components/dashboard/ActiveShipments";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Calculate KPI values from fakeTrackingData
  const totalShipments = fakeTrackingData.length;
  const inTransitCount = fakeTrackingData.filter(
    (item) => item.status === "IN TRANSIT"
  ).length;
  const pendingCount = fakeTrackingData.filter(
    (item) =>
      item.status === "PENDING" ||
      item.status === "DELAYED" ||
      item.status === "ON HOLD"
  ).length;
  const deliveredCount = fakeTrackingData.filter(
    (item) => item.status === "ARRIVED" || item.status === "OUT FOR DELIVERY"
  ).length;

  const handleShipmentClick = (trackingNumber: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("trackingNumber", trackingNumber);
    router.push("/dashboard/my-orders" + "?" + params.toString());
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-background">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Skeleton className="h-96 lg:col-span-2" />
          <Skeleton className="h-96 lg:col-span-3" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full border border-border overflow-y-auto">
      <div className="space-y-6 bg-background text-foreground">
        {/* Header Section */}
        <DashboardHeader
          userName={user?.username || "Alberto"}
          userTitle="HGV Class1 - E/D"
          userCompany="Niolax Group"
          userLocation="CA"
        />
        {/* KPI Cards Row */}
        <div className="w-full flex pb-4 items-stretch gap-4 overflow-x-auto">
          <StatCard title="Total Shipment" value={totalShipments} delta={1.2} />
          <StatCard title="Pickup Package" value={inTransitCount} delta={3.6} />
          <StatCard title="Pending Package" value={pendingCount} delta={-2.8} />
          <StatCard
            title="Delivery Shipments"
            value={deliveredCount}
            delta={3.0}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6  min-h-[600px]  h-full">
          {/* Map Panel - Left Side */}
          <div className="lg:col-span-3">
            <RecentTransactions />
          </div>
          {/* Map Panel - Right Side */}
          <div className="lg:col-span-2">
            <MapPanel />
          </div>
        </div>
        {/* Active Shipments Panel - Right Side */}
        <div className="lg:col-span-3 h-full">
          <ActiveShipments onShipmentClick={handleShipmentClick} />
        </div>
      </div>
    </div>
  );
}
