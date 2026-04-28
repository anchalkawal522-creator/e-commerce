"use client";

import { useState } from "react";
import { useCart } from "../Context/cartContext";
import "./checkout.css";

export default function CheckoutPage() {
  const { cart, removeFromCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ✅ proper typing
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all fields");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    alert("✅ Order Placed Successfully!");

    // ✅ clear cart properly
    cart.forEach((item) => removeFromCart(item.id));

    // clear form
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  // ✅ EMPTY CART UI
  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <h2>Checkout</h2>
        <p>Your cart is empty 🛒</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {/* 🧾 CART SUMMARY */}
      <div className="checkout-cart">
        {cart.map((item) => (
          <div key={item.id} className="checkout-item">
            <p>{item.title}</p>
            <p>
              {item.qty} x ${item.price}
            </p>
          </div>
        ))}

        <h3>Total: ${total}</h3>
      </div>

      {/* 📋 FORM */}
      <div className="checkout-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <button onClick={handleOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}