"use client";
import React, { useState, useEffect } from "react";
import NavBarItems from "./NarBavItems";
import Link from "next/link";
import { BsSignIntersectionYFill } from "react-icons/bs";
import Logo from "./Logo";
import { useAuth } from "@/app/context/AuthContext";
import { PanelLeftDashed } from "lucide-react";
import { Spinner } from "../ui/shadcn-io/spinner";

function Navbar() {
  const [isLandingVisible, setIsLandingVisible] = useState(true);
  const { user, isLoading } = useAuth();
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
          ? "top-1.5 text-[var(--snow-white)] w-[98%]"
          : "shadow-md dark:text-white w-full backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Logo />
        {/* Navigation Links */}
        <div className="*:hidden *:md:flex">
          <NavBarItems />
        </div>
        {/* login */}
        {isLoading ? (
          <div className="nav-item flex items-center space-x-2 gap-2">
            <Spinner></Spinner>
          </div>
        ) : !user ? (
          <Link
            href="/login"
            className="nav-item flex items-center space-x-2 gap-2"
          >
            <BsSignIntersectionYFill />
            Login
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="nav-item flex items-center space-x-2 gap-2"
          >
            <PanelLeftDashed />
            Dashboard
          </Link>
        )}
      </div>{" "}
    </nav>
  );
}

export default Navbar;
