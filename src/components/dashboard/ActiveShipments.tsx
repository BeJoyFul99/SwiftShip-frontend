"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  fakeTrackingData,
  TrackingDataProp,
  getStatusColor,
} from "@/lib/utils";

interface ActiveShipmentsProps {
  onShipmentClick?: (trackingNumber: string) => void;
}

export default function ActiveShipments({
  onShipmentClick,
}: ActiveShipmentsProps) {
  const [activeTab, setActiveTab] = useState<"monitored" | "unmonitored">(
    "monitored"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on active tab and search term
  const filteredData = fakeTrackingData.filter((item) => {
    const matchesTab =
      activeTab === "monitored"
        ? item.trackingNumber.length % 2 === 0
        : item.trackingNumber.length % 2 !== 0;
    const matchesSearch =
      searchTerm === "" ||
      item.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.origin.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.origin.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleShipmentClick = (trackingNumber: string) => {
    if (onShipmentClick) {
      onShipmentClick(trackingNumber);
    }
  };

  return (
    <Card className="panel blur-bg text-foreground min-h-max border-border">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Active Shipments
          </h3>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 md:mr-2" />
            <span className="hidden md:block">Add Shipment</span>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-wrap">
          Keep track of vendor and their security ratings.
        </p>
      </CardHeader>
      <CardContent className="space-y-4 ">
        {/* Toolbar */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center bg-background/50 rounded-lg p-1 border border-border">
            <Button
              variant={activeTab === "monitored" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("monitored")}
              className="rounded-md"
            >
              Monitored
            </Button>
            <Button
              variant={activeTab === "unmonitored" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("unmonitored")}
              className="rounded-md"
            >
              Unmonitored
            </Button>
          </div>
          <div className="relative flex-1 max-w-sm min-w-[150px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 border-border"
            />
          </div>

          <Button variant="outline" size="sm" className="border-border">
            <Filter className="h-4 w-4 md:mr-2" />
            <span className="hidden md:block">Filters</span>
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border bg-background/50  overflow-auto ">
          <div className="overflow-x-auto">
            <table className="w-full ">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="p-4 font-medium text-muted-foreground">
                    Shipment ID
                  </th>
                  <th className="p-4 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="p-4 font-medium text-muted-foreground">
                    Origin
                  </th>
                  <th className="p-4 font-medium text-muted-foreground">
                    Destination
                  </th>
                  <th className="p-4 font-medium text-muted-foreground">
                    Estimated Arrival
                  </th>
                  <th className="p-4 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-border hover:bg-background/30"
                  >
                    <td className="p-4">
                      <button
                        onClick={() => handleShipmentClick(item.trackingNumber)}
                        className="text-primary hover:underline font-medium"
                      >
                        {item.trackingNumber}
                      </button>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(item.status)}
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="text-foreground">{item.origin.city}</div>
                      <div className="text-muted-foreground">
                        {item.origin.country}
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="text-foreground">
                        {item.destination.city}
                      </div>
                      <div className="text-muted-foreground">
                        {item.destination.country}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-foreground">
                      {item.arrivalDate}
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-accent/20"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-background border-border"
                        >
                          <DropdownMenuItem className="hover:bg-accent/20">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-accent/20">
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-accent/20">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-border"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="border-border"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
