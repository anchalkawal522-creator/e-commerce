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

// 🔹 Order type
type Order = {
  orderId: string;
  items: CartItem[];
  date: string;
};

// 🔹 Context type
type CartContextType = {
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, type: "inc" | "dec") => void;
  placeOrder: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

// 🔹 Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  // ✅ LOAD from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedOrders = localStorage.getItem("orders");

    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        setCart(Array.isArray(parsed) ? parsed : []);
      } catch {
        setCart([]);
      }
    }

    if (storedOrders) {
      try {
        const parsed = JSON.parse(storedOrders);
        setOrders(Array.isArray(parsed) ? parsed : []);
      } catch {
        setOrders([]);
      }
    }

    setLoaded(true);
  }, []);

  // ✅ SAVE cart
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, loaded]);

  // ✅ SAVE orders
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders, loaded]);

useEffect(() => {
  const savedOrders = localStorage.getItem("orders");
  if (savedOrders) {
    setOrders(JSON.parse(savedOrders));
  }
}, []);

// SAVE
useEffect(() => {
  localStorage.setItem("orders", JSON.stringify(orders));
}, [orders]);
  // ✅ Add to Cart
  const addToCart = (product: Product) => {
    setCart((prev) => {
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
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Update quantity
  const updateQty = (id: number, type: "inc" | "dec") => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: type === "inc" ? item.qty + 1 : item.qty - 1,
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // ✅ PLACE ORDER (MAIN FEATURE)
  const placeOrder = () => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      orderId: "ORD" + Date.now(),
      items: cart,
      date: new Date().toLocaleString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // clear cart
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQty,
        placeOrder,
      }}
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