const db = require('../config/connection');
const { User, Produce, Sharebox, Order } = require('../models');
const userSeeds = require('./userSeeds.json');
const produceSeeds = require('./produceSeeds.json');
const shareboxSeeds = require('./shareboxSeeds.json');
const orderSeeds = require('./orderSeeds.json');

db.once('open', async () => {
    try {
        // delete all and then create from seed
        await User.deleteMany({});
        await User.create(userSeeds);
        await Produce.deleteMany({});
        await Produce.create(produceSeeds);
        await Sharebox.deleteMany({});
        await Sharebox.create(shareboxSeeds);
        await Order.deleteMany({});
        await Order.create(orderSeeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('SEED TESTING done!');
    process.exit(0);
});
