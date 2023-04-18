const mongoose = require('mongoose');

const { Schema } = mongoose;

// For Sharebox categories: weekly, biweekly, monthly
// For Produce categories: vegetable, meat, egg, dairy, fruits, etc.
// For Order categories: pending, paid, ready, closed

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
