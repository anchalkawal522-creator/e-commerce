"use client";

import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "../../data/navlinks";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 👉 check login status
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={40}
            height={40}
          />
        </Link>
      </div>

      {/* MENU */}
      <div className="menu">
        {navLinks.map((item, index) => (
          <Link key={index} href={item.href} className="menu-item">
            {item.name}
            {item.hasDropdown && <span className="arrow">⌄</span>}
          </Link>
        ))}
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <input type="text" placeholder="Search Product" />
        <CiSearch className="search-icon" />
      </div>

      {/* ACTIONS */}
      <div className="actions">

        {/* ACCOUNT */}
        <Link
          href={isLoggedIn ? "/profile" : "/auth/register"}
          className="icon-link"
        >
          <FaUser />
          <span>
            {isLoggedIn ? "My Account" : "Login / Register"}
          </span>
        </Link>

        {/* CART */}
        <Link href="/cart" className="icon-link">
          <FaCartPlus />
          <span>Cart</span>
        </Link>

      </div>
    </nav>
  );
}