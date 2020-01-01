const faker = require('faker');
const fs = require('fs');
const path = require('path');

const writeRestaurants = fs.createWriteStream('server/cassandra/seed/restaurant_data.csv');

const writeTable = (writer, encoding) => {
    console.log('writing restaurants...')
    let i = 10000000;
    let id = 0;
    const write = () => {
        let ok = true;
        do {
            i -= 1;
            id += 1;
            let restaurant = id + ',';
            let name = faker.commerce.productName() + ',';
            let address = faker.address.streetAddress() + ' ' + faker.address.city() + ' ' + faker.address.stateAbbr() + faker.address.zipCode() + ',';
            let claimed = Math.round(Math.random()).toString() + ',';
            let category = faker.commerce.department() + ',';
            let date = Math.floor(Math.random() * (2019 - 1980) + 1980).toString() + '-0' + Math.floor(Math.random() * (9 - 1) + 1).toString() + "-" + Math.floor(Math.random() * (28 - 10) + 10).toString() + ',';
            let summary = faker.lorem.sentence();
            let data = restaurant + name + address + claimed + category + date + summary + '\n';
            if (i === 0) {
                writer.write(data, encoding);
                console.log("Paste this in cql shell: COPY popular_dishes.restaurants (restaurant_id,restaurant_name,business_address,claimed,category,business_date,summary) FROM 'server/cassandra/seed/restaurant_data.csv';")
            } else {
                ok = writer.write(data, encoding);
            }
            if (i === 5000) {
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