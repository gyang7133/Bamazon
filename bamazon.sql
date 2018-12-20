-- Create the Bamazon Database
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

-- Create a Table inside of that database called products
CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (item_id)
);

-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO products(product_name, department_name, price, stock_quantity) 
  VALUES ('Apple EarPods', 'Electronics', 24.00, 100),
		 ('Dell - Inspiron 15.6" Laptop Black', 'Electronics', 799.00, 50),
		 ('Coding with JavaScript for Dummies', 'Books', 18.74, 35),
		 ('The Black Witch', 'Books', 7.99, 250),
		 ('Biolage Colorlast Shampoo For Color-Treated Hair 33.8 Fl Oz,', 'Beauty & Health', 27.00, 40),
		 ('Biolage Colorlast Conditioner For Color-Treated Hair 33.8 Fl Oz,', 'Beauty & Health', 29.00, 38),
		 ('PlayDoh Modeling Compound 10-Pack', 'Arts & Crafts Supplies', 7.98, 10),
		 ('Hasbro Scrabble Crossword Game', 'Toys & Games', 14.99, 15),
		 ('Nintendo Switch - Neon Red and Neon Blue Joy-Con', 'Electronics', 299.00, 5),
		 ('Mario Kart 8 Deluxe - Nintendo Switch', 'Toys & Games', 55.99, 35);

SELECT * FROM products;

