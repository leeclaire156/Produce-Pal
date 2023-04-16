/* const { Vendor, Consumer, Product } = require('../models');

const resolvers = {
    Query: {
        vendor: async () => {
            return Vendor.find({});
        },
        consumer: async () => {
            return Consumer.find({});
        },
        product: async () => {
            return Product.find({});
        },
    },
    Mutation: {
        createProduct: async (parent, args) => {
            const product = await Product.create(args);
            return product;
        },
    },
};

module.exports = resolvers;
*/
