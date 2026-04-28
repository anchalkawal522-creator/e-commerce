"use client";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card">
      <div className="img-box">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="price">${product.price}.00</p>

        <div className="rating">
          {"★".repeat(product.rating || 0)}
          <span> ({product.reviewCount || 0})</span>
        </div>

        <button className="cart-btn">Add to Cart</button>
      </div>
    </div>
  );
}