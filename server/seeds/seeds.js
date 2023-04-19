const db = require('../config/connection');
const { User, Product, Order } = require('../models');

db.once('open', async () => {

    await Product.deleteMany();
    const products = await Product.insertMany([
        {
            productId: 12,
            productName: 'Carrots',
            productType: false,
            productPrice: 10.15,
            productCategory: 'Vegetable',
            productInventory: 10,
            productUnits: 'lbs',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'Colorful carrots.'
        },
        {
            productId: 1234,
            productName: 'Cabbage',
            productType: false,
            productPrice: 5.75,
            productCategory: 'Vegetable',
            productInventory: 5,
            productUnits: 'lbs',
            productAllergens: 'None',
            productAvailability: 'false',
            productDescription: 'Purple cabbage.'
        },
        {
            productId: 901,
            productName: 'Sharebox of Organic Eggs',
            productType: true,
            productPrice: 25.99,
            productCategory: 'Weekly',
            productInventory: 1,
            productUnits: 'each',
            productAllergens: 'Eggs',
            productAvailability: true,
            productDescription: 'Eggs are from different farms that are free range.'
        }
    ])

    console.log('products seeded');

    await User.deleteMany();
    await User.create({
        firstName: 'MaSandra the Farmer',
        lastName: 'Ewing',
        email: 'mewing123@gmail.com',
        password: 'password1',
        vendorStatus: true,
        vendorName: 'The CoOp',
        vendorDescription: 'We work with other farms to compile great products.',
        products: [
            products[0]._id, 
            products[0]._id, 
            products[1]._id, 
            products[2]._id
        ],
        pickupLocation: 'Mosaic Farmers Market',
        vendorTelephone: '2026759012',
        vendorAddress: '123 Main Street, Bethesda, MD, 22012'
    });

    await User.create({
        firstName: 'Claire the Buyer',
        lastName: 'Lee',
        email: 'claire456@gmail.com',
        password: 'password2',
        orders: [
            {
                products: [products[0]._id, products[0]._id, products[1]._id]
            }
        ],
        vendorStatus: "false"
    });                              

    console.log('users seeded');

    console.log('SEEDING done!');
    process.exit(0);
});
