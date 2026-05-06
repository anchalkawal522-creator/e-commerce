"use client";

import { useEffect, useState } from "react";
import "./delivery.css";

export default function DeliveryPage() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Preparing your order...");

  useEffect(() => {
    const steps = [
      "Preparing your order",
      "Picked up ",
      "Out for delivery",
      "Almost there ",
      "Delivered "
    ];

    let i = 0;

    const interval = setInterval(() => {
      i++;
      setProgress((prev) => prev + 25);
      setStatus(steps[i] || "Delivered");

      if (i === steps.length - 1) {
        clearInterval(interval);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="delivery-container">
      <h1 className="delivery-title"> Live Delivery Tracking</h1>

      {/* GOOGLE MAP */}
      <div className="map-container">
        <iframe
          src="https://maps.google.com/maps?q=chandigarh&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="map-frame"
        ></iframe>
      </div>

      {/* STATUS */}
      <h3 className="delivery-status">{status}</h3>

      {/* PROGRESS */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* OPTIONAL FAKE TRACK */}
      <div className="fake-map">
        <div className="home-icon"></div>
        <div
          className="truck-icon"
          style={{ left: `${progress}%` }}
        >
          
        </div>
      </div>
    </div>
  );
}