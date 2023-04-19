const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
    {
        orderId: {
            type: Number,
        },
        purchaseDate: {
            type: Date,
            default: Date.now,
            required: true,
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
        ],
        // For Order type: Pending, Paid, Ready, Closed
        orderType: {
            type: String,
            default: '',
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
