"use client";

import { brands } from "../../data/brand";
import "./brand.css";

export default function Brands() {
  return (
    <div className="brands">
      <h2 className="brands-title">Choose By Brand</h2>

      <div className="brands-grid">
        {brands.map((item) => (
          <div key={item.id} className="brand-card">

            {/* LOGO */}
            <div
              className="brand-logo"
              style={{ background: item.color }}
            >
              <img src={item.logo} alt="" />
            </div>

            {/* TEXT */}
            <div className="brand-info">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}