"use client";

import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "../../data/navlinks";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { useSearch } from "@/app/Context/searchContext";
import { productList } from "../../data/productlist";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { search, setSearch } = useSearch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const router = useRouter();


  // ✅ Highlight Function (FINAL FIXED)
  const highlightText = (text: string, search: string) => {
    if (!search) return text;

    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span
          key={i}
          style={{
            background: "#ffe58f",
            fontWeight: "bold",
            padding: "2px 4px",
            borderRadius: "3px",
          }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // ✅ Login check
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  // ✅ Live search suggestions
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = productList.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5));
  }, [search]);

  const handleSelect = (item: any) => {
  setSearch(item.title);
  setSuggestions([]);

  // ✅ Redirect with query
  router.push(`/product/${item.id}?add=true`);
};

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
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
        <input
          type="text"
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CiSearch className="search-icon" />

        {/* ✅ DROPDOWN */}
        {suggestions.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              background: "#fff",
              border: "1px solid #ddd",
              zIndex: 999,
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            {suggestions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#fff")
                }
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />

                {/* TEXT */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px" }}>
                    {highlightText(item.title, search)}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "green",
                    }}
                  >
                    ${item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="actions">
        <Link
          href={isLoggedIn ? "/profile" : "/auth/register"}
          className="icon-link"
        >
          <FaUser />
          <span>
            {isLoggedIn ? "My Account" : "Login / Register"}
          </span>
        </Link>

        <Link href="/cart" className="icon-link">
          <FaCartPlus />
          <span>Cart</span>
        </Link>
      </div>
    </nav>
  );
}