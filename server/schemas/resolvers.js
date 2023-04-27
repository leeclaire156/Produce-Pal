const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order, Address } = require('../models');
const { signToken } = require('../utils/auth');
// TO DO - Ask Jenny & Quin about stripe dependencies
const stripe = require('stripe');


const resolvers = {
    // QUERIES
    Query: {
        // UNCOMMENT LINES 10-15, COMMENT OUT 71, UNCOMMENT 73-75 and 135-151
        // By adding context to our query, we can retrieve the logged in user without specifically searching for them
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
                .populate('products')
                // IT DOESN"T LIKE MEMBERSHIPS!
                // .populate({
                //     path: 'memberships',
                //     populate: ['sellerName']
                // })
                .populate({
                    path: 'sales',
                    populate: ['products', 'buyerName', 'sellerName']
                })
                .populate({
                    path: 'orders',
                    populate: ['products', 'buyerName', 'sellerName']
                })
                .populate('address')
                .populate('vendorAddress')
                .populate('pickupAddress')
                ;
            }
            throw new AuthenticationError('Please log in.');
        },
        // myprofile: async (parent, args, context) => {
        //     if(context.user) {
        //         return User.findOne({ _id: context.user._id })
        //         .populate('address')
        //         .populate('vendorAddress')
        //         .populate('pickupAddress')
        //         ;
        //     }
        //     throw new AuthenticationError('Please log in.');
        // },        
        // READ ALL 
        addresses: async () => {
            return await Address.find({})
            // .populate('street')
            // .populate('city')
            // .populate('state')
            // .populate('zipcode')
        },
        users: async () => {
            return await User.find({})
                .populate('products')
                .populate('memberships')
                // .populate({
                //     path: 'memberships',
                //     populate: ['products', 'vendorAddress']
                // })
                .populate({
                    path: 'sales',
                    populate: ['products', 'buyerName', 'sellerName']
                })
                .populate({
                    path: 'orders',
                    populate: ['products', 'buyerName', 'sellerName']
                })
                .populate('address')
                .populate('vendorAddress')
                .populate('pickupAddress')
                ;
        },
        farms: async (parent, vendorStatus) => {
            const params = {};

            if (vendorStatus) {
                params.vendorStatus = true;
            }

            return await User.find(params)
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
            })
            .populate('address')
            .populate('vendorAddress')
            .populate('pickupAddress')
            ;
        },
        orders: async () => {
            return await Order.find({})
                .populate('products')
                .populate({
                    path: 'buyerName',
                    populate: 'products'
                })
                .populate({
                    path: 'sellerName',
                    populate: 'products'
                });
        },
        products: async () => {
            return await Product.find({})
        },
        // READ BY ID
        // // WILL REPLACE with authentication when DEPLOYING
        // user: async (parent, args, context) => {
        //     if (context.user) {
        //         const user = await User.findById(context.user_id)
        //         .populate('products')
        //         .populate({
        //             path: 'memberships',
        //             populate: 'products'
        //         })
        //         .populate({
        //             path: 'sales',
        //             populate: 'products'
        //         })
        //         .populate({
        //             path: 'orders',
        //             populate: 'products'
        //         });
        //         user.orders.sort((a, b) => b.purchaseDate - a. purchaseDate);
        //         return user;
        //     }

        //     throw new AuthenticationError('Please log in!')
        // },
        profile: async (parent, { profileId }) => {
                return User.findOne({ _id: profileId})
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
                })
                .populate('address')
                .populate('vendorAddress')
                .populate('pickupAddress')
                // .populate({
                //     path: 'address',
                //     populate: 'addresses'
                // })
                // .populate({
                //     path: 'pickupAddress',
                //     populate: 'addresses'
                // })
                // .populate({
                //     path: 'vendorAddress',
                //     populate: 'addresses'
                // })
                ;
        },
        // user: async (parent, { _id }) => {
        //     return await User.findById(_id)
        //         .populate('products')
        //         .populate({
        //             path: 'memberships',
        //             populate: 'products'
        //         })
        //         .populate({
        //             path: 'sales',
        //             populate: 'products'
        //         })
        //         .populate({
        //             path: 'orders',
        //             populate: 'products'
        //         })
        //         .populate('address')
        //         .populate('vendorAddress');
        // },
        
        // // When front end is ready for testing, 
        // // FIRST TEST IF WE DO NEED THIS AUTH since we have the User Auth
        // // MAY REPLACE with authentication when DEPLOYING
        // order: async (parent, { _id }, context) => {
        //     if (context.user) {
        //         const user = await User.findById(context.user._id)
        //         .populate('products');

        //         return user.orders.id(_id);
        //     }

        //     throw new AuthenticationError('Not logged in');
        // },
        order: async (parent, { _id }) => {
            return await Order.findById(_id)
                .populate('products')
                .populate({
                    path: 'buyerName',
                    populate: 'products'
                })
                .populate({
                    path: 'sellerName',
                    populate: 'products'
                });
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id);
        },
        checkout: async (parent, args, context) => {
            const order = new Order({ products: args.products });
            // // TURN ON FOR TESTING WHEN READY IN FRONT END                
            // const line_items = [];

            const { products } = await order.populate('products');
            // TURN ON FOR TESTING WHEN READY IN FRONT END 
            /*               
            for (let i =0; i < products.length; i++) {
                const product = await stripe.products.create({
                    productName: products[i].productName,
                    productDescription: products[i].productDescription,
                    productImage: products[i].productImage
                });

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });
                
                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });
            
            return { session: session.id };
            */

            // DELETE below return for when you deploy; need this for graphql only
            return order.populate('products');
        }
    },
    // MUTATIONS
    Mutation: {
        // CREATE 
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        // create address
        addAddress: async (parent, args) => {
            const email = args.email;
            const address = await Address.create(args);
            await User.findOneAndUpdate({ email }, { $push: { address: address } }, { new: true })
            return address
        },
        // create vendor address
        addVendorAddress: async (parent, args) => {
            const email = args.email;
            const address = await Address.create(args);
            await User.findOneAndUpdate({ email }, { $push: { vendorAddress: address } }, { new: true })
            return address
        },
        // create pick up address
        addPickupAddress: async (parent, args) => {
            const email = args.email;
            const address = await Address.create(args);
            await User.findOneAndUpdate({ email }, { $push: { pickupAddress: address } }, { new: true })
            return address
        },
        // CREATE PRODUCT
        // addProduct using context (the signed in user) - when adding a new product to my farm storefront is ready, uncomment below and comment out addProduct without context
        // addProduct: async (parent, context) => {
        //     if(context.user){
        //         const product = await Product.create(args);
        //         await User.findByIdAndUpdate(context.user._id, { $push: { products: product } }, { new: true } );
        //     throw new AuthenticationError('Not logged in');
        //     }
        // },
        addProduct: async (parent, args) => {
            const user = args.user;
            const product = await Product.create(args);
            await User.findByIdAndUpdate(user, { $push: { products: product } }, { new: true });
            return product;
        },
        // addOrder using context (the signed in user) - when checking out works, uncomment below and comment out addOrder code without context
        // addOrder: async (parent, { products }, context, seller) => {
        //     const seller = args.seller;

        //     console.log(context);
        //     console.log(seller);

        //     if(context.user) {
        //         const order = await Order.create({ products });
        //         // When buyer pays, then:
        //         // send the buyer's ID to orders array
        //         await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } }, { new: true });
        //         // also send the seller's user ID to sales array & the sellerName array
        //         await User.findByIdAndUpdate(seller, { $push: { sales: order } }, { new: true });
        //         await User.findByIdAndUpdate(seller, { $push: { sellerName: seller } }, { new: true });
        //         // also send the buyer's ID to the buyer's membership array & the buyerName array
        //         await User.findByIdAndUpdate(context.user._id, { $push: { memberships: seller } }, { new: true });
        //         await User.findByIdAndUpdate(context.user._id, { $push: { buyerName: context.user._id } }, { new: true });
        //         return order.populate('products');
        //     }
        //     throw new AuthenticationError('Not logged in');
        // },
        // For Apollo back end testing
        addOrder: async (parent, args) => {
            const products = args.products;
            const user = args.user;
            const seller = args.seller;
            const order = await Order.create({ products, user, seller });
            // When buyer pays, then:
            // Buyer's Orders: send the buyer's ID to orders array
            await User.findByIdAndUpdate(user, { $push: { orders: order } }, { new: true });
            // Seller's Sales: send the seller's user ID to sales array & the sellerName array
            await User.findByIdAndUpdate(seller, { $push: { sales: order } }, { new: true });
            await User.findByIdAndUpdate(seller, { $push: { sellerName: seller } }, { new: true });
            // Buyer's Memberships: send the buyer's ID to the buyer's membership array & the buyerName array
            await User.findByIdAndUpdate(user, { $push: { memberships: seller } }, { new: true });
            // Order's Buyer & Seller Info: send the buyer and seller to the order respectively
            await Order.findByIdAndUpdate(order, { $push: { buyerName: user } }, { new: true });
            await Order.findByIdAndUpdate(order, { $push: { sellerName: seller } }, { new: true });
            return order.populate('products');
        },
        // UPDATE 
        // updateUser using context (the signed in user) - when updating user info form is ready, uncomment below and comment out updateUser without context
        // updateUser: async (parent, args, context) => {
        //     if(context.user) {
        //         return await User.findByIdAndUpdate(context.user._id, args, { new: true })
        //         .populate('products')
        //         .populate('sales')
        //         .populate({
        //             path: 'sales.orders',
        //             populate: 'products'
        //         })
        //         .populate('orders')
        //         .populate({
        //             path: 'orders',
        //             populate: 'products'
        //         });
        //     }
        //     throw new AuthenticationError('Not logged in');
        // },
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
        // We may not need context for updateAddress because the function is looking for the address ObjectID 
        updateAddress: async (parent, args) => {
            const address = args.address;
            return await Address.findByIdAndUpdate(address, args, { new: true })
        },
        // We may not need context for updateVendorAddress because the function is looking for the vendorAddress ObjectID 
        updateVendorAddress: async (parent, args) => {
            const vendorAddress = args.vendorAddress;
            return await Address.findByIdAndUpdate(vendorAddress, args, { new: true })
        },
        // We may not need context for updatePickupAddress because the function is looking for the pickupAddress ObjectID
        updatePickupAddress: async (parent, args) => {
            const pickupAddress = args.pickupAddress;
            return await Address.findByIdAndUpdate(pickupAddress, args, { new: true })
        },
        // We may not need context for updateOrder because the edit button for an order will only be available on the array rendering sales
        // note that the order ObjectID is also being pushed to the orders array in the buyer user
        updateOrder: async (parent, args) => {
            const order = args.order;
            return await Order.findByIdAndUpdate(order, args, { new: true })
                .populate('products');
        },
        // We may not need an updateProduct with context param since the edit button for said product will only show up in the farmer's dashboard
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
        // SOFT DELETE functionality approved!
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