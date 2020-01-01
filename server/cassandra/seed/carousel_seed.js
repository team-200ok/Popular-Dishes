const faker = require('faker');
const fs = require('fs');
const Uuid = require('cassandra-driver').types.Uuid;

const writeCarousel = fs.createWriteStream('server/cassandra/seed/carousel_data.csv');

const writeTable = (writer, encoding) => {
    console.log('writing carousel...')
    let i = 50000000;
    let id = -1;
    let restaurantId = 0;
    let name = faker.commerce.productName() + ',';
    const write = () => {
        let ok = true;
        do {
            i -= 1;
            id += 1;
            if (id % 5 === 0) {
                restaurantId++;
                name = faker.commerce.productName() + ',';
            }
            let restaurant = restaurantId + ',';
            let dish = faker.lorem.word() + ',';
            let price = faker.commerce.price() + ',';
            let imageId = Uuid.random() + ',';
            let source = Math.floor(Math.random() * (1000 - 1) + 1) + ',';
            let photoCount = Math.floor(Math.random() * (5 - 1) + 1) + ',';
            let reviewCount = Math.floor(Math.random() * (10 - 1) + 1).toString();
            let data = restaurant + name + dish + price + imageId + source + photoCount + reviewCount + '\n';
            if (i === 0) {
                writer.write(data, encoding);
                console.log("Paste this in cql shell: COPY popular_dishes.carousel (restaurant_id,restaurant,dish,price,image_id,image,photo_count,review_count) FROM 'server/cassandra/seed/carousel_data.csv';")
            } else {
                ok = writer.write(data, encoding);
            }
            if (i === 25000) {
                console.log('halfway there!')
            }
        } while (i > 0 && ok);
        if (i > 0) {
            writer.once('drain', write);
        }
    }
    write();
}

module.exports.createFile = () => {
  writeTable(writeCarousel, 'utf-8');
}
