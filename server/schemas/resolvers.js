const { User, Produce, Sharebox, Order } = require('../models');

const resolvers = {
    Query: {
        // users: async () => {
        //     return await User.find({});
        // },
        produces: async () => {
            return await Produce.find({});
        },
    },
    // Mutation: {
    //     createProduce: async (parent, args) => {
    //         const produce = await Produce.create(args);
    //         return produce;
    //     },
    // },
};

module.exports = resolvers;
