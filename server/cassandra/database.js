const cassandra = require('cassandra-driver');

const client = new cassandra.Client({keyspace:'popular_dishes'});

let query = "COPY popular_dishes.carousel (restaurant_id,restaurant,dish,price,image_id,image,photo_count,review_count) FROM 'server/cassandra/seed/carousel_data.csv'"