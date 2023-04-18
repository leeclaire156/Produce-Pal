const { Schema, model } = require('mongoose');

const produceSchema = new Schema({
    produceId: {    
        type: Number, 
        required: true, 
    },
    produceName: {
        type: String, 
        required: true, 
        trim: true,
    },
    // For Produce type: vegetable, meat, egg, dairy, fruits, etc.
    produceType: {
        type: String,
        required: true,
        trim: true
    },
    producePrice: {
        type: Number, 
        required: true, 
        // get: getPrice, 
        // set: setPrice, 
    },
    // Number in inventory of produce
    produceInventory: {
        type: Number, 
        // required: true, 
    },
    // units example lbs, oz, ea.
    produceUnits: {
        type: String, 
        // required: true, 
    },
    produceAllergens: {
        type: String, 
        trim: true,
    },
    // boolean defaults to true (in stock) & user/vendor can change it to false
    produceAvailability: {
        type: Boolean, 
        default: true,
    },
    // open ended field in the front end
    produceDescription: {
        type: String, 
        trim: true, 
    },
    produceImage: {
        type: String,
    },
});


const Produce = model('Produce', produceSchema);

module.exports = Produce;

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