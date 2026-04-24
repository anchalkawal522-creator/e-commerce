"use client";

import "./globals.css";
import Header from "./componets/Header/Header";
import Navbar from "./componets/Navbar/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout =
    pathname.includes("/login") ||
    pathname.includes("/register");


  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        {!hideLayout && <Header />}
        {!hideLayout && <Navbar />}
        
        {children}
      </body>
    </html>
  );
}