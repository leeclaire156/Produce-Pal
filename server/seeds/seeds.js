const db = require('../config/connection');
const { User, Product, Order } = require('../models');
const userSeeds = require('./userSeeds.json');
const productSeeds = require('./productSeeds.json');
const orderSeeds = require('./orderSeeds.json');

db.once('open', async () => {
    try {
        // delete all and then create from seed
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});

        // create the seed
        await User.create(userSeeds);
        await Product.create(productSeeds);
        await Order.create(orderSeeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('SEED TESTING done!');
    process.exit(0);
});
