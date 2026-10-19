import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const router = Router();
const sign = (u) => ({
  token: jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: '7d' }),
  user: { id: u._id, name: u.name, email: u.email },
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    res.status(201).json(sign(user));
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(400).json({ message: 'Invalid credentials' });
    res.json(sign(user));
  } catch (e) { res.status(500).json({ message: e.message }); }
});

export default router;
