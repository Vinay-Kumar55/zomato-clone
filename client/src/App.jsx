import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth, useCart } from './context.jsx';
import Home from './pages/Home.jsx';
import Restaurant from './pages/Restaurant.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import Orders from './pages/Orders.jsx';

export default function App() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  return (
    <>
      <nav className="nav">
        <Link to="/" className="logo">zomato<span>clone</span></Link>
        <div className="links">
          <Link to="/cart">Cart ({count})</Link>
          {user ? (
            <>
              <Link to="/orders">Orders</Link>
              <button onClick={logout}>Logout ({user.name.split(' ')[0]})</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
}
