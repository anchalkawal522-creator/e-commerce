"use client";

import { pop } from "../../data/pop";
import "./pop.css";

export default function Pop() {
  return (
    <div className="pop">
      <h2 className="pop-title">Weekly Popular Products</h2>

      <div className="pop-grid">
        {pop.map((item) => (
          <div key={item.id} className="pop-card">
            
            {/* IMAGE */}
            <div className="pop-img">
              <img src={item.image} alt={item.title} />
              <div className="wishlist">♡</div>
            </div>

            {/* CONTENT */}
            <div className="pop-content">
              <div className="pop-header">
                <h3>{item.title}</h3>
                <span>${item.price}.00</span>
              </div>

              <p className="pop-desc">{item.desc}</p>

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