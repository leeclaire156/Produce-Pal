/* const { Schema, model } = require('mongoose');


const vendorSchema = new Schema({
    farmName: {
        type: String, 
        required: true, 
        trim: true,
    },
    farmerFirstName: {
        type: String, 
        required: true, 
        trim: true,
    },
    farmerLastName: {
        type: String, 
        required: true, 
        trim: true,
    },
    description: {
        type: String, 
        required: true, 
        trim: true, 
    },
    vendorContact: {
        connectInfo: ContactInfoSchema,
    },
});


const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
*/

// ADD TO README CREDIT: https://stackoverflow.com/questions/39596625/nested-objects-in-mongoose-schemas
   // Used for tutorial on contact info schema so multiple models can utilize - recycle same code
