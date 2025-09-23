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
        <li className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
          <FaHome className="text-foreground" />
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        </li>
        <li className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
          <FaServicestack className="text-foreground" />
          <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
        </li>
        <li className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
          <FaShippingFast className="text-foreground" />
          <Link href="/tracking" className="hover:text-primary transition-colors">Tracking</Link>
        </li>
        <li className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
          <FaDollarSign className="text-foreground" />
          <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </li>
        <li className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
          <FaInfoCircle className="text-foreground" />
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
        </li>
      </ul>
    </>
  );
}

export default NavBarItems;
