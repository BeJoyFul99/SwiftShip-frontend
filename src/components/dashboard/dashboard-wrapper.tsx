"use client";
import { useSideNavToggler } from "@/app/context/SideNavContext";
import { cn } from "@/lib/utils";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isClosed } = useSideNavToggler();
  return (
    <main
      className={cn(
        isClosed && "lg:ml-3",
        "px-3 !mt-1 blur-bg shadow-xs shadow-background lg:rounded-bl-2xl lg:rounded-br-2xl h-full"
      )}
    >
      {children}
    </main>
  );
}
