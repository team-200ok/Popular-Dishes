const faker = require('faker');
const path = require('path');
const fs = require('fs');

const writeDishes = fs.createWriteStream('server/postgresql/seed/dishes_data.csv');

const writeTable = (writer, encoding) => {
    console.log('writing dishes...')
    let i = 50000000;
    let id = -1;
    let restaurantId = 0;
    const write = () => {
        let ok = true;
        do {
            i -= 1;
            id += 1;
            let name = faker.lorem.words() + ',';
            let price = faker.commerce.price() + ',';
            let summary = faker.lorem.sentence() + ',';
            let photoCount = Math.floor(Math.random() * (5 - 1) + 1).toString() + ',';
            let reviewCount = Math.floor(Math.random() * (10 - 1) + 1).toString() + ',';
            if (id % 5 === 0) {
              restaurantId++;
            }
            let restaurant = restaurantId;
            let data = name + price + summary + photoCount + reviewCount + restaurant + '\n';
            if (i === 0) {
                writer.write(data, encoding);
                console.log('done writing dishes')
            } else {
                ok = writer.write(data, encoding);
            }
            if (i === 2500000) {
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
    writeTable(writeDishes, 'utf-8');
}
