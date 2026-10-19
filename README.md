# Zomato Clone (MERN)
Food ordering app: browse/search restaurants, view menus, cart, JWT auth, place & track orders.

**Stack:** MongoDB, Express, React (Vite), Node.js

## Run locally
```bash
# 1. Backend
cd server && npm install
cp .env.example .env        # set MONGO_URI and JWT_SECRET
npm run seed                # loads sample restaurants
npm run dev                 # http://localhost:5000

# 2. Frontend (new terminal)
cd client && npm install
npm run dev                 # http://localhost:5173
```
## API
| Method | Route | Auth |
|---|---|---|
| POST | /api/auth/register, /api/auth/login | - |
| GET | /api/restaurants?search=&cuisine=&sort=rating | - |
| GET | /api/restaurants/:id | - |
| POST | /api/orders | yes |
| GET | /api/orders/mine | yes |
