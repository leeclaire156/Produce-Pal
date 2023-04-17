/* const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    productName: {
        type: String, 
        required: true, 
        trim: true,
    },
    // vegetable, meat, egg, dairy, fruits, etc
    productType: {
        type: String, 
        required: true, 
        trim: true,
    },
    productPrice: {
        type: Number, 
        required: true, 
        get: getPrice, 
        set: setPrice, 
    },
    productUnits: {
        type: Number, 
    },
    productAllergens: {
        type: String, 
        required: true, 
        trim: true,
    },
    productAvailability: {
        type: String, 
        required: true, 
        trim: true,
    },
    productDescription: {
        type: String, 
        required: true, 
        trim: true, 
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// Need to move to helpers file
function getPrice(num){
    return (num/100.toFixed(2);
}

function setPrice(num){
    return num*100;
}

// User enters digits and decimal in price field 
// Validation using regex

if ( req.body.price ) {
    req.assert('price', 'Enter a price (numbers only)').regex(/^\d+(\.\d{2})?$/);
}

// CREDIT for price (add to README): 
// https://stackoverflow.com/questions/13304129/how-should-i-store-a-price-in-mongoose

*/
