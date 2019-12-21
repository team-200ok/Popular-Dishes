const faker = require('faker');
const fs = require('fs');
const path = require('path');

    let data = "";
    for (let i = 0; i < 200000; i++) {
        let id = i + ',';
        let restaurant = Math.floor(Math.random() * (100000 - 1) + 1).toString() + ',';
        let dish = Math.floor(Math.random() * (100000 - 1) + 1).toString() + ',';
        let date = Math.floor(Math.random() * (2019 - 2000) + 2000).toString() + '-0' + Math.floor(Math.random() * (9 - 1) + 1).toString() + "-" + Math.floor(Math.random() * (28 - 10) + 10).toString() + ',';
        let text = faker.lorem.sentences() + ',';
        let user = Math.floor(Math.random() * (100000 - 1) + 1).toString() + ',';
        let starCount = Math.floor(Math.random() * (5 - 1) + 1).toString();
        data += id+restaurant+dish+date+text+user+starCount+'\n';
    }

    let file = data;

module.exports.write = async () => {
    fs.writeFile(path.join('server', 'postgresql', 'seed', 'reviews_data.csv'), file, (err) => {
        if (err) {
            console.log('Error seeding review data')
        };
        console.log('Review data saved!')
    })
}
