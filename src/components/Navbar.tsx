"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaServicestack,
  FaShippingFast,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa"; // Import icons

function Navbar() {
  const [isLandingVisible, setIsLandingVisible] = useState(true);

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
        <div className="text-2xl font-bold">
          <Link href="/">SwiftShip</Link>
        </div>
        {/* Navigation Links */}
        <ul className="nav-items lg:space-x-6 hidden md:flex">
          <li className="flex items-center space-x-2">
            <FaHome />
            <Link href="/">Home</Link>
          </li>
          <li className="flex items-center space-x-2">
            <FaServicestack />
            <Link href="/services">Services</Link>
          </li>
          <li className="flex items-center space-x-2">
            <FaShippingFast />
            <Link href="/tracking">Tracking</Link>
          </li>
          <li className="flex items-center space-x-2">
            <FaDollarSign />
            <Link href="/pricing">Pricing</Link>
          </li>
          <li className="flex items-center space-x-2">
            <FaInfoCircle />
            <Link href="/about">About Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
