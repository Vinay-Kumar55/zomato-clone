import { Router } from 'express';
import protect from '../middleware/auth.js';
import { Order, Restaurant } from '../models/index.js';

const router = Router();

router.post('/', protect, async (req, res) => {
  try {
    const { restaurantId, items, address } = req.body;
    if (!items?.length || !address) return res.status(400).json({ message: 'Items and address required' });
    const rest = await Restaurant.findById(restaurantId);
    if (!rest) return res.status(404).json({ message: 'Restaurant not found' });
    // Recompute prices from DB so the client can't tamper with them
    const priced = items.map((i) => {
      const m = rest.menu.id(i._id);
      if (!m) throw new Error('Invalid menu item');
      return { name: m.name, price: m.price, qty: Math.max(1, Number(i.qty) || 1) };
    });
    const total = priced.reduce((s, i) => s + i.price * i.qty, 0);
    const order = await Order.create({ user: req.userId, restaurant: rest._id, items: priced, total, address });
    res.status(201).json(order);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.get('/mine', protect, async (req, res) => {
  const orders = await Order.find({ user: req.userId }).populate('restaurant', 'name emoji').sort('-createdAt');
  res.json(orders);
});

export default router;
