// Contact Info can be used by other models

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
        type: Number,
        default: '',
        trim: true,
    },
});

// TO DO: virtuals for concat

const Address = model('Address', addressSchema);

module.exports = Address;
