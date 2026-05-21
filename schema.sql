-- Users / Accounts
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  plan TEXT DEFAULT 'Basic',
  store_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  store_id TEXT NOT NULL,
  name TEXT NOT NULL,
  sku TEXT,
  price INTEGER NOT NULL,
  cogs INTEGER,
  stock INTEGER DEFAULT 0,
  category TEXT,
  status TEXT DEFAULT 'Aktif',
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(store_id) REFERENCES users(id)
);

-- Customers
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
  FOREIGN KEY(store_id) REFERENCES users(id)
);

-- Transactions
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  store_id TEXT NOT NULL,
  customer_id TEXT,
  total_amount INTEGER NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'Completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(store_id) REFERENCES users(id),
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);

-- Transaction Items
CREATE TABLE IF NOT EXISTS transaction_items (
  id TEXT PRIMARY KEY,
  transaction_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  subtotal INTEGER NOT NULL,
  FOREIGN KEY(transaction_id) REFERENCES transactions(id),
  FOREIGN KEY(product_id) REFERENCES products(id)
);
