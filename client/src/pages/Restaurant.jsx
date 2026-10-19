import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api.js';
import { useCart } from '../context.jsx';

export default function Restaurant() {
  const { id } = useParams();
  const [r, setR] = useState(null);
  const [err, setErr] = useState('');
  const { add, count } = useCart();

  useEffect(() => { api('/restaurants/' + id).then(setR).catch((e) => setErr(e.message)); }, [id]);

  if (err) return <p className="error">{err}</p>;
  if (!r) return <p>Loading...</p>;

  return (
    <>
      <h1>{r.emoji} {r.name}</h1>
      <p className="muted">{r.cuisine.join(', ')} · {r.address}</p>
      <p><span className="rating">{r.rating} ★</span> · {r.deliveryTime} min</p>
      <h2>Menu</h2>
      {r.menu.map((m) => (
        <div key={m._id} className="row">
          <div>
            <span className={m.veg ? 'dot veg' : 'dot nonveg'} /> <strong>{m.name}</strong>
            <p className="muted">₹{m.price} {m.description && `· ${m.description}`}</p>
          </div>
          <button className="primary" onClick={() => add(r, m)}>ADD</button>
        </div>
      ))}
      {count > 0 && <Link to="/cart" className="floating">View cart ({count})</Link>}
    </>
  );
}
