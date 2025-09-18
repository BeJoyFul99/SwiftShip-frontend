"use client";
import React, { useEffect, useState } from "react";
import { Bell, PanelLeft } from "lucide-react";
import ShapedButton from "../ui/shaped-button";
import { useSideNavToggler } from "@/app/context/SideNavContext";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const ICON_SIZE = 20;

function DashboardNav() {
  const { toggle, isClosed } = useSideNavToggler();
  const pathname = usePathname();
  const [currentDir, setCurrentDir] = useState<string[]>([]);

  useEffect(() => {
    const pathnameArray = pathname.split("/");
    pathnameArray.shift();
    setCurrentDir(pathnameArray);
  }, [pathname]);

  return (
    <nav
      className={cn(
        isClosed && "lg:ml-3 ",
        "min-w-max relative top-0 left-0 bg-background h-16 blur-bg border-b z-40 lg:rounded-t-2xl px-3 shadow-xs shadow-background"
      )}
    >
      <div className="nav-group flex items-center justify-end h-full gap-3 ">
        <div className="left-group flex justify-center items-center mr-auto gap-6">
          <ShapedButton type="button" onClick={toggle}>
            <PanelLeft size={ICON_SIZE} />
          </ShapedButton>

          <div className="breadcrumb border-l-2 h-6 border-l-muted-foreground/50 flex justify-center items-center ">
            <span className="px-3 flex gap-2 justify-center items-center ">
              {currentDir.length != 0 && currentDir.length < 2
                ? capitalizeFirstLetter(currentDir[0])
                : currentDir.map((path, index) => (
                    <p key={index}>
                      {index != 0 && "/ "} {capitalizeFirstLetter(path)}
                    </p>
                  ))}
            </span>
          </div>
        </div>

        {/* <div className="nav-item text-amber-200">Prohibited Goods</div> */}
        <div className="group-item ">
          <ShapedButton
            className="relative pinging-dot after:bg-red-600 before:bg-red-600"
            shape={"pill"}
          >
            <Bell size={ICON_SIZE} />
          </ShapedButton>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;
