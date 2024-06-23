-- Insert Users
INSERT INTO users (username, password, email, role, lang_code,firstname,lastname) VALUES
('admin', 'password123', 'admin@example.com', 'admin', 'en','admin',''),
('cashier1', 'password123', 'cashier1@example.com', 'cashier','fa','cashier','1');

-- Insert Categories
INSERT INTO categories (name, description) VALUES
('Beverages', 'Drinks, juices, and water'),
('Snacks', 'Chips, cookies, and other snacks');

-- Insert Products
INSERT INTO products (sku, name, description, category_id, price, quantity) VALUES
('SKU001', 'Coca Cola', 'Refreshing beverage', 1, 1.50, 100),
('SKU002', 'Pepsi', 'Refreshing beverage', 1, 1.40, 200),
('SKU003', 'Lays', 'Potato chips', 2, 2.00, 150);

-- Insert Orders
INSERT INTO orders (user_id, total_amount, status) VALUES
(2, 3.00, 'completed');

-- Insert Order Items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 2, 1.50);

-- Insert Suppliers
INSERT INTO suppliers (name, contact_info) VALUES
('Supplier A', 'Contact A'),
('Supplier B', 'Contact B');

-- Insert Product Suppliers
INSERT INTO product_supplier (product_id, supplier_id) VALUES
(1, 1),
(2, 2);

-- Insert Languages
INSERT INTO languages (lang_code, name) VALUES
('en', 'English'),
('fa', 'Persian'),
('ps', 'Pashto');

-- Insert Translations
INSERT INTO translations (lang_code, table_name, column_name, row_id, translation) VALUES
('fa', 'products', 'name', 1, 'کوکاکولا'),
('fa', 'products', 'description', 1, 'جوس تازه'),
('fa', 'categories', 'name', 1, 'نوشابه'),
('fa', 'categories', 'description', 1, 'چیپس، بریان شده');
