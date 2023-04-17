// Contact Info can be used by other models

/* const { Schema, model } = require('mongoose');

const contactInfoSchema = new Schema({
    telephone: {
        type: Number, 
        required: true, 
        trim: true,
    },
    email: {
        type: String, 
        required: true, 
        trim: true, 
    },
    address: {
        type: addressSchema,
        required: true,
    },
});

// model const that can be used to create instances of contact info for CRUD
const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);

module.exports = contactInfoSchema, ContactInfo;
*/