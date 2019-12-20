const faker = require('faker');
const fs = require('fs');
const path = require('path');


    let titles = "id,restaurant_name,business_address,claimed,category,business_date,summary \n";
    let data = "";
    for (let i = 0; i < 100000; i++) {
        let id = i + ',';
        let name = faker.company.companyName() + ',';
        let address = faker.address.streetAddress() + ' ' + faker.address.city() + ' ' + faker.address.stateAbbr() + faker.address.zipCode() + ',';
        let claimed = Math.round(Math.random()).toString() + ',';
        let category = faker.commerce.department() + ',';
        let date = Math.floor(Math.random() * (2019 - 1980) + 1980).toString() + '-0' + Math.floor(Math.random() * (9 - 1) + 1).toString() + "-" + Math.floor(Math.random() * (31 - 10) + 10).toString() + ',';
        let summary = faker.lorem.sentence();
        data += id+name+address+claimed+category+date+summary+'\n';
    }

    let file = titles + data;


fs.writeFile(path.join('server', 'postgresql', 'seed', 'restaurant_data.csv'), file, (err) => {
    if (err) {
        console.log('Error seeding restaurant data')
    };
    console.log('Restaurant data saved!')
})