const faker = require('faker');
const fs = require('fs');
const path = require('path');

const writeModal = fs.createWriteStream('server/cassandra/seed/modal_data.csv');

const writeTable = (writer, encoding) => {
    console.log('writing modal...')
    let i = 100000;
    let id = 0;
    const write = () => {
        let ok = true;
        do {
            i -= 1;
            id += 1;
            let restaurant = id + ',';
            let name = faker.commerce.productName() + ',';
            let dish = faker.lorem.words() + ',';
            let price = faker.commerce.price() + ',';
            let summary = faker.lorem.sentence() + ',';
            let caption = faker.lorem.sentence() + ',';
            let firstName = faker.name.firstName() + ',';
            let lastName = faker.name.lastName() + ',';
            let avatar = `https://loremflickr.com/320/240?lock=${Math.floor(Math.random() * (1000 - 1) + 1)}` + ',';
            let review = faker.lorem.sentences() + ',';
            let friendCount = Math.floor(Math.random() * (1000 - 0) + 0).toString() + ',';
            let reviewCount = Math.floor(Math.random() * (10000 - 0) + 0).toString();
            let date = Math.floor(Math.random() * (2019 - 2000) + 2000).toString() + '-0' + Math.floor(Math.random() * (9 - 1) + 1).toString() + "-" + Math.floor(Math.random() * (28 - 10) + 10).toString() + ',';
            let star = Math.floor(Math.random() * (5 - 1) + 1).toString();
            let data = restaurant + name + dish + price + summary + caption + firstName + lastName + avatar + review + friendCount + reviewCount + date + star + '\n';
            if (i === 0) {
                writer.write(data, encoding);
                console.log('done writing modal')
            } else {
                ok = writer.write(data, encoding);
            }
            if (i === 50000) {
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
  writeTable(writeModal, 'utf-8');
}
