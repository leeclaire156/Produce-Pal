const { User, Product, Order } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        products: async () => {
            return await Product.find({});
        },
        orders: async () => {
            return await Order.find({});
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
