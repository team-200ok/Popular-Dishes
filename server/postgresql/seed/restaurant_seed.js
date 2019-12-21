const faker = require('faker');
const fs = require('fs');
const path = require('path');

// let data = "";
// for (let i = 0; i < 200000; i++) {
//     let id = i + ',';
//     let name = faker.commerce.productName() + ',';
//     let address = faker.address.streetAddress() + ' ' + faker.address.city() + ' ' + faker.address.stateAbbr() + faker.address.zipCode() + ',';
//     let claimed = Math.round(Math.random()).toString() + ',';
//     let category = faker.commerce.department() + ',';
//     let date = Math.floor(Math.random() * (2019 - 1980) + 1980).toString() + '-0' + Math.floor(Math.random() * (9 - 1) + 1).toString() + "-" + Math.floor(Math.random() * (28 - 10) + 10).toString() + ',';
//     let summary = faker.lorem.sentence();
//     data += id + name + address + claimed + category + date + summary + '\n';
// }

// let file = data;


// module.exports.write = async () => {
//     fs.writeFile(path.join('server', 'postgresql', 'seed', 'restaurant_data.csv'), file, (err) => {
//         if (err) {
//             console.log('Error seeding restaurant data')
//         };
//         console.log('Restaurant data saved!')
//     })
// };

const writeUsers = fs.createWriteStream('server/postgresql/seed/restaurant_data.csv');

module.exports.writeTable = async (writer, encoding) => {
    let i = 1000000;
    let id = 0;
    const write = () => {
        let ok = true;
        do {
            i -= 1;
            id += 1;
            let restId = id + ',';
            let name = faker.commerce.productName() + ',';
            let address = faker.address.streetAddress() + ' ' + faker.address.city() + ' ' + faker.address.stateAbbr() + faker.address.zipCode() + ',';
            let claimed = Math.round(Math.random()).toString() + ',';
            let category = faker.commerce.department() + ',';
            let date = Math.floor(Math.random() * (2019 - 1980) + 1980).toString() + '-0' + Math.floor(Math.random() * (9 - 1) + 1).toString() + "-" + Math.floor(Math.random() * (28 - 10) + 10).toString() + ',';
            let summary = faker.lorem.sentence();
            let data = restId + name + address + claimed + category + date + summary + '\n';
            if (i === 0) {
                writer.write(data, encoding);
            } else {
                ok = writer.write(data, encoding);
            }
        } while ( i > 0 && ok);
            if (i > 0) {
                writer.once('drain', write);
            }
        } 
        write();
    }

//    module.exports.createFile = () => {
//         return new Promise((resolve, reject) => {
//             console.log('writing...')
//             writeTable(writeUsers, 'utf-8')
//         })
//     }