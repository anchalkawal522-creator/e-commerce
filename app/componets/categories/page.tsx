"use client";

import { categories } from "../../data/categories";
import "./cate.css";

export default function Categories() {
  return (
    <div className="categories">
      <h2 className="heading">Shop Our Top Categories</h2>

      <div className="grid">
        {categories.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{ background: item.color }}
          >
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}