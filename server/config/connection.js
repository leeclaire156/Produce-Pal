const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

try {
    // added useNewUrlParser and useUnifiedTopology due to Deprecation Warnings
    
    // // works for seeding locally but doesn't work with npm start
    // mongoose.connect(process.env.MONGODB_URI && 'mongodb://127.0.0.1:27017/localproducepal', {
    // works for seeding Atlas but graphql pulls locally
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/localproducepal', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (err) {
    console.log(err);
}

module.exports = mongoose.connection;