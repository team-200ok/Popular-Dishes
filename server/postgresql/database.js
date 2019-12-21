const { Pool } = require('pg');
const fs = require('fs');
const restaurantData = require("./seed/restaurant_seed");
const dishData = require("./seed/dishes_seed");
const userData = require("./seed/users_seed");
const reviewData = require("./seed/reviews_seed");
const photoData = require("./seed/photos_seed");

const pool = new Pool({ database: "popular_dishes" });

(async () => {
  //WRITE FILES
  // let start = new Date().getTime();
  // console.log('writing restaurants')
  // restaurantData.createFile()
  // .then(()=> {
  //   console.log('seeding restaurants');
  //   pool.query(`COPY restaurants 
  //   FROM '/Users/kellywillard/hrsf124/SDC/popular-dishes-docker-ready/server/postgresql/seed/restaurant_data.csv' 
  //   WITH (FORMAT csv);`);
  // })
  // .then(() => {
  //   let end = new Date().getTime() - start;
  // console.log(`finished in ${end} milliseconds`);
  // console.log('calling end')
  // pool.end()
  // console.log('pool has drained')
  // })
  // .catch((err) => {
  //   console.log(err)
  // })
  let start = new Date().getTime();
  console.log('creating rest file')
  const writeOne = await restaurantData.writeTable(fs.createWriteStream('server/postgresql/seed/restaurant_data.csv'), 'utf-8');
  // const writeTwo = await dishData.write();
  // const writeThree = await userData.write();
  // const writeFour = await reviewData.write();
  // const writeFive = await photoData.write();

  //SEED DATA 
  console.log('starting async query')
  // let start = new Date().getTime();
  console.log('seeding restaurants')
  const restaurant = await pool.query(`COPY restaurants 
    FROM '/Users/kellywillard/hrsf124/SDC/popular-dishes-docker-ready/server/postgresql/seed/restaurant_data.csv' 
    WITH (FORMAT csv);`);
  // console.log('seeding dishes');
  // const dishes = await pool.query(`COPY dishes 
  //   FROM '/Users/kellywillard/hrsf124/SDC/popular-dishes-docker-ready/server/postgresql/seed/dishes_data.csv' 
  //   WITH (FORMAT csv);`);
  // console.log('seeding users');
  // const users = await pool.query(`COPY users 
  //   FROM '/Users/kellywillard/hrsf124/SDC/popular-dishes-docker-ready/server/postgresql/seed/users_data.csv' 
  //   WITH (FORMAT csv);`)
  // console.log('seeding reviews');
  // const reviews = await pool.query(`COPY reviews 
  //   FROM '/Users/kellywillard/hrsf124/SDC/popular-dishes-docker-ready/server/postgresql/seed/reviews_data.csv' 
  //   WITH (FORMAT csv);`)
  // console.log('seeding photos');
  // const photos = await pool.query(`COPY photos 
  //   FROM '/Users/kellywillard/hrsf124/SDC/popular-dishes-docker-ready/server/postgresql/seed/photos_data.csv' 
  //   WITH (FORMAT csv);`)
  let end = new Date().getTime() - start;
  console.log(`finished in ${end} milliseconds`);
  console.log('calling end')
  await pool.end()
  console.log('pool has drained')
})()