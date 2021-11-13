CREATE DATABASE company;
-- USE company;

CREATE TABLE office(
	id int AUTO_INCREMENT NOT NULL,
    office_code varchar(100) NOT NULL,
    address varchar(200) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
	id int AUTO_INCREMENT NOT NULL,
    name varchar(200) NOT NULL,
    address  varchar(200) NOT NULL,
    salary decimal(10,2) NOT NULL,
    registered date,
    updated date,
    status tinyint DEFAULT 1,
    id_office int REFERENCES office(id),
    PRIMARY KEY (id)
);