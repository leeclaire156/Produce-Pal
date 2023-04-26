const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
    street: {
        type: String,
        default: '',
        trim: true,
    },
    city: {
        type: String,
        default: '',
        trim: true,
    },
    state: {
        type: String,
        default: '',
        trim: true,
    }, 
    zipcode: {
        type: String,
        default: '',
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