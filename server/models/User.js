const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');
const Order = require('./Order');

const userSchema = new Schema({
    // everyone starts off as a Consumer
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    orders: [Order.schema],
    
    // IF vendorStatus is true for boolean, then additional fields below can be edited in the front end
    vendorStatus: {
        type: Boolean,
        default: false,
    },
    vendorName: {
        type: String, 
        default: '',
        trim: true,
    },
    vendorDescription: {
        type: String, 
        default: '',
        trim: true, 
    },
    pickupLocation: {
        type: String, 
        default: '',
        trim: true, 
    },
    vendorTelephone: {
        type: Number, 
        default: '',
        trim: true,
    },
    vendorAddress: {
        type: addressSchema,
        default: '',
    },
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;