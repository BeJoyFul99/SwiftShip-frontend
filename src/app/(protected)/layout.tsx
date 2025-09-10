import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Dashboard - SwiftShip",
  description: "SwiftShip - Your gateway to seamless shipping management",
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
