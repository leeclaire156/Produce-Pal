const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    productId: {    
        type: Number, 
        required: true, 
    },
    productName: {
        type: String, 
        required: true, 
        trim: true,
    },
    // Default is false so produce. If true, Sharebox type chosen.
    productType: {
        type: Boolean,
        // required: true,
        default: false,
    },
    productPrice: {
        type: Number, 
        required: true, 
        // get: getPrice, 
        // set: setPrice, 
    },
    // For Sharebox: weekly, biweekly, monthly
    // For Produce: vegetable, meat, egg, dairy, fruits, etc.
    productCategory: {
        type: String,
        trim: true
    },
    // Number in inventory of product
    productInventory: {
        type: Number, 
        // required: true, 
    },
    // units example lbs, oz, ea.
    productUnits: {
        type: String, 
        // required: true, 
    },
    productAllergens: {
        type: String, 
        trim: true,
    },
    // boolean defaults to true (in stock) & user/vendor can change it to false
    productAvailability: {
        type: Boolean, 
        default: true,
    },
    // open ended field in the front end
    productDescription: {
        type: String, 
        trim: true, 
    },
    productImage: {
        type: String,
        default: '',
    },
    // orders: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Order'
    //     },
    // ],
    // users: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'User'
    //     },
    // ],
});


const Product = model('Product', productSchema);

module.exports = Product;

// function getPrice(num){
//     return (num/100.toFixed(2);
// }

// function setPrice(num){
//     return num*100;
// }

// // User enters digits and decimal in price field 
// // Validation using regex

// if ( req.body.price ) {
//     req.assert('price', 'Enter a price (numbers only)').regex(/^\d+(\.\d{2})?$/);
// }
