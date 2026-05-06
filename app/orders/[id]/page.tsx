"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "../../Context/cartContext";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { orders } = useCart();

  // find order
  const order = orders.find((o) => o.orderId === id);

  if (!order) {
    return <h2>Order not found</h2>;
  }

  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Details</h2>
       
       
      <h3>Order ID: {order.orderId}</h3>
      <p>Date: {order.date}</p>

      <hr />
      {/* IMAGE */}
              <img
                src={order.items[0]?.image}
                alt="product"
                className="order-img"
              />

     {orders.map((order) => (
        
  <Link key={order.orderId} href={`/orders/${order.orderId}`}>
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "15px", cursor: "pointer" }}>
      <h3>Order ID: {order.orderId}</h3>
      <p>{order.date}</p>
      <p>{order.items.length} items</p>
    </div>
  </Link>
))}
      <hr />

      <h2>Total Amount: ₹{total}</h2>
    </div>
  );
}