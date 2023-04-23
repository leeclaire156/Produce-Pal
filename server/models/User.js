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
    address: {
        type: String,
        default: '',
        trim: true,
    },
    biography: {
        type: String,
        default: '',
        trim: true,
    },
    phone: {
        type: String,
        default: '',
        trim: true,
    },
    userImage: {
        type: String,
        default: '',
    },
    memberships: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
    sales: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        },
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        },
    ],

    // IF vendorStatus is false (default) -> buyer. If true -> both buyer and farmer
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
    // Users who are also selling will have objects of their produce & sharebox
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
    ],
    pickupLocation: {
        type: String,
        default: '',
        trim: true,
    },
    vendorTelephone: {
        type: String,
        default: '',
        trim: true,
    },
    vendorAddress: {
        type: String,
        default: '',
        trim: true,
    },
    vendorImage: {
        type: String,
        default: '',
    },
});

// TO DO: virtuals for concat address

// // set up pre-save middleware to create password, UNCOMMENT 105-117 for logging in and out
// userSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('password')) {
//         const saltRounds = 10;
//         this.password = await bcrypt.hash(this.password, saltRounds);
//     }

//     next();
// });

// // // compare the incoming password with the hashed password
// userSchema.methods.isCorrectPassword = async function (password) {
//     return bcrypt.compare(password, this.password);
// };

const User = model('User', userSchema);

module.exports = User;