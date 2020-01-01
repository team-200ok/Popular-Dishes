const faker = require('faker');
const fs = require('fs');
const Uuid = require('cassandra-driver').types.Uuid;

const writeModal = fs.createWriteStream('server/cassandra/seed/modal_data.csv');

const writeTable = (writer, encoding) => {
    console.log('writing modal...')
    let i = 150000000;
    let id = -1;
    let restaurantId = 0;
    let name = faker.commerce.productName() + ',';
    let dish = faker.lorem.words() + ',';
    let price = faker.commerce.price() + ',';
    let summary = faker.lorem.sentence() + ',';
    let caption = faker.lorem.sentence() + ',';
    const write = () => {
        let ok = true;
        do {
            i -= 1;
            id += 1;
            if (id % 15 === 0) {
                restaurantId++;
                name = faker.commerce.productName() + ',';
            }
            let restaurant = restaurantId + ',';
            if (id % 3 === 0) {
                dish = faker.lorem.word() + ',';
                price = faker.commerce.price() + ',';
                summary = faker.lorem.words() + ',';
                caption = faker.lorem.words() + ',';
            }
            let firstName = faker.name.firstName() + ',';
            let lastName = faker.name.lastName() + ',';
            let imageId = Uuid.random() + ',';
            let source = Math.floor(Math.random() * (1000 - 1) + 1) + ',';
            let avatar = Math.floor(Math.random() * (1000 - 1) + 1) + ',';
            let review = faker.lorem.sentences() + ',';
            let friendCount = Math.floor(Math.random() * (1000 - 0) + 0).toString() + ',';
            let reviewCount = Math.floor(Math.random() * (10000 - 0) + 0).toString() + ',';
            let date = Math.floor(Math.random() * (2019 - 2000) + 2000).toString() + '-0' + Math.floor(Math.random() * (9 - 1) + 1).toString() + "-" + Math.floor(Math.random() * (28 - 10) + 10).toString() + ',';
            let star = Math.floor(Math.random() * (5 - 1) + 1).toString();
            let data = restaurant + name + dish + price + summary + caption + firstName + lastName + imageId + source + avatar + review + friendCount + reviewCount + date + star + '\n';
            if (i === 0) {
                writer.write(data, encoding);
                console.log("Paste this in cql shell: COPY popular_dishes.modal (restaurant_id,restaurant,dish,price,summary,caption,first_name,last_name,image_id,image,avatar,review_text,friend_count,review_count,date,star_count) FROM 'server/cassandra/seed/modal_data.csv';")
            } else {
                ok = writer.write(data, encoding);
            }
            if (i === 75000000) {
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
