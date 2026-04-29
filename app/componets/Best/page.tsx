"use client";

import { useState } from "react";
import { categoriesList } from "../../data/categoriesList";
import { productList } from "../../data/productlist";
import ProductCard from "../productCard";

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

  const filteredProducts: Product[] =
    selectedCategory === "All"
      ? productList
      : productList.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="container">
      <h2>Today's Best Deals For You!</h2>

      <div className="categories">
        {categoriesList.map((category) => (
  <button
    key={category.id}
    onClick={() => setSelectedCategory(category.name)}
    className={selectedCategory === category.name ? "active" : ""}
  >
    {category.name} 
  </button>
))}
      </div>

      <div className="grid">
        {filteredProducts.map((productItem) => (
          <ProductCard key={productItem.id} product={productItem} />
        ))}
      </div>
    </div>
  );
}