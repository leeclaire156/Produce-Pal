const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order } = require('../models');

const resolvers = {
    // QUERIES
    Query: {
        // READ ALL ...
        users: async () => {
            return await User.find({})
                .populate('products')
                .populate({
                    path: 'memberships',
                    populate: 'products'
                })
                .populate({
                    path: 'sales',
                    populate: 'products'
                })
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
            return await Product.find({})
        },
        // READ BY ID
        user: async (parent, { _id }) => {
            return await User.findById(_id)
                .populate('products')
                .populate({
                    path: 'memberships',
                    populate: 'products'
                })
                .populate({
                    path: 'sales',
                    populate: 'products'
                })
                .populate({
                    path: 'orders',
                    populate: 'products'
                });
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
    // MUTATIONS
    Mutation: {
        // CREATE 
        addUser: async (parent, args) => {
            return await User.create(args);
            // // TO DO! When tokens are ready, add tokens
        },
        // CREATE PRODUCT
        addProduct: async (parent, args) => {
            const user = args.user;
            const product = await Product.create(args);
            await User.findByIdAndUpdate(user, { $push: { products: product } }, { new: true });
            return product;
        },
        addOrder: async (parent, args) => {
            const products = args.products;
            const user = args.user;
            const seller = args.seller;
            const order = await Order.create({ products });
            // When buyer pays, then:
            // send the buyer's ID to orders array
            await User.findByIdAndUpdate(user, { $push: { orders: order } }, { new: true });
            // also send the seller's user ID to sales array
            await User.findByIdAndUpdate(seller, { $push: { sales: order } }, { new: true });
            // also send the seller's ID to the buyer's membership array
            await User.findByIdAndUpdate(user, { $push: { memberships: seller } }, { new: true });
            return order.populate('products');
        },
        // UPDATE 
        updateUser: async (parent, args) => {
            const user = args.user;
            return await User.findByIdAndUpdate(user, args, { new: true })
                .populate('products')
                .populate('sales')
                .populate({
                    path: 'sales.orders',
                    populate: 'products'
                })
                .populate('orders')
                .populate({
                    path: 'orders',
                    populate: 'products'
                });
        },
        updateOrder: async (parent, args) => {
            const order = args.order;
            return await Order.findByIdAndUpdate(order, args, { new: true })
                .populate('products');
        },
        updateProduct: async (parent, args) => {
            const product = args.product;
            return await Product.findByIdAndUpdate(product, args, { new: true })
        },
        updateProductInventory: async (parent, args) => {
            const product = args.product;
            const productInventory = args.productInventory;
            const decrement = Math.abs(productInventory) * -1;
            return await Product.findByIdAndUpdate(product, { $inc: { productInventory: decrement } }, { new: true });
        },
        // DELETE
        // deleteUser: async (parent, args) => {
        //     const user = args.user; 
        //     await User.findByIdAndDelete(user, args, { new: true } );
        //     console.log("User successfully deleted");
        // },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect username or password! Please try again.')
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect username or password! Please try again.');
            }

            const token = signToken(user);

            return { token, user };
        },
    }
};

module.exports = resolvers;