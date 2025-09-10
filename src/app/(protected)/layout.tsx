import { Metadata } from "next";
import { Shippori_Antique, Shippori_Antique_B1 } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "../context/AuthContext";

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
  title: "Dashboard - SwiftShip",
  description: "SwiftShip - Your gateway to seamless shipping management",
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${shippori_antique.variable} ${shippori_antique_b1.variable} antialiased`}
    >
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
