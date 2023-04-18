const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    orderId: {
        type: Number,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    orderContents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Produce'
        },
        {
            type: Schema.Types.ObjectId,
            ref: 'Sharebox'
        },
    ],
    // For Order categories: pending, paid, ready, closed
    orderCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }
});

// add virtual for the aggregate using $group

const Order = model('Order', orderSchema)

module.exports = Order;
