const db = require('../config/connection');
const { User, Produce, Sharebox } = require('../models');
const userSeeds = require('./userSeeds.json');
const produceSeeds = require('./produceSeeds.json');
const shareboxSeeds = require('./shareboxSeeds.json');

db.once('open', async () => {
    try {
        // delete all and then create from seed
        await User.deleteMany({});
        await User.create(userSeeds);
        await Produce.deleteMany({});
        await Produce.create(produceSeeds);
        await Sharebox.deleteMany({});
        await Sharebox.create(shareboxSeeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('SEED TESTING done!');
    process.exit(0);
});
