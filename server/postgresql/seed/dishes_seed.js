const faker = require('faker');
const path = require('path');
const fs = require('fs');

    let data = "";
    for (let i = 0; i < 200000; i++) {
        let id = i + ',';
        let name = faker.lorem.words() + ',';
        let price = faker.commerce.price() + ',';
        let summary = faker.lorem.sentence() + ',';
        let photoCount = Math.floor(Math.random() * (5 - 1) + 1).toString() + ',';
        let reviewCount = Math.floor(Math.random() * (10 - 1) + 1).toString() + ',';
        let restaurant = Math.floor(Math.random() * (100000 - 1) + 1).toString();
        data += id+name+price+summary+photoCount+reviewCount+restaurant+'\n';
    }

    let file = data;
  
module.exports.write = async () => {
    fs.writeFile(path.join('server', 'postgresql', 'seed', 'dishes_data.csv'), file, (err) => {
        if (err) {
            console.log('Error seeding dish data')
        };
        console.log('Dishes data saved!');
    })
}
