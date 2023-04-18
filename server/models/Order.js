const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
    {
        orderId: {
            type: Number,
            required: true,
        },
        purchaseDate: {
            type: Date,
            default: Date.now,
            required: true,
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
        // For Order type: Pending, Paid, Ready, Closed
        orderType: {
            type: String,
            required: true,
            trim: true
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// add virtual for the aggregate using $group

// orderCount can be used for the shopping cart #?
orderSchema.
    virtual('orderCount')
    .get(function () {
    return this.orderContents.length;
})

// Initialize our Order model
const Order = model('Order', orderSchema)

module.exports = Order;
