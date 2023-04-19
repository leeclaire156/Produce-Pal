const { User, Produce } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        produce: async () => {
            return Produce.find({});
        },
    },
    Mutation: {
        // createProduct: async (parent, args) => {
        //     const product = await Product.create(args);
        //     return product;
        // },

        addProduce: async (parent, { _id, produceId, produceName, produceType, producePrice, produceInventory, produceUnits, produceAllergens, produceAvailability, produceDescription, produceImage }) => {
            const produce = await Produce.create({ _id, produceId, produceName, produceType, producePrice, produceInventory, produceUnits, produceAllergens, produceAvailability, produceDescription, produceImage });
            return { produce };
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
