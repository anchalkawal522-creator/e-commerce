"use client";

import { products } from "../../data/deals";
import "./deals.css";
import { useCart } from "../../Context/cartContext";
import { useRouter } from "next/navigation";

export default function Deals() {
  const { addToCart } = useCart();
  const router= useRouter();

  const handleAdd = (item: any) => {
    addToCart(item);
        setTimeout(() => {
      router.push(`cart`);
    }, 200);
  };

  return (
    <div className="deals">
      <h2 className="deals-title">Today's Best Deals For You!</h2>

      <div className="deals-grid">
        {products?.map((item) => (
          <div key={item.id} className="deal-card">
            
            <div className="deal-img">
              <img src={item.image} alt={item.title} />
              <div className="wishlist">♡</div>
            </div>

            <div className="deal-content">
              <div className="deal-header">
                <h3>{item.title}</h3>
                <span>${item.price}.00</span>
              </div>

              <p className="deal-desc">{item.desc}</p>

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