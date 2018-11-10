DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
items_id INTEGER (11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR (75),
department_name VARCHAR (50),
price INTEGER (10),
stock_quantity INTEGER (10),
primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Baseball Hat', 'Apparel', '20', '100');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Blender', 'Appliance', '50', '35');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Bike', 'Toys', '50', '35');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('TV', 'Appliance', '1020', '15');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Christmas Sweater', 'Fashion', '30', '15');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Baseball Hat', 'Apparel', '20', '100');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Baseball Hat', 'Apparel', '20', '100');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Scooter', 'Toys', '425', '33');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Laptop', 'Technology', '850', '28');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Blender', 'Kitchen', '369.99', '15');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Baseball Hatt', 'Apparel', '50', '100');

SELECT * FROM product.stock_quantity;