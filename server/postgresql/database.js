const { Pool } = require('pg');
const path = require('path');


const pool = new Pool({ database: "popular_dishes" });

(async () => {
  let start = new Date().getTime();
  console.log('starting async query')
  // let start = new Date().getTime();
  console.log('seeding restaurants')
  const restaurant = await pool.query(`COPY restaurants(restaurant_name)
    FROM '${path.resolve('server/postgresql/seed/restaurant_data.csv')}'
    WITH (FORMAT csv);`);
  console.log('seeding dishes');
  const dishes = await pool.query(`COPY dishes(dish_name,dish_price,summary,photo_count,review_count,restaurant_id)
    FROM '${path.resolve('server/postgresql/seed/dishes_data.csv')}'
    WITH (FORMAT csv);`);
  console.log('seeding users');
  const users = await pool.query(`COPY users(first_name,last_name,email,avatar,friend_count,review_count) 
    FROM '${path.resolve('server/postgresql/seed/users_data.csv')}' 
    WITH (FORMAT csv);`)
  console.log('seeding reviews');
  const reviews = await pool.query(`COPY reviews(restaurant_id,dish_id,review_date,review_text,caption,source,user_id,star_count) 
    FROM '${path.resolve('server/postgresql/seed/reviews_data.csv')}' 
    WITH (FORMAT csv);`)
  let end = new Date().getTime() - start;
  console.log(`finished in ${end} milliseconds`);
  console.log('calling end')
  await pool.end()
  console.log('pool has drained')
})()

// //RESTAURANT
// COPY restaurants(restaurant_name) FROM '/Users/Projects/Projects/SDC/Popular-Dishes/server/postgresql/seed/restaurant_data.csv' WITH (FORMAT csv);

// //DISHES
// COPY dishes(dish_name,dish_price,summary,photo_count,review_count,restaurant_id) FROM '/Users/Projects/Projects/SDC/Popular-Dishes/server/postgresql/seed/dishes_data.csv' WITH (FORMAT csv);

// //USERS
// COPY users(first_name,last_name,email,avatar,friend_count,review_count) FROM '/Users/Projects/Projects/SDC/Popular-Dishes/server/postgresql/seed/users_data.csv' WITH (FORMAT csv);

// //REVIEWS
// COPY reviews(restaurant_id,dish_id,review_date,review_text,caption,source,user_id,star_count) FROM '/Users/Projects/Projects/SDC/Popular-Dishes/server/postgresql/seed/reviews_data_1.csv' WITH (FORMAT csv);
// COPY reviews(restaurant_id,dish_id,review_date,review_text,caption,source,user_id,star_count) FROM '/Users/Projects/Projects/SDC/Popular-Dishes/server/postgresql/seed/reviews_data_2.csv' WITH (FORMAT csv);
// COPY reviews(restaurant_id,dish_id,review_date,review_text,caption,source,user_id,star_count) FROM '/Users/Projects/Projects/SDC/Popular-Dishes/server/postgresql/seed/reviews_data_3.csv' WITH (FORMAT csv);
// COPY reviews(restaurant_id,dish_id,review_date,review_text,caption,source,user_id,star_count) FROM '/Users/Projects/Projects/SDC/Popular-Dishes/server/postgresql/seed/reviews_data_4.csv' WITH (FORMAT csv);
// COPY reviews(restaurant_id,dish_id,review_date,review_text,caption,source,user_id,star_count) FROM '/Users/Projects/Projects/SDC/Popular-Dishes/server/postgresql/seed/reviews_data_5.csv' WITH (FORMAT csv);