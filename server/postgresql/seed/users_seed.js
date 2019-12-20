const faker = require('faker');
const fs = require('fs');


    var titles = "id,first_name,last_price,email,avatar,friend_count,review_count \n";
    var data = "";
    for (var i = 0; i < 100000; i++) {
        var id = i.toString() + ',';
        var firstName = faker.name.firstName() + ',';
        var lastName = faker.name.lastName() + ',';
        var email = faker.internet.email() + ',';
        var avatar = `https://loremflickr.com/320/240?lock=${Math.round(Math.random() * (1000 - 1) + 1)}` + ',';
        var friendCount = Math.round(Math.random() * (1000 - 0) + 0).toString() + ',';
        var reviewCount = Math.round(Math.random() * (10000 - 0) + 0).toString();
        data += id+firstName+lastName+email+avatar+friendCount+reviewCount+'\n';
    }

    var file = titles += data;


fs.writeFile('server/postgresql/seed/users_data.csv', file, (err) => {
    if (err) throw err;
    console.log('User data saved!')
})
