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
