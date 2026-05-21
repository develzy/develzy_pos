-- DEVELZY POS Database Schema for Cloudflare D1

CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL, -- BASIC, BISNIS, PREMIUM
    price REAL NOT NULL,
    max_stores INTEGER DEFAULT 1,
    max_users INTEGER DEFAULT 1,
    features TEXT, -- JSON array of feature codes
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'KASIR', -- SUPER_ADMIN, ADMIN, KASIR
    subscription_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);

CREATE TABLE IF NOT EXISTS stores (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL, -- owner
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    store_id TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    store_id TEXT NOT NULL,
    category_id TEXT,
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    barcode TEXT UNIQUE,
    description TEXT,
    price REAL NOT NULL,
    cost REAL NOT NULL DEFAULT 0,
    stock INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    store_id TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    member_tier TEXT DEFAULT 'REGULAR', -- REGULAR, VIP, VVIP
    points INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    store_id TEXT NOT NULL,
    user_id TEXT NOT NULL, -- cashier
    customer_id TEXT,
    subtotal REAL NOT NULL,
    discount REAL DEFAULT 0,
    tax REAL DEFAULT 0,
    total REAL NOT NULL,
    payment_method TEXT NOT NULL, -- CASH, QRIS, TRANSFER
    status TEXT NOT NULL DEFAULT 'COMPLETED', -- PENDING, COMPLETED, CANCELLED
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS transaction_items (
    id TEXT PRIMARY KEY,
    transaction_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    subtotal REAL NOT NULL,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    transaction_id TEXT NOT NULL,
    amount REAL NOT NULL,
    method TEXT NOT NULL,
    reference_number TEXT,
    status TEXT NOT NULL DEFAULT 'SUCCESS',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);

CREATE TABLE IF NOT EXISTS feature_permissions (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    feature TEXT NOT NULL,
    is_allowed INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS logs (
    id TEXT PRIMARY KEY,
    store_id TEXT,
    user_id TEXT,
    action TEXT NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
