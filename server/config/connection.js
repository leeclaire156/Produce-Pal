// This text is to allow GitHub to recognize this file and it parent folder's existence
require('dotenv').config();

const mongoose = require('mongoose');

try {
    // added useNewUrlParser and useUnifiedTopology due to Deprecation Warnings
    // mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/localproducepal', {
    // mongoose.connect(`${process.env.MONGO_URL}`, {
    // mongoose.connect(`mongodb+srv://${process.env.ATLAS_ACCT}:${process.env.ATLAS_PWD}@${process.env.ATLAS_DB}.ad0wjug.mongodb.net/${process.env.ATLAS_DB_NAME}`, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // });
    console.log(process.env.MONGODB_URI)
    console.log(`mongodb+srv://${process.env.ATLAS_ACCT}:${process.env.ATLAS_PWD}@${process.env.ATLAS_DB}.ad0wjug.mongodb.net/${process.env.ATLAS_DB_NAME}`)
} catch (err) {
    console.log(err);
}

module.exports = mongoose.connection;
