import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
export interface ItemProp {
  name: string;
  category: string;
  product_origin: string;
  material: string;
  net_weight: number;
  unit_value: number;
  qty: number;
}
function OrderItem({
  name,
  category,
  material,
  product_origin,
  net_weight,
  unit_value,
  qty,
}: ItemProp) {
  return (
    <Card className="w-full blur-bg p-3 text-white flex justify-center items-center gap-0 hover:border-foreground/10">
      <Link
        href={""}
        target="_blank"
        className=" p-1 text-center !text-white/60 hover:bg-muted/20"
      >
        SHP20240130001
      </Link>
      <div className="flex  w-full">
        <div className="details flex flex-col gap-1 flex-1 ">
          <h1 className="text-bold text-base">(Yamato) {name}</h1>
          <div className="desc *:text-sm ml-5 text-foreground/70">
            <p>{category}</p>
            <p>Made in: {product_origin}</p>
            <p>Material: {material}</p>
            <p>Weight: {net_weight}Kg</p>
          </div>
        </div>
        <div className=" flex flex-col gap-1 items-start  text-sm">
          <p>${unit_value} YEN</p>
          <p className="text-foreground/70">Qty:{qty}</p>
        </div>
      </div>
    </Card>
  );
}

export default OrderItem;
