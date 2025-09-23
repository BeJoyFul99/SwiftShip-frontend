import { Card, CardContent, CardHeader } from "@/components/ui/card";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../MapComponent"), {
  ssr: false,
});

interface MapPanelProps {
  title?: string;
  subtitle?: string;
  status?: string;
  origin?: string;
  eta?: string;
}

export default function MapPanel({
  title = "Upcoming Arrival",
  subtitle = "Evergreen Line - 1.2M TEU",
  status = "At San Francisco Port",
  origin = "DOS (IMO: 8513417, MMSI: 548324100)",
  eta = "05:30 AM, Aug 20, 2022",
}: MapPanelProps) {
  return (
    <Card className="panel blur-bg text-foreground relative h-full border-border pb-0 md:min-h-auto  ">
      <CardHeader>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative h-full min-h-[450px]">
        <MapComponent className="rounded-b-lg z-40 h-full" />
        {/* Status box at bottom left */}
        <div className="blur-bg transition-all absolute w-[96%] md:w-max z-50 bottom-2 left-2 md:bottom-4 md:left-4 !bg-background/35 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-foreground/20">
          <div className="space-y-1">
            <div className="text-sm">
              <span className="text-muted-foreground ">Status</span>
              <span className="ml-2 font-medium text-foreground">{status}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Origin</span>
              <span className="ml-2 font-medium text-foreground">{origin}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">E.T.A</span>
              <span className="ml-2 font-medium text-foreground">{eta}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
