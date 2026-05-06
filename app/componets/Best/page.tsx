"use client";

import { useState } from "react";
import { categoriesList } from "../../data/categoriesList";
import { productList } from "../../data/productlist";
import ProductCard from "../productCard";
import { useWishlist } from "../../Context/wishlistContext";
import "./best.css";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
};

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { addToWishlist, wishlist } = useWishlist();

  const filteredProducts: Product[] =
    selectedCategory === "All"
      ? productList
      : productList.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="container">
      <h2>Today's Best Deals For You!</h2>

      {/* CATEGORY FILTER */}
      <div className="categories">
        {categoriesList.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={
              selectedCategory === category.name ? "active" : ""
            }
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid">
        {filteredProducts.map((productItem) => {
          const isWishlisted = wishlist.some(
            (item: any) => item.id === productItem.id
          );

          return (
            <div
              key={productItem.id}
              style={{ position: "relative" }}
            >
              {/* WISHLIST ICON */}
              <div
                onClick={() => {
                  if (!isWishlisted) {
                    addToWishlist(productItem);
                  }
                }}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                  fontSize: "18px",
                  zIndex: 2
                }}
              >
                {isWishlisted ? "❤️" : "🤍"}
              </div>

              {/* PRODUCT CARD */}
              <ProductCard product={productItem} />
            </div>
          );
        })}
      </div>
    </div>
  );
}