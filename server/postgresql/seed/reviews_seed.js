const faker = require('faker');
const fs = require('fs');

const writeThis = (id, increaseId, restaurantId) => {
    return (i, writer, encoding) => {
        console.log('writing reviews...')
        const write = () => {
            let ok = true;
            do {
                i -= 1;
                id += 1;
                if (id % 15 === 0) {
                    restaurantId++;
                }
                let restaurant = restaurantId + ',';
                if (id % 3 === 0) {
                    increaseId++;
                }
                let dish = increaseId + ',';
                let date = Math.floor(Math.random() * (2019 - 2000) + 2000) + '-0' + Math.floor(Math.random() * (9 - 1) + 1).toString() + "-" + Math.floor(Math.random() * (28 - 10) + 10).toString() + ',';
                let text = faker.lorem.sentence() + ',';
                let caption = faker.lorem.sentence() + ',';
                let source = Math.floor(Math.random() * (1000 - 1) + 1) + ',';
                let user = Math.floor(Math.random() * (10000 - 1) + 1) + ',';
                let starCount = Math.floor(Math.random() * (5 - 1) + 1).toString();
                let data = restaurant + dish + date + text + caption + source + user + starCount + '\n';
                if (i === 0) {
                    writer.write(data, encoding);
                    console.log('done writing reviews')
                } else {
                    ok = writer.write(data, encoding);
                }
                if (i === 75000) {
                    console.log('halfway there!')
                }
            } while (i > 0 && ok);
            if (i > 0) {
                writer.once('drain', write);
            }
        }
        write();
    }
}


module.exports.createFile = () => {
    let id = -1;
    let increaseId = 0;
    let restaurantId = 0;
    for (var j = 1; j < 21; j++) {
        const writeReviews = fs.createWriteStream(`server/postgresql/seed/reviews_data_${j}.csv`);
        writeThis(id, increaseId, restaurantId)(7500000, writeReviews, 'utf-8');
        id += 7500000;
        increaseId += 2500000;
        restaurantId += 500000;
    }
}

