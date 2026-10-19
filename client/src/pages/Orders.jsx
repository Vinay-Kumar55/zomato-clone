import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useAuth } from '../context.jsx';

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  useEffect(() => { api('/orders/mine', { token }).then(setOrders).catch(console.error); }, [token]);

  return (
    <>
      <h1>Your orders</h1>
      {!orders.length && <p className="muted">No orders yet.</p>}
      {orders.map((o) => (
        <div key={o._id} className="card">
          <h3>{o.restaurant?.emoji} {o.restaurant?.name} <span className="rating">{o.status}</span></h3>
          <p className="muted">{new Date(o.createdAt).toLocaleString()}</p>
          <p>{o.items.map((i) => `${i.name} × ${i.qty}`).join(', ')}</p>
          <strong>₹{o.total}</strong>
        </div>
      ))}
    </>
  );
}
