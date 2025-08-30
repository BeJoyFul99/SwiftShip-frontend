import type { Metadata } from "next";
import { Shippori_Antique, Shippori_Antique_B1 } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navs/Navbar";

const shippori_antique = Shippori_Antique({
  variable: "--font-shippori-antique",
  subsets: ["latin"],
  weight: "400",
});

const shippori_antique_b1 = Shippori_Antique_B1({
  variable: "--font-shippori-antique-b1",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "SwiftShip",
  description: "A platform for your shipping needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${shippori_antique.variable} ${shippori_antique_b1.variable} antialiased`}
      >
        <Navbar />
        {children}
        
      </body>
    </html>
  );
}
