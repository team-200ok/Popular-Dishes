const faker = require('faker');
const fs = require('fs');


    var titles = "id,restaurant_id,dish_id,review_date,review_text,user_id,star_count \n";
    var data = "";
    for (var i = 0; i < 100000; i++) {
        var id = i.toString() + ',';
        var restaurant = Math.round(Math.random() * (100000 - 1) + 1).toString() + ',';
        var dish = Math.round(Math.random() * (100000 - 1) + 1).toString() + ',';
        var date = Math.round(Math.random() * (2019 - 2000) + 2000).toString() + '-0' + Math.round(Math.random() * (9 - 1) + 1).toString() + "-" + Math.round(Math.random() * (31 - 10) + 10).toString() + ',';
        var text = faker.lorem.sentences() + ',';
        var user = Math.round(Math.random() * (100000 - 1) + 1).toString() + ',';
        var starCount = Math.round(Math.random() * (5 - 1) + 1).toString();
        data += id+restaurant+dish+date+text+user+starCount+'\n';
    }

    var file = titles += data;


fs.writeFile('server/postgresql/seed/reviews_data.csv', file, (err) => {
    if (err) throw err;
    console.log('Review data saved!')
})