const { User, Product, Order } = require('../models');

const resolvers = {
// QUERIES
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
// MUTATIONS
    Mutation: {
    // CREATE 
        addUser: async (parent, args) => {
            return await User.create(args);
        // // TO DO! When tokens are ready, use below for adding a User
        // addUser: async (parent, args) => {
        //     const user = await User.create(args);
        //     const token = signToken(user);
        //     return { token, user };
        // },
        },
        // CREATE PRODUCT
        // addProduct: async (parent, { _id, productId, productName, productType, productPrice, productCategory, productInventory, productUnits, productAllergens, productAvailability, productDescription, productImage }) => {
        //     const product = await Product.create({ _id, productId, productName, productType, productPrice, productCategory, productInventory, productUnits, productAllergens, productAvailability, productDescription, productImage });
        //     return product;
        // },
        addProduct: async (parent, args) => {
            const user = args.user;
            const product = await Product.create(args);
            await User.findByIdAndUpdate(user, { $push: { products: product } }, { new: true } );
            return product;
        },
        addOrder: async (parent, args) => {
            const products = args.products;
            const user = args.user;
            const order = await Order.create({ products });
            await User.findByIdAndUpdate(user, { $push: { orders: order } }, { new: true } );
            return order.populate('products');
        },
    // UPDATE 
        updateUser: async (parent, args) => {
            const user = args.user;
            return await User.findByIdAndUpdate(user, args, { new: true })
                .populate('products')
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
            return await Product.findByIdAndUpdate(product, { $inc: { productInventory: decrement } }, { new:true} );
        },
    }
};

    module.exports = resolvers;