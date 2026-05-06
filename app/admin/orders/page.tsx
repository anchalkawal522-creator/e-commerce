"use client";

import { useCart } from "@/app/Context/cartContext";

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useCart();

  const isAdmin = true; // ✅ change to false to test user

  if (!isAdmin) {
    return <p>Access Denied 🚫</p>;
  }

  return (
    <div>
      <h2>Admin Panel</h2>

      {orders.map((order) => (
        <div key={order.orderId}>
          <h3>{order.orderId}</h3>
          <p>Status: {order.status}</p>

          {/* ✅ Only admin sees this */}
          <button onClick={() => updateOrderStatus(order.orderId, "Shipped")}>
            Ship
          </button>

          <button onClick={() => updateOrderStatus(order.orderId, "Delivered")}>
            Deliver
          </button>
        </div>
      ))}
    </div>
  );
}