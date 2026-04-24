"use client";

import { offers } from "../../data/offer";
import Image from "next/image";
import "./offer.css";

export default function OfferSection() {
  return (
    <div className="offer-container">
      <h1 className="offer-heading">Get Up To 70% Off</h1>

      <div className="offer-grid">
        {offers.map((item) => (
          <div key={item.id} className="offer-card">
            {/* Top Section */}
            <div
              className="offer-top"
              style={{ backgroundColor: item.bgColor }}
            >
              <div>
                <h3 className="offer-title">{item.title}</h3>
                <h1
                  className="offer-amount"
                  style={{ color: item.textColor }}
                >
                  ${item.amount}
                </h1>
              </div>

              <p className="offer-desc">{item.description}</p>
            </div>

            {/* Image */}
            <div className="offer-image">
              <Image src={item.image} alt="" fill />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}