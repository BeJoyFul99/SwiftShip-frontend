import React from "react";
import Link from "next/link";
import {
  FaHome,
  FaServicestack,
  FaShippingFast,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa"; // Import icons

function NavBarItems() {
  return (
    <>
      {/* Navigation Links */}
      <ul className="nav-items lg:space-x-6 ">
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
    </>
  );
}

export default NavBarItems;
