-- ====================================================================================
-- DEVELZY POS - DATABASE SCHEMA
-- ====================================================================================

-- 1. SaaS & Core Tables (Tenants/Users)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  store_name TEXT NOT NULL,
  business_type TEXT DEFAULT 'retail', -- retail, coffee_shop, laundry, restoran, barbershop, bengkel
  plan_tier TEXT DEFAULT 'BASIC', -- BASIC, BISNIS, PREMIUM
  plan_type TEXT DEFAULT 'monthly', -- monthly, permanent
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products / Inventory
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  store_id TEXT NOT NULL,
  name TEXT NOT NULL,
  sku TEXT,
  price INTEGER NOT NULL,
  cogs INTEGER,
  stock INTEGER DEFAULT 0,
  min_stock_alert INTEGER DEFAULT 0,
  category TEXT,
  status TEXT DEFAULT 'Aktif',
  image TEXT,
  is_raw_material BOOLEAN DEFAULT 0, -- For Coffee Shop / Restoran recipes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(store_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Variants & Add-ons (For Coffee Shop / Restoran)
CREATE TABLE IF NOT EXISTS product_addons (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  addon_name TEXT NOT NULL,
  additional_price INTEGER DEFAULT 0,
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 4. Customers & CRM
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  store_id TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  tier TEXT DEFAULT 'Regular',
  points INTEGER DEFAULT 0,
  last_visit TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(store_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Transactions / Orders
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  store_id TEXT NOT NULL,
  customer_id TEXT,
  invoice_number TEXT UNIQUE NOT NULL,
  total_amount INTEGER NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'Completed', -- Completed, Pending, Void
  order_type TEXT DEFAULT 'Dine In', -- Dine In, Takeaway, Delivery
  table_number TEXT, -- For Restoran/Coffee Shop
  queue_number INTEGER, -- For Antrean
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(store_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS transaction_items (
  id TEXT PRIMARY KEY,
  transaction_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  subtotal INTEGER NOT NULL,
  notes TEXT, -- Notes for kitchen/barista
  FOREIGN KEY(transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 6. Employees / Mechanics / Barbers (Commission System)
CREATE TABLE IF NOT EXISTS employees (
  id TEXT PRIMARY KEY,
  store_id TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- mechanic, barber, cashier, chef
  commission_rate REAL DEFAULT 0, -- Percentage or fixed amount
  pin_code TEXT, -- For POS login
  status TEXT DEFAULT 'Aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(store_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. Service Tracking (For Laundry / Bengkel)
CREATE TABLE IF NOT EXISTS service_jobs (
  id TEXT PRIMARY KEY,
  transaction_id TEXT NOT NULL,
  employee_id TEXT, -- Mechanic or Staff assigned
  service_status TEXT DEFAULT 'Queue', -- Queue, In Progress, Ready, Done
  vehicle_plate TEXT, -- For Bengkel
  customer_notes TEXT,
  internal_notes TEXT,
  completed_at TIMESTAMP,
  FOREIGN KEY(transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
  FOREIGN KEY(employee_id) REFERENCES employees(id) ON DELETE SET NULL
);
