const carouselData = require("./seed/carousel_seed");
const modalData = require("./seed/modal_seed");
const restaurantData = require("./seed/restaurants_seed");

(() => {
    carouselData.createFile();
    // modalData.createFile();
    // restaurantData.createFile();
})();
