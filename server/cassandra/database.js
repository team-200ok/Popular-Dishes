const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], localDataCenter: 'datacenter1', keyspace:'popular_dishes'});

let carouselQuery = "COPY popular_dishes.carousel (restaurant_id,restaurant,dish,price,image_id,image,photo_count,review_count) FROM 'server/cassandra/seed/carousel_data.csv'";
let modalQuery = "COPY popular_dishes.modal (restaurant_id,restaurant,dish,price,summary,caption,first_name,last_name,image_id,image,avatar,review_text,friend_count,review_count,date,star_count) FROM 'server/cassandra/seed/modal_data.csv'";
let restaurantQuery = "COPY popular_dishes.restaurants (restaurant_id,restaurant_name,business_address,claimed,category,business_date,summary) FROM 'server/cassandra/seed/restaurant_data.csv'";


(() => {
  client.execute(carouselQuery);
  client.execute(modalQuery);
  client.execute(restaurantQuery);
})();

