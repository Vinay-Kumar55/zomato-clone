import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export const User = model('User', new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
}, { timestamps: true }));

export const Restaurant = model('Restaurant', new Schema({
  name: { type: String, required: true },
  cuisine: [String],
  rating: { type: Number, default: 4 },
  deliveryTime: Number,
  priceForTwo: Number,
  address: String,
  emoji: { type: String, default: '🍽️' },
  menu: [{ name: String, price: Number, veg: Boolean, description: String }],
}));

export const Order = model('Order', new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{ name: String, price: Number, qty: Number }],
  total: Number,
  address: String,
  status: { type: String, default: 'Placed', enum: ['Placed', 'Preparing', 'Out for delivery', 'Delivered'] },
}, { timestamps: true }));
