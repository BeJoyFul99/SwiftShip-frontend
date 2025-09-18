import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

export const shapedButtonVariants = cva(
  "inline-flex gap-2 hover:text-muted-foreground  justify-center text-muted-foreground items-center p-2  hover:cursor-pointer hover:bg-foreground/10 transition",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-foreground/20 hover:border-foreground/0",
        sidebar: "text-foreground",
        active: "text-background bg-foreground",
        "tracking-item-active": "!text-muted-foreground !bg-foreground/10",
      },
      shape: {
        default: "rounded-md",
        pill: "rounded-full",
        square: "rounded-none",
      },
      textPosition: {
        start: "justify-start",
        default: "justify-center",
        end: "justify-end",
        between: "justify-between",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
      textPosition: "default",
    },
  }
);
function ShapedButton({
  className,
  variant,
  shape,
  textPosition,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof shapedButtonVariants>) {
  return (
    <button
      className={cn(
        shapedButtonVariants({ variant, shape, textPosition, className })
      )}
      {...props}
    />
  );
}

export default ShapedButton;
