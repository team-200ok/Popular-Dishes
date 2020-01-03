// SERVER ENTRY POINT ============================================================================

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const newRelic = require('newrelic');
const { PopularDishesController, PhotoController, ReviewController} = require("./controller.js");
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES ========================================================================================

// get the top dishes of a restaurant
app.get("/api/popular-dishes/:restaurant_id", function(req, res) {
  PopularDishesController.get(req, res);
});

// get photos and caption
app.get("/api/photos/:restaurant_id", function(req, res) {
  PhotoController.get(req, res);
});

// get reviews associated with dish
app.get("/api/review/:restaurant_id/:dish_id", function(req, res) {
  ReviewController.get(req,res);
})

// get users associated with r

// updates review associated with dish
app.put("/api/review/:restaurant_id/:dish_id", function(req, res) {

})

// uploads new review
app.post("/api/review/:restaurant_id/:dish_id", function(req, res) {
  ReviewController.post(req,res);
})


//deletes review associated with dish
app.delete("/api/review/:restaurant_id/:dish_id", function(req,res) {
  
})

// serve static files
app.use("/:restaurant_id", express.static("./client/dist"));

// // get photos and caption
// app.get("/:restaurant_id", function(req, res) {
//   PopularDishesController.get(req, res);
// });

app.listen(port, () => console.log(`Homiezz, listening on port ${port}`));
