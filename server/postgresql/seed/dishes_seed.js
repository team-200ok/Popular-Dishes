const faker = require('faker');
const fs = require('fs');


    var titles = "id,dish_name,dish_price,summary,photo_count,review_count,restaurant_id \n";
    var data = "";
    for (var i = 0; i < 100000; i++) {
        var id = i.toString() + ',';
        var name = faker.lorem.words() + ',';
        var price = faker.commerce.price() + ',';
        var summary = faker.lorem.sentence() + ',';
        var photoCount = Math.round(Math.random() * (5 - 1) + 1).toString() + ',';
        var reviewCount = Math.round(Math.random() * (10 - 1) + 1).toString() + ',';
        var restaurant = Math.round(Math.random() * (100000 - 1) + 1).toString();
        data += id+name+price+summary+photoCount+reviewCount+restaurant+'\n';
    }

    var file = titles += data;


fs.writeFile('server/postgresql/seed/dishes_data.csv', file, (err) => {
    if (err) throw err;
    console.log('Dishes data saved!')
})
