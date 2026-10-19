import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth, useCart } from '../context.jsx';

export default function Cart() {
  const { restaurant, items, change, clear, total } = useCart();
  const { token } = useAuth();
  const [address, setAddress] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  if (!items.length) return <p>Your cart is empty. <Link to="/">Browse restaurants</Link></p>;

  const placeOrder = async () => {
    if (!token) return nav('/login');
    try {
      await api('/orders', { method: 'POST', token, body: { restaurantId: restaurant._id, items, address } });
      clear();
      nav('/orders');
    } catch (e) { setErr(e.message); }
  };

  return (
    <>
      <h1>Your cart · {restaurant.name}</h1>
      {items.map((i) => (
        <div key={i._id} className="row">
          <div><strong>{i.name}</strong><p className="muted">₹{i.price}</p></div>
          <div className="qty">
            <button onClick={() => change(i._id, -1)}>−</button>
            <span>{i.qty}</span>
            <button onClick={() => change(i._id, 1)}>+</button>
          </div>
          <strong>₹{i.price * i.qty}</strong>
        </div>
      ))}
      <h2>Total: ₹{total}</h2>
      <textarea placeholder="Delivery address" value={address} onChange={(e) => setAddress(e.target.value)} />
      {err && <p className="error">{err}</p>}
      <button className="primary" onClick={placeOrder}>Place order</button>{' '}
      <button onClick={clear}>Clear cart</button>
    </>
  );
}
