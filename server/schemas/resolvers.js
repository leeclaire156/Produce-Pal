const { User, Product, Order } = require('../models');

const resolvers = {
    Query: {
        // READ ALL ...
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
                .populate('products')
                ;
        },
        products: async () => {
            return await Product.find({})
            // .populate('orders')
            // .populate('users')
            // ;
        },
        // READ BY ID
        user: async (parent, { _id }) => {
            return await User.findById(_id)
                .populate('products')
                .populate('orders')
                .populate({
                    path: 'orders',
                    populate: 'products'
                });;
        },
        order: async (parent, { _id }) => {
            return await Order.findById(_id)
                .populate('products')
                ;
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id);
        },
    },
    // MUTATION
    Mutation: {
        // CREATE USER
        addUser: async (parent, args) => {
            return await User.create(args);
        },

        // // TO DO! When tokens are ready, use below for adding a User
        // addUser: async (parent, args) => {
        //     const user = await User.create(args);
        //     const token = signToken(user);
        //     return { token, user };
        // },

        // CREATE PRODUCT
        addProduct: async (parent, { _id, productId, productName, productType, productPrice, productCategory, productInventory, productUnits, productAllergens, productAvailability, productDescription, productImage }) => {
            const product = await Product.create({ _id, productId, productName, productType, productPrice, productCategory, productInventory, productUnits, productAllergens, productAvailability, productDescription, productImage });
            return { product };
        },

        // CREATE ORDER
        // TO DO: Figure out why the new order is not being pushed to the args user
        addOrder: async (parent, args) => {
            const products = args.products;
            const order = await Order.create({ products });
            await User.findByIdAndUpdate(args.user._id, { $push: { orders: order } }, { new: true });
            return order;
        },
        // // TO DO! Once we have front end logging in and auth, use below
        // addOrder: async (parent, { products }, context) => {
        //     console.log(context);
        //     if (context.user) {
        //         const order = new Order({ products });
        //         await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
        //         return order;
        //     }
        //     throw new AuthenticationError('Not logged in');
        // },
    },
};

module.exports = resolvers;