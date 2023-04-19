const { Schema, model } = require('mongoose');

const storeSchema = new Schema(
    {
        storeId: {
            type: Number,
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// add virtual for ...

// Initialize our Order model
const Store = model('Store', storeSchema)

module.exports = Store;
