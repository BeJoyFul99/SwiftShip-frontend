import { Metadata } from "next";
import "../globals.css";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import SideNavbar from "@/components/dashboard/side-nav-bar";
import { SideNavProvider } from "../context/SideNavContext";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";

export const metadata: Metadata = {
  title: "Dashboard - SwiftShip",
  description: "SwiftShip - Your gateway to seamless shipping management",
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideNavProvider>
      <div className=" w-full flex lg:pr-3 bg-background h-full">
        <SideNavbar className="left-0 top-0 absolute lg:relative h-screen  z-50 transition" />
        <div className="main-content lg:my-3 w-full flex flex-col  ">
          <DashboardNav />
          <DashboardWrapper>{children}</DashboardWrapper>
        </div>
      </div>
    </SideNavProvider>
  );
}
