const faker = require('faker');
const fs = require('fs');


    var titles = "id,dish_id,caption,source,restaurant_id \n";
    var data = "";
    for (var i = 0; i < 100000; i++) {
        var id = i.toString() + ',';
        var dish = Math.round(Math.random() * (100000 - 1) + 1).toString() + ',';
        var caption = faker.lorem.sentence() + ',';
        var source = `https://loremflickr.com/320/240?lock=${Math.round(Math.random() * (1000 - 1) + 1)}` + ',';
        var restaurant = Math.round(Math.random() * (100000 - 1) + 1).toString();
        data += id+dish+caption+source+restaurant+'\n';
    }

    var file = titles += data;


fs.writeFile('server/postgresql/seed/photos_data.csv', file, (err) => {
    if (err) throw err;
    console.log('Photo data saved!')
})
