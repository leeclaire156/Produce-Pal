/* const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        trim: true,
    },
    price: {
        type: Number, 
        get: getPrice, 
        set: setPrice, 
    },
});

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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// CREDIT for price (add to README): 
// https://stackoverflow.com/questions/13304129/how-should-i-store-a-price-in-mongoose

*/
