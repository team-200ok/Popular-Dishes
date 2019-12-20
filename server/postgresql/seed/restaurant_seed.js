const faker = require('faker');
const fs = require('fs');


    var titles = "id,restaurant_name,business_address,claimed,category,business_date,summary \n";
    var data = "";
    for (var i = 0; i < 100000; i++) {
        var id = i.toString() + ',';
        var name = faker.company.companyName() + ',';
        var address = faker.address.streetAddress() + ' ' + faker.address.city() + ' ' + faker.address.stateAbbr() + faker.address.zipCode() + ',';
        var claimed = Math.round(Math.random()).toString() + ',';
        var category = faker.commerce.department() + ',';
        var date = Math.round(Math.random() * (2019 - 1980) + 1980).toString() + '-0' + Math.round(Math.random() * (9 - 1) + 1).toString() + "-" + Math.round(Math.random() * (31 - 10) + 10).toString() + ',';
        var summary = faker.lorem.sentence();
        data += id+name+address+claimed+category+date+summary+'\n';
    }

    var file = titles += data;


fs.writeFile('server/postgresql/seed/restaurant_data.csv', file, (err) => {
    if (err) throw err;
    console.log('Restaurant data saved!')
})