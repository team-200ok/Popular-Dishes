const faker = require('faker');
const fs = require('fs');
const path = require('path');


    let titles = "id,dish_id,caption,source,restaurant_id \n";
    let data = "";
    for (let i = 0; i < 100000; i++) {
        let id = i + ',';
        let dish = Math.floor(Math.random() * (100000 - 1) + 1).toString() + ',';
        let caption = faker.lorem.sentence() + ',';
        let source = `https://loremflickr.com/320/240?lock=${Math.floor(Math.random() * (1000 - 1) + 1)}` + ',';
        let restaurant = Math.floor(Math.random() * (100000 - 1) + 1).toString();
        data += id+dish+caption+source+restaurant+'\n';
    }

    let file = titles + data;


fs.writeFile(path.join('server', 'postgresql', 'seed', 'photos_data.csv'), file, (err) => {
    if (err) {
        console.log('Error seeding photo data')
    };
    console.log('Photo data saved!')
})
