import { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext();
const CartCtx = createContext();
export const useAuth = () => useContext(AuthCtx);
export const useCart = () => useContext(CartCtx);

const load = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; }
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => load('auth', { user: null, token: null }));
  useEffect(() => localStorage.setItem('auth', JSON.stringify(auth)), [auth]);
  const login = (data) => setAuth(data);
  const logout = () => setAuth({ user: null, token: null });
  return <AuthCtx.Provider value={{ ...auth, login, logout }}>{children}</AuthCtx.Provider>;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => load('cart', { restaurant: null, items: [] }));
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  const add = (restaurant, item) =>
    setCart((c) => {
      // One restaurant per cart, like the real app
      const base = c.restaurant?._id === restaurant._id ? c : { restaurant: { _id: restaurant._id, name: restaurant.name }, items: [] };
      const found = base.items.find((i) => i._id === item._id);
      const items = found
        ? base.items.map((i) => (i._id === item._id ? { ...i, qty: i.qty + 1 } : i))
        : [...base.items, { ...item, qty: 1 }];
      return { ...base, items };
    });

  const change = (id, delta) =>
    setCart((c) => {
      const items = c.items.map((i) => (i._id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0);
      return items.length ? { ...c, items } : { restaurant: null, items: [] };
    });

  const clear = () => setCart({ restaurant: null, items: [] });
  const count = cart.items.reduce((s, i) => s + i.qty, 0);
  const total = cart.items.reduce((s, i) => s + i.qty * i.price, 0);

  return <CartCtx.Provider value={{ ...cart, add, change, clear, count, total }}>{children}</CartCtx.Provider>;
}
