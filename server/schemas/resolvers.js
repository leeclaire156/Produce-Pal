const { User, Product } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        products: async () => {
            return await Product.find({});
        },
    },
    // Mutation: {
    //     createProduct: async (parent, args) => {
    //         const product = await Product.create(args);
    //         return product;
    //     },
    // },
};

module.exports = resolvers;
