const faker = require('faker');
const fs = require('fs');
const Uuid = require('cassandra-driver').types.Uuid;

const writeCarousel = fs.createWriteStream('server/cassandra/seed/carousel_data.csv');

const writeTable = (writer, encoding) => {
    console.log('writing carousel...')
    let i = 100000;
    let id = 0;
    const write = () => {
        let ok = true;
        do {
            i -= 1;
            id += 1;
            let restaurant = id + ',';
            let name = faker.commerce.productName() + ',';
            let dish = faker.lorem.words() + ',';
            let price = faker.commerce.price() + ',';
            let imageId = Uuid.random() + ',';
            let source = `https://loremflickr.com/320/240?lock=${Math.floor(Math.random() * (1000 - 1) + 1)}` + ',';
            let photoCount = Math.floor(Math.random() * (5 - 1) + 1).toString() + ',';
            let reviewCount = Math.floor(Math.random() * (10 - 1) + 1).toString();
            let data = restaurant + name + dish + price + imageId + source + photoCount + reviewCount + '\n';
            if (i === 0) {
                writer.write(data, encoding);
                console.log('done writing carousel')
            } else {
                ok = writer.write(data, encoding);
            }
            if (i === 50000) {
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
