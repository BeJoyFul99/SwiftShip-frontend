import { Metadata } from "next";
import Logo from "@/components/navs/Logo";
import Link from "next/link";
import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import "../globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "SwiftShip",
  description: "A platform for your shipping needs around the gloabl",
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="h-screen flex justify-center items-center">
        <div className="container relative !max-h-[1098px]  bg-accent  p-5 w-full sm:min-h-fit h-max min-h-full m-auto md:h-10/12 flex items-center justify-center gap-5  rounded-2xl">
          <Link
            href={"/"}
            className="home-arrow absolute right-10 md:right-20 top-10 hover:translate-x-2.5 transition-transform"
          >
            <FaArrowAltCircleRight className="text-foreground text-3xl" />
          </Link>
          <div className="hidden p-7 lg:block text-white login-hero h-full w-full aspect-auto flex-1/2 rounded-xl ">
            <Logo />{" "}
          </div>
          <div className="flex-1/2 flex mt-10 sm:mt-0 justify-center items-center h-full">
            {/* <LoginForm /> */}
            {children}
          </div>
        </div>
      </main>
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            actionButton: "!text-background !bg-foreground",
            description: "!text-foreground ",
            info: "!bg-background !text-foreground !border-gray-950/60 !dark:focus-visible:ring-amber-50/60",
          },
        }}
      />
    </>
  );
}
