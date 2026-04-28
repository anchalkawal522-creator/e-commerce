"use client"
import "./globals.css";
import Header from "./componets/Header/Header";
import Navbar from "./componets/Navbar/Navbar";
import { usePathname } from "next/navigation";
import Footer from "./componets/Footer/page";
import { CartProvider } from "./Context/cartContext"; 

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
    
      <CartProvider>
      {!hideLayout && <Header />}
      {!hideLayout && <Navbar />}

      {children}

      {!hideLayout && <Footer />}
      </CartProvider>
  </body>
</html>
);
}