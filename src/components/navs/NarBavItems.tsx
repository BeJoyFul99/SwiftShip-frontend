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
      <ul className="nav-items lg:space-x-6">
        <li className="flex items-center space-x-2  transition-colors">
          <FaHome />
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        <li className="flex items-center space-x-2  transition-colors">
          <FaServicestack />
          <Link
            href="/services"
            className="hover:text-primary transition-colors"
          >
            Services
          </Link>
        </li>
        <li className="flex items-center space-x-2 transition-colors">
          <FaShippingFast />
          <Link
            href="/tracking"
            className="hover:text-primary transition-colors"
          >
            Tracking
          </Link>
        </li>
        <li className="flex items-center space-x-2 transition-colors">
          <FaDollarSign />
          <Link
            href="/pricing"
            className="hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </li>
        <li className="flex items-center space-x-2 transition-colors">
          <FaInfoCircle />
          <Link href="/about" className="hover:text-primary transition-colors">
            About Us
          </Link>
        </li>
      </ul>
    </>
  );
}

export default NavBarItems;
