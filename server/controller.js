const faker = require('faker');
const { Pool } = require('pg');

const pool = new Pool({ database: "popular_dishes" });

var id = 150000000;


module.exports = {
  PopularDishesController: {
    get: (req, res) => {
      let start = new Date().getTime();
      const query = {
        name: 'fetch-dishes',
        text: 'SELECT * FROM dishes WHERE restaurant_id = $1',
        values: [req.params.restaurant_id]
      }
      pool.query(query, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          let end = new Date().getTime() - start;
          console.log(res.rows);
          console.log("Time elapsed: ", `finished in ${end} milliseconds`)
        }
      })
    },
    create: (req, res) => {
      PopularDishes.create(req.body, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    }
  },
  PhotoController: {
    get: (req, res) => {
      let start = new Date().getTime();
      const query = {
        name: 'fetch-photos',
        text: 'SELECT (source,dish_id) FROM reviews WHERE restaurant_id = $1',
        values: [req.params.restaurant_id]
      }
      pool.query(query, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          let end = new Date().getTime() - start;
          console.log(res.rows);
          console.log("Time elapsed: ", `finished in ${end} milliseconds`)
        }
      })
    }
  },
  ReviewController: {
    get: (req, res) => {
      let start = new Date().getTime();
      const query = {
        name: 'fetch-reviews',
        text: 'SELECT * FROM reviews WHERE restaurant_id = $1 AND dish_id = $2',
        values: [req.params.restaurant_id, req.params.dish_id]
      }
      pool.query(query, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          let end = new Date().getTime() - start;
          console.log(res.rows);
          console.log("Time elapsed: ", `finished in ${end} milliseconds`)
        }
      })
    },
    post: (req, res) => {
      let start = new Date().getTime();
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const query = {
        name: 'post-reviews',
        text: `INSERT INTO reviews 
        VALUES (${id}, $1, $2, ${date}, '${faker.lorem.sentence()}', '${faker.lorem.sentence()}', 
        ${Math.floor(Math.random() * (1000 - 1) + 1)}, ${Math.floor(Math.random() * (10000 - 1) + 1)}, ${Math.floor(Math.random() * (5 - 1) + 1)})`,
        values: [req.params.restaurant_id, req.params.dish_id]
      }
      pool.query(query, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          let end = new Date().getTime() - start;
          console.log("Successfully posted!");
          console.log("Time elapsed: ", `finished in ${end} milliseconds`)
        }
      })
    }
  }
};
