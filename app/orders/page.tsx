"use client";

import Link from "next/link";
import { useCart } from "../Context/cartContext";
import "./order.css";

export default function OrdersPage() {
  const { orders } = useCart();

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <Link key={order.orderId} href={`/orders/${order.orderId}`}>
            <div className="order-card">
              
              {/* IMAGE */}
              <img
                src={order.items[0]?.image}
                alt="product"
                className="order-img"
              />

              <div>
                <h3>{order.orderId}</h3>
                <p>{order.date}</p>
                <p>{order.items.length} items</p>
              </div>

            </div>
          </Link>
        ))
      )}
    </div>
  );
}