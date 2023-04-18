const { User, Product } = require('../models');

const resolvers = {
    Query: {
        user: async () => {
            return User.find({});
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
