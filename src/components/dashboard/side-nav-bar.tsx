"use client";
import { useSideNavToggler } from "@/app/context/SideNavContext";
import { cn, fakeTrackingData } from "@/lib/utils";
import React from "react";
import Logo from "../navs/Logo";
import Image from "next/image";
import ShapedButton from "../ui/shaped-button";
import {
  AppWindow,
  Bell,
  Container,
  CreditCard,
  EllipsisVertical,
  HelpCircle,
  LogOutIcon,
  Map,
  MessageCircle,
  ShieldAlert,
  Wallet,
} from "lucide-react";
import { FaGear, FaRegAddressBook } from "react-icons/fa6";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";

function SideNavbar({ className }: { className?: string }) {
  const { isClosed, toggle } = useSideNavToggler();
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string, originVariant = "default") =>
    path === pathname
      ? "active"
      : (originVariant as
          | "default"
          | "outline"
          | "active"
          | "sidebar"
          | "tracking-item-active"
          | null
          | undefined);

  const handleRouting = (path: string) => {
    if (path && path !== pathname) router.push(path);
  };

  const getAccountBadge = () => {
    let msg = "Verified";
    let variant:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | null
      | undefined = "secondary";
    let className = "bg-[#02e92c]";

    if (user) {
      if (user.is_account_locked) {
        msg = "Locked";
        variant = "destructive";
      } else if (user.is_account_verified) {
        msg = "Unverified";
        className = "bg-amber-300";
      }
    }

    return (
      <Badge className={className} variant={variant}>
        {msg}
      </Badge>
    );
  };
  return (
    <>
      {!isClosed && (
        <div
          onClick={toggle}
          data-state={isClosed ? "open" : "closed"}
          className="overlay hover:cursor-pointer lg:hidden fixed inset-0 z-50 blur-bg !backdrop-blur-xs "
        ></div>
      )}
      <nav
        className={cn(
          className,
          isClosed ? "w-0" : "w-sm max-w-[75%] min-w-[200px]",
          "sidebar fixed md:border-r-0 transition-all bg-background overflow-auto h-full flex flex-col gap-4 lg:gap-8 items-center py-3"
        )}
      >
        <div className="sidebar-header">
          <ul className="sidebar-menu ">
            <li className="sidebar-menu-item">
              <Image src={"/logo.png"} alt="logo" width={75} height={65} />
              <Logo targetPath="/" />
            </li>
          </ul>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-group">
            <ul className="sidebar-menu">
              <li className="sidebar-menu-item">
                <ShapedButton
                  className="w-full text-start"
                  textPosition={"start"}
                  variant={isActive("/dashboard")}
                  onClick={() => handleRouting("/dashboard")}
                >
                  <AppWindow />
                  Overview
                </ShapedButton>
              </li>
            </ul>
          </div>
          <div className="sidebar-group">
            <div className="sidebar-label">Tracking</div>
            <ul className="sidebar-menu">
              <li className="sidebar-menu-item group">
                <ShapedButton
                  className="w-full text-start"
                  textPosition={"start"}
                  variant={isActive("/dashboard/my-orders")}
                  onClick={() => handleRouting("/dashboard/my-orders")}
                >
                  <Container />
                  My Orders
                </ShapedButton>
                <span
                  data-isactive={isActive("/dashboard/my-orders")}
                  className={cn(
                    "absolute right-10 data-[isactive='active']:text-background group-hover:text-background"
                  )}
                >
                  {fakeTrackingData.length}
                </span>
              </li>
              <li className="sidebar-menu-item">
                <ShapedButton
                  className="w-full text-start"
                  textPosition={"start"}
                  variant={isActive("/dashboard/active-routes")}
                  onClick={() => handleRouting("/dashboard/active-routes")}
                >
                  <Map />
                  Active routes
                </ShapedButton>
              </li>
            </ul>
          </div>
          <div className="sidebar-group">
            <div className="sidebar-label">Documents</div>
            <ul className="sidebar-menu">
              <li className="sidebar-menu-item">
                <ShapedButton
                  className="w-full text-start"
                  textPosition={"start"}
                  variant={isActive("/dashboard/payments")}
                  onClick={() => handleRouting("/dashboard/payments")}
                >
                  <CreditCard />
                  Payments
                </ShapedButton>
              </li>
              <li className="sidebar-menu-item">
                <ShapedButton
                  className="w-full text-start"
                  textPosition={"start"}
                  variant={isActive("/dashboard/notifications")}
                  onClick={() => handleRouting("/dashboard/notifications")}
                >
                  <Bell />
                  Notifications
                </ShapedButton>
              </li>
              <li className="sidebar-menu-item">
                <ShapedButton
                  className="w-full text-start"
                  textPosition={"start"}
                  variant={isActive("/dashboard/messages")}
                  onClick={() => handleRouting("/dashboard/messages")}
                >
                  <MessageCircle />
                  Messages
                </ShapedButton>
              </li>{" "}
              <li className="sidebar-menu-item">
                <ShapedButton
                  className="w-full text-start"
                  textPosition={"start"}
                  variant={isActive("/dashboard/address-book")}
                  onClick={() => handleRouting("/dashboard/address-book")}
                >
                  <FaRegAddressBook size={22} />
                  Address Book
                </ShapedButton>
              </li>
              <li className="sidebar-menu-item">
                <ShapedButton
                  className="w-full text-start"
                  textPosition={"start"}
                  variant={isActive("/dashboard/wallet")}
                  onClick={() => handleRouting("/dashboard/wallet")}
                >
                  <Wallet />
                  Wallet
                </ShapedButton>
              </li>
            </ul>
          </div>
          {user && ["ADMIN", "SUPERADMIN"].includes(user.role) && (
            <div className="sidebar-group ">
              <div className="sidebar-label !text-destructive flex gap-1 items-center">
                <ShieldAlert /> Administration
              </div>
              <ul className="sidebar-menu *>button:text-destructive">
                <li className="sidebar-menu-item">
                  <ShapedButton
                    className="w-full text-start"
                    textPosition={"start"}
                    variant={isActive("/dashboard/restricted/orders")}
                    onClick={() =>
                      handleRouting("/dashboard/restricted/orders")
                    }
                  >
                    Orders
                  </ShapedButton>
                </li>
                <li className="sidebar-menu-item">
                  <ShapedButton
                    className="w-full text-start"
                    textPosition={"start"}
                    variant={isActive("/dashboard/restricted/routes")}
                    onClick={() =>
                      handleRouting("/dashboard/restricted/routes")
                    }
                  >
                    Routes
                  </ShapedButton>
                </li>
                <li className="sidebar-menu-item">
                  <ShapedButton
                    className="w-full text-start"
                    textPosition={"start"}
                    variant={isActive("/dashboard/restricted/users")}
                    onClick={() => handleRouting("/dashboard/restricted/users")}
                  >
                    Users
                  </ShapedButton>
                </li>
              </ul>
            </div>
          )}
          <div className="sidebar-group">
            <ul className="sidebar-menu">
              <li className="sidebar-menu-item">
                <Button
                  size={"lg"}
                  type="button"
                  className="w-full bg-foreground text-background hover:cursor-pointer hover:bg-transparent hover:text-foreground hover:border"
                >
                  Claim Your Packages
                </Button>
              </li>
            </ul>
          </div>
          <div className="sidebar-group mt-auto">
            <div className="sidebar-group-content">
              <ul className="sidebar-menu ">
                <li className="sidebar-menu-item">
                  <ShapedButton
                    className="w-full text-start"
                    textPosition={"start"}
                    variant={isActive(`/dashboard/settings/${user?.id}`)}
                    onClick={() =>
                      handleRouting(`/dashboard/settings/${user?.id}`)
                    }
                  >
                    <FaGear size={23} />
                    Settings
                  </ShapedButton>
                </li>
                <li className="sidebar-menu-item">
                  <ShapedButton
                    className="w-full text-start"
                    textPosition={"start"}
                    variant={isActive("/dashboard/support")}
                    onClick={() => handleRouting("/dashboard/support")}
                  >
                    <HelpCircle />
                    Support
                  </ShapedButton>
                </li>
                <li className="sidebar-menu-item">
                  <ShapedButton
                    className="w-full text-start"
                    textPosition={"start"}
                    variant={"sidebar"}
                    onClick={logout}
                  >
                    <LogOutIcon />
                    Logout
                  </ShapedButton>
                </li>
              </ul>
            </div>
          </div>

          <div className="sidebar-group">
            <ul className="sidebar-menu">
              <li className="sidebar-menu-item">
                <ShapedButton className="w-full p-2" textPosition={"start"}>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="w-full h-full flex gap-1 flex-col items-start justify-center">
                    {isLoading ? (
                      <>
                        <Skeleton className="h-3" />
                        <Skeleton className="h-3" />
                      </>
                    ) : (
                      <>
                        <span className="text-md  flex justify-center items-center gap-3">
                          {user?.username} {getAccountBadge()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {" "}
                          {user?.email}
                        </span>
                      </>
                    )}
                  </div>{" "}
                </ShapedButton>{" "}
                <ShapedButton shape={"pill"}>
                  <EllipsisVertical />
                </ShapedButton>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SideNavbar;
