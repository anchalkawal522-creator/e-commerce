"use client";

import { products } from "../../data/deals";
import "./deals.css";

export default function Deals() {
  return (
    <div className="deals">
      <h2 className="deals-title">Todays Best Deals For You!</h2>

      <div className="deals-grid">
        {products.map((item) => (
          <div key={item.id} className="deal-card">
            
            {/* IMAGE */}
            <div className="deal-img">
              <img src={item.image} alt={item.title} />
              <div className="wishlist">♡</div>
            </div>

            {/* CONTENT */}
            <div className="deal-content">
              <div className="deal-header">
                <h3>{item.title}</h3>
                <span>${item.price}.00</span>
              </div>

              <p className="deal-desc">{item.desc}</p>

              {/* RATING */}
              <div className="rating">
                {"★".repeat(item.rating)}
                <span> ({item.reviews})</span>
              </div>

              <button className="cart-btn">Add to Cart</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}