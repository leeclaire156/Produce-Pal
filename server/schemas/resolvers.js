const { User, Product, Order } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({})
            .populate('products')
            .populate('orders')
            .populate({
                path: 'orders',
                populate: 'products'
            });
        },
        orders: async () => {
            return await Order.find({})
            .populate('products');
        },
        products: async () => {
            return await Product.find({});
        },
    },
    Mutation: {
        // createProduct: async (parent, args) => {
        //     const product = await Product.create(args);
        //     return product;
        // },
        addProduct: async (parent, { _id, productId, productName, productType, productPrice, productCategory, productInventory, productUnits, productAllergens, productAvailability, productDescription, productImage }) => {
            const product = await Product.create({ _id, productId, productName, productType, productPrice, productCategory, productInventory, productUnits, productAllergens, productAvailability, productDescription, productImage });
            return { product };
        },
    },
};

module.exports = resolvers;
