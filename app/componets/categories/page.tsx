"use client";

import { categories } from "../../data/categories";
import "./cate.css";

export default function Categories() {
  return (
    <div className="category-section">
      <h2 className="category-heading">Shop Our Top Categories</h2>

      <div className="category-grid">
        {categories.map((item) => (
          <div
            key={item.id}
            className="category-card"
           
          >
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}