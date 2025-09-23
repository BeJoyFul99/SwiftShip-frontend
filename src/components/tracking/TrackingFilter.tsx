import { Filter, EllipsisVertical } from "lucide-react";
import { Input } from "../ui/input";
import ShapedButton from "../ui/shaped-button";
export interface TrackingFilterProp {
  onFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const TrackingFilter = ({ onFilter }: TrackingFilterProp) => {
  return (
    <div className="tracking-filter bg-background sticky top-0 gap-3 border border-amber-50/15 p-2 flex flex-col w-full  ">
      <div className="flex  items-center justify-between gap-26">
        <p>Tracking Filter</p>
        <div className="action-group">
          <ShapedButton>
            <Filter />
          </ShapedButton>
          <ShapedButton>
            <EllipsisVertical />
          </ShapedButton>
        </div>
      </div>
      <Input
        className="bg-muted/30"
        placeholder="Order ID..."
        onChange={onFilter}
      />
    </div>
  );
};
