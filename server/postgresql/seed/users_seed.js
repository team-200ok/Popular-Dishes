const faker = require('faker');
const fs = require('fs');
const path = require('path');

const writeUsers = fs.createWriteStream('server/postgresql/seed/users_data.csv');

const writeTable = (writer, encoding) => {
    console.log('writing users...')
    let i = 10000000;
    let id = 0;
    const write = () => {
        let ok = true;
        do {
            i -= 1;
            id += 1;
            let firstName = faker.name.firstName() + ',';
            let lastName = faker.name.lastName() + ',';
            let email = faker.internet.email() + ',';
            let avatar = Math.floor(Math.random() * (1000 - 1) + 1) + ',';
            let friendCount = Math.floor(Math.random() * (1000 - 0) + 0).toString() + ',';
            let reviewCount = Math.floor(Math.random() * (10000 - 0) + 0).toString();
            let data = firstName + lastName + email + avatar + friendCount + reviewCount + '\n';
            if (i === 0) {
                writer.write(data, encoding);
                console.log('done writing users')
            } else {
                ok = writer.write(data, encoding);
            }
            if (i === 500000) {
                console.log('halfway there!')
            }
        } while (i > 0 && ok);
        if (i > 0) {
            writer.once('drain', write);
        }
    }
    write();
}

module.exports.createFile = () => {
  writeTable(writeUsers, 'utf-8');
}
