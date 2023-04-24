const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
    street: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    }, 
    zipcode: {
        type: String,
        trim: true,
    }
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

// Initialize our Address model
const Address = model('Address', addressSchema)

module.exports = Address;