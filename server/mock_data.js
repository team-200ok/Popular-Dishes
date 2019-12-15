// SEEDING DB ==============================================================================================

const {
  PopularDishes,
  Restaurants,
  PopularDishesPhoto,
  connection
} = require("./model.js");
var faker = require("faker");

// seeding db with 100 restaurants & each restaurant has 10 top dishes
for (var i = 1; i < 100; i++) {
  var restaurant = {
    restaurant_name: faker.company.companyName()
  };

  Restaurants.create(restaurant, (err, data) => {
    console.log("It's seeding the restaurants table right now");
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

  if (i === 99) {
    connection.end();
  }

  var photos = [
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/tuna.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/10_JiroSushi_TooMuchFOMO_8162076064_7198734377_o_2.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/Shrimp_sushi.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/jiro-dreams-of-sushi-food-porn-thumb.0.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/tumblr_mazpatl0My1qzfo9go1_500.png",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/1472707651.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/sukiyabashi-jiro-roppongi.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/photo_04.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/images.jpeg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/LXQjNbk.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/tumblr_mazpatl0My1qzfo9go1_500.png",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/jiro-sushi.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/1472707651.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/8162045693_1ee8cf2069_z.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/images.jpeg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/sukiyabashi-jiro-roppongi.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/10_JiroSushi_TooMuchFOMO_8162076064_7198734377_o_2.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/b0c4069330976ec61902be1c7fc40e34.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/jiro1.jpg",
    "https://food-photos-yelp.s3-us-west-1.amazonaws.com/fixedw_large_4x.jpg"
  ];
  for (var j = 1; j < 11; j++) {
    var dish = {
      dish_name: faker.lorem.word(),
      dish_photo_url: photos[Math.floor(Math.random() * photos.length)],
      restaurant_id: i
    };

    PopularDishes.create(dish, (err, data) => {
      console.log("it's seeding the popular dishes table");
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });

    var random_photo_count = Math.floor(Math.random() * 10);
    for (var k = 0; k < random_photo_count; k++) {
      var photo = {
        photo_text: faker.lorem.word(),
        photo_url: photos[Math.floor(Math.random() * photos.length)],
        dish_id: j,
        restaurant_id: i
      };
      PopularDishesPhoto.create(photo, (err, data) => {
        console.log("it's seeding the photo table");
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    }
  }
}

// SELECT *
// FROM restaurants
// JOIN photos ON (restaurants.restaurant_id = photos.restaurant_id)
// JOIN popularDishes ON (restaurants.restaurant_id = popularDishes.restaurant_id)

// select restaurants.*, photos.*, popularDishes.*  from restaurants, photos, popularDishes where restaurants.restaurant_id = photos.restaurant_id
