/* const { Schema, model } = require('mongoose');


const consumerSchema = new Schema({
    consumerFirstName: {
        type: String, 
        required: true, 
        trim: true,
    },
    consumerLastName: {
        type: String, 
        required: true, 
        trim: true,
    },
    consumerContact: {
        connectInfo: contactInfoSchema,
    },
    consumerLogin: {
        userLoginInfo: userInfoSchema,
    },
});


const Consumer = mongoose.model('Consumer', consumerSchema);

module.exports = Consumer;
*/
