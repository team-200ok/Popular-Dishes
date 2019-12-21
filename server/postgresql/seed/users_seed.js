const faker = require('faker');
const fs = require('fs');
const path = require('path');

    let data = "";
    for (let i = 0; i < 200000; i++) {
        let id = i + ',';
        let firstName = faker.name.firstName() + ',';
        let lastName = faker.name.lastName() + ',';
        let email = faker.internet.email() + ',';
        let avatar = `https://loremflickr.com/320/240?lock=${Math.floor(Math.random() * (1000 - 1) + 1)}` + ',';
        let friendCount = Math.floor(Math.random() * (1000 - 0) + 0).toString() + ',';
        let reviewCount = Math.floor(Math.random() * (10000 - 0) + 0).toString();
        data += id+firstName+lastName+email+avatar+friendCount+reviewCount+'\n';
    }

    let file = data;

module.exports.write = async () => {
    fs.writeFile(path.join('server', 'postgresql', 'seed', 'users_data.csv'), file, (err) => {
        if (err) {
            console.log('Error seeding user data')
        };
        console.log('User data saved!')
    })
}
