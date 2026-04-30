"use client";

import { pop } from "../../data/pop";
import "./pop.css";
import { useRouter } from "next/navigation";
import { useCart } from "../../Context/cartContext";
import { useWishlist } from "../../Context/wishlistContext"; // ✅ added

export default function Pop() {
  const { addToCart } = useCart();
  const { addToWishlist, wishlist, removeFromWishlist } = useWishlist(); // ✅ added
  const router = useRouter();

  const handleAdd = (item: any) => {
    addToCart(item);
    setTimeout(() => {
      router.push(`cart`);
    }, 200);
  };

  return (
    <div className="pop">
      <h2 className="pop-title">Weekly Popular Products</h2>

      <div className="pop-grid">
        {pop.map((item) => (
          <div key={item.id} className="pop-card">
            
            {/* IMAGE */}
            <div className="pop-img" style={{ position: "relative" }}>
              <img src={item.image} alt={item.title} />

              {/* ❤️ WISHLIST */}
              <div
                className="wishlist"
                onClick={() => {
                  const exists = wishlist.some((w: any) => w.id === item.id);
                  if (exists) {
                    removeFromWishlist(item.id);
                  } else {
                    addToWishlist(item);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                {wishlist.some((w: any) => w.id === item.id)
                  ? "❤️"
                  : "🤍"}
              </div>
            </div>

            {/* CONTENT */}
            <div className="pop-content">
              <div className="pop-header">
                <h3>{item.title}</h3>
                <span>${item.price}.00</span>
              </div>

              <p className="pop-desc">{item.desc}</p>

              <div className="rating">
                {"★".repeat(item.rating)}
                <span> ({item.reviews})</span>
              </div>

              <button
                className="cart-btn"
                onClick={() => handleAdd(item)}
              >
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}