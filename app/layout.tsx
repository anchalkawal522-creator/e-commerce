"use client"
import "./globals.css";
import Header from "./componets/Header/Header";
import Navbar from "./componets/Navbar/Navbar";
import { usePathname } from "next/navigation";
import Footer from "./componets/Footer/page";
import { CartProvider } from "./Context/cartContext"; 
import { SearchProvider } from "./Context/searchContext";
import { WishlistProvider } from "./Context/wishlistContext";
import { AuthProvider } from "./Context/authContext";
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
      <SearchProvider>
        <WishlistProvider>
          <AuthProvider>
      {!hideLayout && <Header />}
      {!hideLayout && <Navbar />}

      {children}

      {!hideLayout && <Footer />}
      </AuthProvider>
      </WishlistProvider>
      </SearchProvider>

      </CartProvider>

  </body>
</html>
);
}