DROP DATABASE dishes;

CREATE DATABASE popular_dishes;

USE popular_dishes;

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,  
    restaurant_name VARCHAR(200), 
);


CREATE TABLE dishes (
    id SERIAL PRIMARY KEY, 
    dish_name VARCHAR(200),
    dish_price SMALLINT,
    photo_count SMALLINT,
    review_count INTEGER,
    restaurant_id INTEGER
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR (15) NOT NULL,
    last_name VARCHAR (20),
    email VARCHAR (50),
    avatar VARCHAR (200),
    friend_count INTEGER,
    review_count INTEGER
);


CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,  
    restaurant_id INTEGER REFERENCES restaurants(id), 
    dish_id INTEGER REFERENCES dishes(id),
    review_date DATE NOT NULL,
    review_text TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE photos (
    id SERIAL PRIMARY KEY, 
    dish_id INTEGER REFERENCES dishes(id), 
    caption TEXT,
    source VARCHAR(200), 
    restaurant_id INTEGER REFERENCES restaurants(id)
);