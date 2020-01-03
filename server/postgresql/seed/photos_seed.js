const faker = require('faker');
const fs = require('fs');
const path = require('path');

const writePhotos = fs.createWriteStream('server/postgresql/seed/photos_data.csv');

const writeTable = (writer, encoding) => {
    console.log('writing photos...')
    let i = 25000000;
    let id = -1;
    let dishId = 0;
    const write = () => {
        let ok = true;
        do {
            i -= 1;
            id += 1;
            if (id % 5 === 0) {
                dishId++
            }
            let dish = dishId + ',';
            let caption = faker.lorem.sentence() + ',';
            let source = `https://loremflickr.com/320/240?lock=${Math.floor(Math.random() * (1000 - 1) + 1)}` + ',';
            let restaurant = Math.floor(Math.random() * (1000 - 1) + 1).toString();
            let data = dish + caption + source + restaurant + '\n';
            if (i === 0) {
                writer.write(data, encoding);
                console.log('done writing photos')
            } else {
                ok = writer.write(data, encoding);
            }
            if (i === 5000) {
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
  writeTable(writePhotos, 'utf-8');
}
