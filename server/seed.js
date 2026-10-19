import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Restaurant } from './models/index.js';
dotenv.config();

const m = (name, price, veg, description = '') => ({ name, price, veg, description });
const data = [
  { name: 'Spice Garden', cuisine: ['North Indian', 'Biryani'], rating: 4.5, deliveryTime: 30, priceForTwo: 600, address: 'Banjara Hills, Hyderabad', emoji: '🍛',
    menu: [m('Chicken Biryani', 280, false, 'Hyderabadi dum style'), m('Paneer Butter Masala', 240, true), m('Butter Naan', 40, true), m('Veg Biryani', 220, true)] },
  { name: 'Pizza Palace', cuisine: ['Pizza', 'Italian'], rating: 4.2, deliveryTime: 25, priceForTwo: 500, address: 'Madhapur, Hyderabad', emoji: '🍕',
    menu: [m('Margherita', 199, true), m('Pepperoni', 329, false), m('Garlic Bread', 99, true), m('Pasta Alfredo', 249, true)] },
  { name: 'Dragon Wok', cuisine: ['Chinese'], rating: 4.0, deliveryTime: 35, priceForTwo: 450, address: 'Ameerpet, Hyderabad', emoji: '🥡',
    menu: [m('Veg Hakka Noodles', 160, true), m('Chicken Manchurian', 220, false), m('Fried Rice', 170, true)] },
  { name: 'Burger Barn', cuisine: ['Burgers', 'Fast Food'], rating: 4.3, deliveryTime: 20, priceForTwo: 350, address: 'Kukatpally, Hyderabad', emoji: '🍔',
    menu: [m('Aloo Tikki Burger', 89, true), m('Chicken Zinger', 169, false), m('French Fries', 79, true), m('Cold Coffee', 99, true)] },
  { name: 'Dosa Corner', cuisine: ['South Indian'], rating: 4.6, deliveryTime: 22, priceForTwo: 250, address: 'Secunderabad', emoji: '🥞',
    menu: [m('Masala Dosa', 90, true), m('Idli (3 pcs)', 60, true), m('Pesarattu', 80, true), m('Filter Coffee', 30, true)] },
];

await mongoose.connect(process.env.MONGO_URI);
await Restaurant.deleteMany();
await Restaurant.insertMany(data);
console.log('Seeded', data.length, 'restaurants');
process.exit();
