"use client";

import { useParams } from "next/navigation";
import { products } from "../../data/deals";

export default function ProductPage() {
  const params = useParams();

  // ✅ id comes from URL
  const product = products.find(
    (p) => p.id === Number(params.id)
  );

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} width={200} />
      <p>{product.desc}</p>
      <h3>${product.price}</h3>
    </div>
  );
}