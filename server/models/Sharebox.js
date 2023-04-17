/* const { Schema, model } = require('mongoose');

const shareboxSchema = new Schema({
    shareboxName: {
        type: String, 
        required: true, 
        trim: true,
    },
    // weekly, biweekly, monthly
    shareboxType: {
        type: String, 
        required: true, 
        trim: true,
    },
    shareboxPrice: {
        type: Number, 
        required: true, 
        get: getPrice, 
        set: setPrice, 
    },
    shareboxAllergens: {
        type: String, 
        required: true, 
        trim: true,
    },
    shareboxAvailability: {
        type: String, 
        required: true, 
        trim: true,
    },
    shareboxDescription: {
        type: String, 
        required: true, 
        trim: true, 
    },
});

const Sharebox = mongoose.model('Sharebox', shareboxSchema);

module.exports = Sharebox;

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
