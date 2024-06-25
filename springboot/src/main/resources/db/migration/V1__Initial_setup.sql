-- Users table: Stores user information.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE,
    role VARCHAR(50) NOT NULL,   -- e.g., admin, cashier, etc.
    lang_code VARCHAR(10) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table: Stores product categories.
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table: Stores information about products.
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
   -- sku VARCHAR(50) NOT NULL UNIQUE, -- Stock Keeping Unit
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    discount INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table: Stores order information.
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,  -- e.g., pending, completed, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order_Items table: Stores details about the items in each order.
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Suppliers table: Stores supplier information.
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product_Supplier table: Stores the relationship between products and suppliers.
CREATE TABLE product_supplier (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    supplier_id INTEGER REFERENCES suppliers(id)
);

-- Languages table: Stores available languages for the system.
CREATE TABLE languages (
    lang_code VARCHAR(10) PRIMARY KEY, -- e.g., en, fa, ps
    name VARCHAR(50) NOT NULL
);

-- Translations table: Stores translations for various text elements in the system.
CREATE TABLE translations (
    lang_code VARCHAR(10) REFERENCES languages(lang_code),
    table_name VARCHAR(50) NOT NULL,
    column_name VARCHAR(50) NOT NULL,
    row_id BIGINT NOT NULL,
    translation TEXT NOT NULL,
    PRIMARY KEY (lang_code, table_name, column_name, row_id)
);
