const { User, Produce, Sharebox, Order } = require('../models');

const resolvers = {
    Query: {
        user: async () => {
            return User.find({});
        },
        produce: async () => {
            return Produce.find({});
        },
    },
    Mutation: {
        createProduce: async (parent, args) => {
            const produce = await Produce.create(args);
            return produce;
        },
    },
};

module.exports = resolvers;
