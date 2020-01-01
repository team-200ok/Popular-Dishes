const faker = require('faker');
const fs = require('fs');
const path = require('path');

const writeRestaurants = fs.createWriteStream('server/postgresql/seed/restaurant_data.csv');

const writeTable = (writer, encoding) => {
    console.log('writing restaurants...')
    let i = 10000000;
    let id = 0;
    const write = () => {
        let ok = true;
        do {
            i -= 1;
            id += 1;
            let name = faker.commerce.productName();
            let data = name + '\n';
            if (i === 0) {
                writer.write(data, encoding);
                console.log('done writing restaurants')
            } else {
                ok = writer.write(data, encoding);
            }
            if (i === 500000) {
                console.log('halfway there!')
            }
        } while ( i > 0 && ok);
            if (i > 0) {
                writer.once('drain', write);
            }
        } 
        write();
    }

   module.exports.createFile = () => {
        writeTable(writeRestaurants, 'utf-8');
    }