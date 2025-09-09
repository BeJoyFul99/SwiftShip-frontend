import { LoginForm } from "@/components/login-form";
import Logo from "@/components/navs/Logo";
import React from "react";

async function page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="container bg-accent  p-5 w-full m-auto h-10/12 flex items-center justify-center gap-5  rounded-2xl">
        <div className="hidden p-7 lg:block text-white login-hero h-full w-full aspect-auto flex-1/2 rounded-xl ">
          <Logo />{" "}
        </div>
        <div className="login-in flex-1/2 flex justify-center items-center h-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default page;
