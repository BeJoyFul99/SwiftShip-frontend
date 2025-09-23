"use client";
import React, { useEffect, useState } from "react";
import { Bell, PanelLeft, Sun, Moon } from "lucide-react";
import ShapedButton from "../ui/shaped-button";
import { useSideNavToggler } from "@/app/context/SideNavContext";
import { useTheme } from "@/app/context/ThemeContext";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const ICON_SIZE = 20;

function DashboardNav() {
  const { toggle, isClosed } = useSideNavToggler();
  const { theme, toggleTheme } = useTheme();
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
        "min-w-max sticky md:relative top-0 left-0 bg-background min-h-16 blur-bg  border border-b-0 border-border z-40 lg:rounded-t-2xl px-3 shadow-xs shadow-background"
      )}
    >
      <div className="nav-group flex items-center justify-end h-full gap-3 ">
        <div className="left-group flex justify-center items-center mr-auto gap-6">
          <ShapedButton
            type="button"
            onClick={toggle}
            className="hover:bg-accent/20"
          >
            <PanelLeft size={ICON_SIZE} className="text-foreground" />
          </ShapedButton>

          <div className="breadcrumb border-l-2 h-6 border-l-border flex justify-center items-center ">
            <span className="px-3 flex gap-2 justify-center items-center text-foreground">
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

        {/* Theme Toggle Button */}
        <div className="group-item">
          <ShapedButton
            type="button"
            onClick={toggleTheme}
            shape="pill"
            className="hover:bg-accent/20 transition-colors"
          >
            {theme === "light" ? (
              <Moon size={ICON_SIZE} className="text-muted-foreground" />
            ) : (
              <Sun size={ICON_SIZE} className="text-foreground" />
            )}
          </ShapedButton>
        </div>

        {/* Notification Button */}
        <div className="group-item ">
          <ShapedButton
            className="relative pinging-dot after:bg-destructive before:bg-destructive hover:bg-accent/20"
            shape={"pill"}
          >
            <Bell size={ICON_SIZE} className="text-foreground" />
          </ShapedButton>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;
