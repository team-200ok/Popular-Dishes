const restaurantData = require("./seed/restaurant_seed");
const dishData = require("./seed/dishes_seed");
const userData = require("./seed/users_seed");
const reviewData = require("./seed/reviews_seed");
const photoData = require("./seed/photos_seed");

(() => {
    restaurantData.createFile();
    dishData.createFile();
    userData.createFile();
    reviewData.createFile();
    // photoData.createFile();
})();

