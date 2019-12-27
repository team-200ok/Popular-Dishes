DROP KEYSPACE IF EXISTS popular_dishes;

CREATE KEYSPACE popular_dishes
    WITH REPLICATION = {
        'class': 'SimpleStrategy', 
        'replication_factor': 2
    };

USE popular_dishes;


CREATE TABLE "carousel" (
    restaurant_id int,
    restaurant varchar,
    dish varchar,
    price float,
    image_id uuid,
    image varchar,
    photo_count int,
    review_count int,
    PRIMARY KEY (restaurant_id, review_count));

CREATE TABLE "modal" (
    restaurant_id int,
    restaurant varchar,
    dish varchar,
    price float,
    summary text,
    image varchar,
    caption text,
    first_name varchar,
    last_name varchar,
    avatar varchar,
    review_text text,
    friend_count int,
    review_count int,
    date timestamp,
    star_count int,
    PRIMARY KEY (restaurant_id, date));

CREATE TABLE "restaurants" (
    restaurant_id int,  
    restaurant_name varchar,
    business_address varchar,
    claimed varchar,
    category varchar,
    business_date timestamp,
    summary varchar,
    PRIMARY KEY (restaurant_id));