import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';

const CUISINES = ['North Indian', 'South Indian', 'Pizza', 'Chinese', 'Burgers', 'Biryani'];

export default function Home() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [sort, setSort] = useState('rating');
  const [err, setErr] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      const qs = new URLSearchParams({ search, cuisine, sort }).toString();
      api('/restaurants?' + qs).then(setList).catch((e) => setErr(e.message));
    }, 300); // debounce typing
    return () => clearTimeout(t);
  }, [search, cuisine, sort]);

  return (
    <>
      <h1>Order food from the best restaurants</h1>
      <div className="filters">
        <input placeholder="Search restaurants..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="rating">Top rated</option>
          <option value="time">Fastest delivery</option>
          <option value="price">Price: low to high</option>
        </select>
      </div>
      <div className="chips">
        <button className={!cuisine ? 'on' : ''} onClick={() => setCuisine('')}>All</button>
        {CUISINES.map((c) => (
          <button key={c} className={cuisine === c ? 'on' : ''} onClick={() => setCuisine(c)}>{c}</button>
        ))}
      </div>
      {err && <p className="error">{err}</p>}
      <div className="grid">
        {list.map((r) => (
          <Link key={r._id} to={`/restaurant/${r._id}`} className="card">
            <div className="emoji">{r.emoji}</div>
            <h3>{r.name}</h3>
            <p className="muted">{r.cuisine.join(', ')}</p>
            <p><span className="rating">{r.rating} ★</span> · {r.deliveryTime} min · ₹{r.priceForTwo} for two</p>
          </Link>
        ))}
        {!list.length && !err && <p className="muted">No restaurants found.</p>}
      </div>
    </>
  );
}
