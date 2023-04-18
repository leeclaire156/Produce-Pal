const { Schema, model } = require('mongoose');

const shareboxSchema = new Schema({
    shareboxId: {    
        type: Number, 
        required: true, 
    },
    shareboxName: {
        type: String, 
        required: true, 
        trim: true,
    },
    // For Sharebox categories: weekly, biweekly, monthly
    shareboxCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    shareboxPrice: {
        type: Number, 
        required: true, 
        // get: getPrice, 
        // set: setPrice, 
    },
    shareboxAllergens: {
        type: String, 
        required: true, 
        trim: true,
    },
    shareboxDescription: {
        type: String, 
        trim: true, 
    },
    shareboxImage: {
        type: String,
    },
    // // in stock or out of stock
    // shareboxAvailability: {
    //     type: Boolean, 
    //     required: true, 
    //     trim: true,
    // },
    // you can put term length under description
});

const Sharebox = model('Sharebox', shareboxSchema);

module.exports = Sharebox;

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