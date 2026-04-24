"use client";
import "./offban.css";

export default function Offer() {
  return (
    <div className="offerban-container">
      {/* Background Image */}
      <img
        src="/images/offban.png"
        alt="offerban-banner"
        className="offerban-bg"
      />

      {/* Overlay Card */}
      <div className="offerban-card">
        <h1 className="offerban-title">
          Get 5% Cash <br /> Back On $200
        </h1>

        <p className="offerban-description">
          Shopping is a bit of a relaxing hobby for me, which is
          sometimes troubling for the bank balance.
        </p>

        <button className="offerban-button">Learn More</button>
      </div>
    </div>
  );
}