"use client";
import Link from "next/link";
import { useCart } from "../Context/cartContext";
import "./cart.css";

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <div
          key={item.id + "-" + item.title}
          className="cart-item"
        >
          <img src={item.image} alt={item.title} width={80} />

          <div>
            <h3>{item.title}</h3>
            <p>${item.price}.00</p>

            <div>
              <button onClick={() => updateQty(item.id, "dec")}>
                -
              </button>

              <span> {item.qty} </span>

              <button onClick={() => updateQty(item.id, "inc")}>
                +
              </button>
            </div>

            <p>Total: ${item.price * item.qty}.00</p>

            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2>Total Amount: ${total}.00</h2>

      {cart.length > 0 && (
         <Link href="/checkout">
  <button>Proceed to Checkout</button>
</Link>
      )}
    </div>
  );
}