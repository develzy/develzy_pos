-- Insert Users (Developer and Various Plans)
INSERT OR IGNORE INTO users (id, name, email, password, role, plan, store_name)
VALUES 
  ('DEV-001', 'Developer Develzy', 'dev@develzy.com', 'developer123', 'superadmin', 'Enterprise', 'DEVELZY SYSTEM'),
  ('USR-PREMIUM', 'Toko Premium', 'premium@develzy.com', 'premium123', 'admin', 'Premium', 'DEVELZY Premium Store'),
  ('USR-BISNIS', 'Toko Bisnis', 'bisnis@develzy.com', 'bisnis123', 'admin', 'Bisnis', 'DEVELZY Bisnis Store'),
  ('USR-BASIC', 'Toko Basic', 'basic@develzy.com', 'basic123', 'admin', 'Basic', 'DEVELZY Basic Store');
-- Insert Dummy Products
INSERT OR IGNORE INTO products (id, store_id, name, sku, price, cogs, stock, category, status, image)
VALUES 
  ('PRD-001', 'DEV-001', 'Kopi Kenangan Mantan', 'KMN-01', 18000, 12000, 45, 'Minuman', 'Aktif', 'https://images.unsplash.com/photo-1550133730-695473e544be?w=100&q=80'),
  ('PRD-002', 'DEV-001', 'Mie Goreng Spesial', 'MGS-01', 25000, 15000, 20, 'Makanan', 'Aktif', 'https://images.unsplash.com/photo-1612929633738-8fe01f7467c9?w=100&q=80'),
  ('PRD-003', 'DEV-001', 'Es Teh Manis', 'ETM-01', 5000, 2000, 150, 'Minuman', 'Aktif', 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=100&q=80'),
  ('PRD-004', 'DEV-001', 'Kentang Goreng', 'KTG-01', 15000, 8000, 0, 'Snack', 'Habis', 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=100&q=80'),
  ('PRD-005', 'DEV-001', 'Nasi Goreng Gila', 'NGG-01', 28000, 18000, 12, 'Makanan', 'Aktif', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&q=80');

-- Insert Dummy Customers
INSERT OR IGNORE INTO customers (id, store_id, name, phone, email, tier, points)
VALUES
  ('CUST-001', 'DEV-001', 'Budi Santoso', '0812-3456-7890', 'budi@email.com', 'VIP', 1250),
  ('CUST-002', 'DEV-001', 'Siti Aminah', '0856-7890-1234', 'siti.a@email.com', 'Regular', 120),
  ('CUST-003', 'DEV-001', 'Agus Prasetyo', '0811-2233-4455', 'agus.pras@email.com', 'VVIP', 5400);
