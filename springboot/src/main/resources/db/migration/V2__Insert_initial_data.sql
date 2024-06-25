-- Insert Users
INSERT INTO users (email, password, role, lang_code,firstname,lastname) VALUES
('admin@example.com', '$2a$10$6ew/Mx7CgzJuAqJ0o8hvOukno6tdFTc6WQeWPSS79gv.UcXR23jSu','ADMIN', 'en','admin',''),
('user@example.com', '$2a$10$6ew/Mx7CgzJuAqJ0o8hvOukno6tdFTc6WQeWPSS79gv.UcXR23jSu', 'USER','fa','cashier','1');

-- Insert Categories
INSERT INTO categories (name, description) VALUES
('Fruits and Vegetables', 'Fresh and nutritious fruits and vegetables sourced from local farms and around the world.'),
('Grocery & Staples', 'Essential grocery items and pantry staples including grains, flours, oils, and spices.'),
('Dairy & Eggs', 'A selection of fresh dairy products and eggs, perfect for your daily needs.'),
('Beverages', 'A variety of beverages including juices, sodas, teas, coffees, and health drinks.'),
('Snacks', 'Tasty and convenient snacks ranging from chips and cookies to nuts and dried fruits.'),
('Home Care', 'Products to keep your home clean and well-maintained, including cleaning supplies and detergents.'),
('Noodles & Sauces', 'A diverse range of noodles, pasta, and flavorful sauces to complement your meals.'),
('Personal Care', 'Personal hygiene and care products, including skincare, haircare, and oral care items.'),
('Pet Care', 'Everything your pets need, from food and treats to grooming and health products.'),
('Meat & Seafood', 'Fresh and high-quality meat and seafood, including fish, poultry, and red meats.'),
('Electronics', 'A wide range of electronics and gadgets to meet your technological needs, from kitchen appliances to personal devices.');


-- Insert Products
INSERT INTO products (name, description, category_id, price, quantity) VALUES
('Coca Cola', 'Refreshing beverage', 1, 1.50, 100),
('Pepsi', 'Refreshing beverage', 1, 1.40, 200),
('Lays', 'Potato chips', 2, 2.00, 150);

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
('fa', 'categories', 'name', 1, 'میوه ها و سبزیجات'),
('fa', 'categories', 'description', 1, 'میوه ها و سبزیجات تازه و مغذی از مزارع محلی و سراسر جهان.'),
('fa', 'categories', 'name', 2, 'خواربار و اقلام اصلی'),
('fa', 'categories', 'description', 2, 'اقلام خواربار ضروری و محصولات اصلی انبار شامل غلات، آرد، روغن و ادویه جات.'),
('fa', 'categories', 'name', 3, 'لبنیات و تخم مرغ'),
('fa', 'categories', 'description', 3, 'انتخابی از محصولات لبنی تازه و تخم مرغ، مناسب برای نیازهای روزانه شما.'),
('fa', 'categories', 'name', 4, 'نوشیدنی ها'),
('fa', 'categories', 'description', 4, 'مجموعه‌ای از نوشیدنی‌ها از جمله آبمیوه‌ها، نوشابه‌ها، چای‌ها، قهوه‌ها و نوشیدنی‌های سلامتی.'),
('fa', 'categories', 'name', 5, 'تنقلات'),
('fa', 'categories', 'description', 5, 'تنقلات خوشمزه و راحت شامل چیپس، کلوچه‌ها، آجیل و میوه‌های خشک.'),
('fa', 'categories', 'name', 6, 'مراقبت از خانه'),
('fa', 'categories', 'description', 6, 'محصولات برای نگهداری و تمیز کردن خانه شما، از جمله لوازم تمیز کننده و مواد شوینده.'),
('fa', 'categories', 'name', 7, 'رشته ها و سس ها'),
('fa', 'categories', 'description', 7, 'مجموعه‌ای متنوع از رشته‌ها، پاستاها و سس‌های خوشمزه برای تکمیل وعده‌های غذایی شما.'),
('fa', 'categories', 'name', 8, 'مراقبت شخصی'),
('fa', 'categories', 'description', 8, 'محصولات بهداشتی و مراقبتی شخصی، شامل مراقبت از پوست، مراقبت از مو و محصولات بهداشت دهان.'),
('fa', 'categories', 'name', 9, 'مراقبت از حیوانات خانگی'),
('fa', 'categories', 'description', 9, 'همه چیزهایی که حیوانات خانگی شما نیاز دارند، از غذا و تشویقی‌ها تا محصولات بهداشتی و سلامتی.'),
('fa', 'categories', 'name', 10, 'گوشت و غذاهای دریایی'),
('fa', 'categories', 'description', 10, 'گوشت و غذاهای دریایی تازه و با کیفیت بالا، شامل ماهی، مرغ و گوشت قرمز.'),
('fa', 'categories', 'name', 11, 'الکترونیک'),
('fa', 'categories', 'description', 11, 'مجموعه‌ای گسترده از الکترونیک و دستگاه‌های گجت برای برآوردن نیازهای تکنولوژیکی شما، از لوازم خانگی تا دستگاه‌های شخصی.');

