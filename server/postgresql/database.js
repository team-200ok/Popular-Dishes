const { Pool } = require('pg');
const fs = require('fs');


const pool = new Pool({ database: "popular_dishes" });

(async () => {
  let start = new Date().getTime();
  console.log('starting async query')
  // let start = new Date().getTime();
  console.log('seeding restaurants')
  const restaurant = await pool.query(`COPY restaurants(restaurant_name,business_address,claimed,category,business_date,summary)
    FROM '/Users/kellywillard/hrsf124/SDC/popular-dishes-docker-ready/server/postgresql/seed/restaurant_data.csv' 
    WITH (FORMAT csv);`);
  console.log('seeding dishes');
  const dishes = await pool.query(`COPY dishes(dish_name,dish_price,summary,photo_count,review_count,restaurant_id)
    FROM '/Users/kellywillard/hrsf124/SDC/popular-dishes-docker-ready/server/postgresql/seed/dishes_data.csv' 
    WITH (FORMAT csv);`);
  console.log('seeding users');
  const users = await pool.query(`COPY users(first_name,last_name,email,avatar,friend_count,review_count) 
    FROM '/Users/kellywillard/hrsf124/SDC/popular-dishes-docker-ready/server/postgresql/seed/users_data.csv' 
    WITH (FORMAT csv);`)
  console.log('seeding reviews');
  const reviews = await pool.query(`COPY reviews(restaurant_id,dish_id,review_date,review_text,caption,source,user_id,star_count) 
    FROM '/Users/kellywillard/hrsf124/SDC/popular-dishes-docker-ready/server/postgresql/seed/reviews_data.csv' 
    WITH (FORMAT csv);`)
  // console.log('seeding photos');
  // const photos = await pool.query(`COPY photos(dish_id,caption,source,restaurant_id) 
  //   FROM '/Users/kellywillard/hrsf124/SDC/popular-dishes-docker-ready/server/postgresql/seed/photos_data.csv' 
  //   WITH (FORMAT csv);`)
  let end = new Date().getTime() - start;
  console.log(`finished in ${end} milliseconds`);
  console.log('calling end')
  await pool.end()
  console.log('pool has drained')
})()