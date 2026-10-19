import { Router } from 'express';
import { Restaurant } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  const { search, cuisine, sort } = req.query;
  const q = {};
  if (search) q.name = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
  if (cuisine) q.cuisine = cuisine;
  const sorts = { rating: { rating: -1 }, time: { deliveryTime: 1 }, price: { priceForTwo: 1 } };
  const list = await Restaurant.find(q).select('-menu').sort(sorts[sort] || {});
  res.json(list);
});

router.get('/:id', async (req, res) => {
  try {
    const r = await Restaurant.findById(req.params.id);
    if (!r) return res.status(404).json({ message: 'Not found' });
    res.json(r);
  } catch { res.status(400).json({ message: 'Invalid id' }); }
});

export default router;
