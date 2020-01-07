const newRelic = require('newrelic');
const faker = require('faker');
const { Pool } = require('pg');

const pool = new Pool({ database: "popular_dishes" });

var id = 150000000;


module.exports = {
  PopularDishesController: {
    get: (req, res) => {
      const query = {
        name: 'fetch-dishes',
        text: 'SELECT * FROM dishes WHERE restaurant_id = $1',
        values: [req.params.restaurant_id]
      }
      pool.query(query, (err, result) => {
        if (err) {
          console.log(err.stack)
        } else {
          res.send(result.rows);
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
      const query = {
        name: 'fetch-photos',
        text: 'SELECT (source,dish_id) FROM reviews WHERE restaurant_id = $1',
        values: [req.params.restaurant_id]
      }
      pool.query(query, (err, result) => {
        if (err) {
          console.log(err.stack)
        } else {
          res.send(result.rows);
        }
      })
    }
  },
  ReviewController: {
    get: (req, res) => {
      const query = {
        name: 'fetch-reviews',
        // text: 'SELECT * FROM reviews WHERE restaurant_id = $1 AND dish_id = $2',
        text: 'SELECT r.*, u.* FROM reviews r INNER JOIN users u ON r.user_id = u.id WHERE r.restaurant_id = $1 AND r.dish_id = $2',
        values: [req.params.restaurant_id, req.params.dish_id]
      }
      pool.query(query, (err, result) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(result.rows);
          res.send(result.rows);
        }
      })
    },
    post: (req, res) => {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const query = {
        name: 'post-reviews',
        text: `INSERT INTO reviews (restaurant_id,dish_id,review_date,review_text,caption,source,user_id,star_count)  
        VALUES ($1, $2, '${date}', '${faker.lorem.sentence()}', '${faker.lorem.sentence()}', 
        ${Math.floor(Math.random() * (1000 - 1) + 1)}, ${Math.floor(Math.random() * (10000 - 1) + 1)}, ${Math.floor(Math.random() * (5 - 1) + 1)})`,
        values: [req.params.restaurant_id, req.params.dish_id]
      }
      pool.query(query, (err, result) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log("Successfully posted!");
          res.end();
        }
      })
    }
  }
};
