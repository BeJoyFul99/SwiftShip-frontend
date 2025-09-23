import type { Metadata } from "next";
import { Shippori_Antique, Shippori_Antique_B1 } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

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
  title: process.env["APP_NAME"],
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
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
