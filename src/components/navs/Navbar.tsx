"use client";
import React, { useState, useEffect } from "react";
import NavBarItems from "./NarBavItems";
import Link from "next/link";
import { BsSignIntersectionYFill } from "react-icons/bs";
import Logo from "./Logo";
import { useAuth } from "@/app/context/AuthContext";
import { useTheme } from "@/app/context/ThemeContext";
import { PanelLeftDashed, Sun, Moon } from "lucide-react";
import { Spinner } from "../ui/shadcn-io/spinner";
import ShapedButton from "../ui/shaped-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function Navbar() {
  const [isLandingVisible, setIsLandingVisible] = useState(true);
  const { user, isLoading, } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLandingVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const landingElement = document.getElementById("landing");
    if (landingElement) {
      observer.observe(landingElement);
    }

    return () => {
      if (landingElement) {
        observer.unobserve(landingElement);
      }
    };
  }, []);

  return (
    <nav
      className={`fixed left-[50%] -translate-x-[50%] z-50 px-5 py-4 transition-all duration-300 ${
        isLandingVisible
          ? `top-1.5   w-[98%] ${
              theme === "light" ? "text-background" : "text-foreground"
            }`
          : "shadow-md w-full backdrop-blur-sm bg-background/80 border-b border-border"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Navigation Links */}
        <div className="*:hidden *:md:flex">
          <NavBarItems />
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <ShapedButton
            type="button"
            onClick={toggleTheme}
            shape="pill"
          >
            {theme === "light" ? (
              <Moon className="h-6 w-6" />
            ) : (
              <Sun className="h-6 w-6 " />
            )}
          </ShapedButton>

          {/* Login/Dashboard */}
          {isLoading ? (
            <div className="nav-item flex items-center space-x-2 gap-2 text-foreground">
              <Spinner></Spinner>
            </div>
          ) : !user ? (
            <Link
              href="/login"
              className="nav-item flex items-center space-x-2 gap-2 "
            >
              Login
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="nav-item !bg-transparent flex items-center space-x-2 gap-2 "
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>{" "}
    </nav>
  );
}

export default Navbar;
