"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useCart } from "../../Context/cartContext";
import { productList } from "../../data/productlist";
import "./product.css";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);

  const productId = Number(params.id);
  const router = useRouter();
  const product = productList.find(
    (item) => item.id === productId
  );

  useEffect(() => {
    const shouldAdd = searchParams.get("add");

    if (shouldAdd === "true" && product && !added) {
      addToCart(product); 
      setAdded(true);
    }
  }, [searchParams, product, added, addToCart]);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
  <div className="product-container">
    
    {/* IMAGE */}
    <div className="product-image">
      <img src={product.image} alt={product.title} />
    </div>

    {/* DETAILS */}
    <div className="product-details">
      <h1 className="product-title">{product.title}</h1>
      <h3 className="product-price">${product.price}</h3>
      <p className="product-category">{product.category}</p>

      <button
        className="product-btn"
        onClick={() => {addToCart(product)
          router.push(`cart`)
        }}
        
      >
        Add to Cart
      </button>
    </div>

  </div>
);}