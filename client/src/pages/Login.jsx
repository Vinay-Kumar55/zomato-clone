import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../context.jsx';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await api(isRegister ? '/auth/register' : '/auth/login', { method: 'POST', body: form });
      login(data);
      nav('/');
    } catch (e) { setErr(e.message); }
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <form onSubmit={submit} className="form">
      <h1>{isRegister ? 'Sign up' : 'Login'}</h1>
      {isRegister && <input placeholder="Name" value={form.name} onChange={set('name')} required />}
      <input type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
      <input type="password" placeholder="Password" value={form.password} onChange={set('password')} required />
      {err && <p className="error">{err}</p>}
      <button className="primary">{isRegister ? 'Create account' : 'Login'}</button>
      <p className="muted link" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'New here? Create an account'}
      </p>
    </form>
  );
}
