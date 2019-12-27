DROP DATABASE IF EXISTS popular_dishes;

CREATE DATABASE popular_dishes;

\c popular_dishes;

DROP TABLE IF EXISTS restaurants, dishes, users, reviews, photos;

CREATE TABLE restaurants (
    id BIGSERIAL PRIMARY KEY,  
    restaurant_name VARCHAR(200) NOT NULL,
    business_address VARCHAR(200) NOT NULL,
    claimed BOOLEAN DEFAULT false,
    category VARCHAR(20) NOT NULL,
    business_date DATE NOT NULL,
    summary VARCHAR(200) NOT NULL
);


CREATE TABLE dishes (
    id BIGSERIAL PRIMARY KEY, 
    dish_name VARCHAR(50),
    dish_price DECIMAL NOT NULL,
    summary VARCHAR(200),
    photo_count INTEGER DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    restaurant_id INTEGER REFERENCES restaurants(id)
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR (15) NOT NULL,
    last_name VARCHAR (20),
    email VARCHAR (50) NOT NULL,
    avatar VARCHAR (200) DEFAULT 'https://loremflickr.com/320/240',
    friend_count INTEGER DEFAULT 0,
    review_count INTEGER DEFAULT 0
);


CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,  
    restaurant_id INTEGER REFERENCES restaurants(id), 
    dish_id INTEGER REFERENCES dishes(id),
    review_date DATE NOT NULL,
    review_text TEXT NOT NULL,
    caption TEXT,
    source VARCHAR(200) DEFAULT 'https://loremflickr.com/320/240', 
    user_id INTEGER REFERENCES users(id),
    star_count SMALLINT NOT NULL
);

-- CREATE TABLE photos (
--     id BIGSERIAL PRIMARY KEY, 
--     dish_id INTEGER REFERENCES dishes(id), 
--     caption TEXT,
--     source VARCHAR(200) DEFAULT 'https://loremflickr.com/320/240', 
--     restaurant_id INTEGER REFERENCES restaurants(id)
-- );