-- Insert Developer
INSERT OR IGNORE INTO users (id, name, email, password, role, store_name, business_type, plan_tier, plan_type, subscription_status)
VALUES ('DEV-001', 'Elzy Developer', 'elzy@developer.io', 'develzy23', 'superadmin', 'DEVELZY HQ', 'retail', 'PREMIUM', 'permanent', 'active');

-- Insert Demo
INSERT OR IGNORE INTO users (id, name, email, password, role, store_name, business_type, plan_tier, plan_type, subscription_status)
VALUES ('DEMO-001', 'Demo User', 'demo@develzy.com', 'demo123', 'admin', 'Toko Demo 14 Hari', 'retail', 'BASIC', 'monthly', 'trial_14_days');
