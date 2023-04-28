const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    productId: {    
        type: String, 
        default: '',
    },
    productName: {
        type: String, 
        default: '',
        trim: true,
    },
    // Default is false so produce. If true, Sharebox type chosen.
    productType: {
        type: Boolean,
        default: false,
    },
    productPrice: {
        type: Number, 
        default: '',
        // get: getPrice, 
        // set: setPrice, 
    },
    // For Sharebox: weekly, biweekly, monthly
    // For Produce: vegetable, meat, egg, dairy, fruits, herb, sweetener etc.
    productCategory: {
        type: String,
        default: '',
        trim: true
    },
    // Number in inventory of product
    productInventory: {
        type: Number, 
        default: 0,
    },
    // units example lbs, oz, ea.
    productUnits: {
        type: String, 
        default: '',
    },
    productAllergens: {
        type: String, 
        default: '',
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
        default: '',
        trim: true, 
    },
    productImage: {
        type: String,
        default: '',
    },
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
