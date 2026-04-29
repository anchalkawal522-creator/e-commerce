"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


// 🔹 Product type
type Product = {
  id: number;
  title: string;
  price: number;
  desc: string;
  image: string;
  rating: number;
  reviews: number;
};

// 🔹 Cart item
type CartItem = Product & {
  qty: number;
};

// 🔹 Context type
type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, type: "inc" | "dec") => void;
};

const CartContext = createContext<CartContextType | null>(null);

// 🔹 Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false); // ✅ prevent overwrite

  // ✅ LOAD from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setCart(parsed);
        } else {
          setCart([]);
        }
      } catch {
        setCart([]);
      }
    }

    setLoaded(true); // ✅ mark loaded
  }, []);

  // ✅ SAVE to localStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, loaded]);

  // ✅ Add to Cart
  const addToCart = (product: Product) => {
    setCart((prev) => {
      if (!Array.isArray(prev)) return [];

      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ✅ Remove item
  const removeFromCart = (id: number) => {
    setCart((prev) =>
      Array.isArray(prev) ? prev.filter((item) => item.id !== id) : []
    );
  };

  // ✅ Update quantity
  const updateQty = (id: number, type: "inc" | "dec") => {
    setCart((prev) =>
      Array.isArray(prev)
        ? prev
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    qty: type === "inc" ? item.qty + 1 : item.qty - 1,
                  }
                : item
            )
            .filter((item) => item.qty > 0)
        : []
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 🔹 Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;

};