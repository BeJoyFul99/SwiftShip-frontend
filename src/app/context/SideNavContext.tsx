"use client";
import { createContext, useCallback, useContext, useState } from "react";

interface SideNavContextType {
  isClosed: boolean;
  toggle: () => void;
}

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

export function SideNavProvider({ children }: { children: React.ReactNode }) {
  const [isClosed, setIsClosed] = useState(false);

  const toggle = useCallback(() => {
    setIsClosed((isClosed) => !isClosed);
    console.log(isClosed);
  }, [isClosed]);

  return (
    <SideNavContext.Provider value={{ isClosed, toggle }}>
      {children}
    </SideNavContext.Provider>
  );
}

export function useSideNavToggler() {
  const context = useContext(SideNavContext);
  if (context == undefined) {
    throw new Error("useSideNav must be used within an SideNavProvider");
  }
  return context;
}
