"use client"
import "./Header.css";

import { FaPhoneAlt } from "react-icons/fa";

export default function Header() {
  return (
    <div className="top-header">
      <div className="left">
        <FaPhoneAlt />
        <span>+001234567890</span>
      </div>

      <div className="center">
        <span>Get 50% Off on Selected Items</span>
        <span className="divider">|</span>
        <a href="#">Shop Now</a>
      </div>

      <div className="right">
        <span>Eng </span>
        <span>Location </span>
      </div>
    </div>
  );
}