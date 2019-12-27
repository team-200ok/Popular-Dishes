const faker = require('faker');
const fs = require('fs');
const path = require('path');

const writeReviews = fs.createWriteStream('server/postgresql/seed/reviews_data.csv');

const writeTable = (writer, encoding) => {
    console.log('writing reviews...')
    let i = 250000000;
    let id = -1;
    let increaseId = 0;
    let restaurantId = 0;
    const write = () => {
        let ok = true;
        do {
            i -= 1;
            id += 1;
            if (id % 25 === 0) {
                restaurantId++;
            }
            let restaurant = restaurantId + ',';
            if (id % 5 === 0) {
                increaseId++;
            }
            let dish = increaseId + ',';
            let date = Math.floor(Math.random() * (2019 - 2000) + 2000) + '-0' + Math.floor(Math.random() * (9 - 1) + 1).toString() + "-" + Math.floor(Math.random() * (28 - 10) + 10).toString() + ',';
            let text = faker.lorem.sentences() + ',';
            let caption = faker.lorem.sentence() + ',';
            let source = `https://loremflickr.com/320/240?lock=${Math.floor(Math.random() * (1000 - 1) + 1)}` + ',';
            let user = Math.floor(Math.random() * (1000000 - 1) + 1) + ',';
            let starCount = Math.floor(Math.random() * (5 - 1) + 1).toString();
            let data = restaurant + dish + date + text + caption + source + user + starCount + '\n';
            if (i === 0) {
                writer.write(data, encoding);
                console.log('done writing reviews')
            } else {
                ok = writer.write(data, encoding);
            }
            if (i === 12500000) {
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
  writeTable(writeReviews, 'utf-8');
}

