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
        },
        {
            productId: 567,
            productName: 'Apple Pie',
            productType: false,
            productPrice: 5.99,
            productCategory: 'Baked',
            productInventory: 9,
            productUnits: 'each',
            productAllergens: 'Gluten',
            productAvailability: true,
            productDescription: 'My special blend of spices with a hint of rum.'
        },
        {
            productId: 568,
            productName: 'Sharebox of Baked Goods from Other Bakers',
            productType: true,
            productPrice: 39.99,
            productCategory: 'Monthly',
            productInventory: 4,
            productUnits: 'each',
            productAllergens: 'Gluten, Eggs, Nuts, Milk',
            productAvailability: true,
            productDescription: 'A month supply of apple pies from different bakers. Keep frozen and throw in the oven when ready to serve.'
        }
    ])
    console.log('products seeded');

    await Order.deleteMany();
    const orders = await Order.insertMany([
        {
            orderId: 0001,
            products: [
                products[0]._id, 
                products[0]._id, 
                products[1]._id
            ],
            orderType: 'Pending'
        },
        {
            orderId: 0002,
            products: [
                products[1]._id,
                products[2]._id
            ],
            orderType: 'Paid'
        },
        {
            orderId: 383,
            products: [
                products[3]._id,
                products[4]._id
            ],
            orderType: 'Ready'
        }
    ])
    console.log('orders seeded');

    await User.deleteMany();
    const users = await User.insertMany([
        {
            firstName: 'MaSandra the Farmer',
            lastName: 'Vendor',
            email: 'mewing123@gmail.com',
            password: 'password1',
            address: '89123 Glen Rd, Potomac, MD 20856',
            biography: 'I love long walks on the beach with my family.',
            phone: '386-019-4824',
            sales: [
                orders[0]._id, 
                orders[1]._id
            ],
            vendorStatus: true,
            vendorName: 'The CoOp',
            vendorDescription: 'We have single produce items and we work with other farms to compile great products.',
            products: [
                products[0]._id, 
                products[0]._id, 
                products[1]._id, 
                products[2]._id
            ],
            pickupLocation: 'Mosaic Farmers Market',
            vendorTelephone: '202-675-9012',
            vendorAddress: '123 Main Street, Bethesda, MD, 22012'
        },
        {
            firstName: 'Jenny The Seller and Buyer',
            lastName: 'Both',
            email: 'JennyBaker@gmail.com',
            password: '12345',
            address: '45678 Main Street, Fairfax, Virginia, 22030',
            biography: 'I enjoy sight seeing and traveling to tropical destinations.',
            phone: '234-109-5786',
            memberships: [
                users[0]._id,
            ],  
            sales: [
                orders[2]._id, 
            ],
            orders: [
                orders[1]._id
            ],
            vendorStatus: true,
            vendorName: 'Jenny Baked Goodies',
            vendorDescription: 'From apple pies to meat pies, if it can be baked, I have it!',
            products: [
                products[3]._id, 
                products[4]._id
            ],
            pickupLocation: 'Mosaic Farmers Market',
            vendorTelephone: '202-456-1908',
            vendorAddress: '9475 Maryland Drive, Bethesda, Maryland, 20844'
        },
        {
            firstName: 'Claire The Buyer',
            lastName: 'Buyer',
            email: 'claire456@gmail.com',
            password: 'password2',
            address: '28495 Florida Ave, Rockville, Maryland, 29867',
            biography: 'I love Farmers Markets and love that I can preorder my products before going to a Farmers Market',
            phone: '123-456-7890',
            memberships: [
                users[0]._id,
            ],  
            orders: [
                orders[0]._id
            ],
            vendorStatus: "false"
        },
        {
            firstName: 'Zhihao The Buyer #2',
            lastName: 'Buyer',
            email: 'zhihaobuying@gmail.com',
            password: 'password234',
            address: '67890 Texas St, Washington, DC, 20568',
            biography: 'I supoort my local CSAs!',
            phone: '321-654-6789',
            memberships: [
                users[1]._id,
            ],  
            orders: [
                orders[2]._id
            ],
            vendorStatus: "false"
        },
    ]);
    console.log('users seeded');

    console.log('SEEDING done!');
    process.exit(0);
});
