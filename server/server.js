import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import restaurantRoutes from './routes/restaurants.js';
import orderRoutes from './routes/orders.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running')))
  .catch((e) => console.error('DB error:', e.message));
