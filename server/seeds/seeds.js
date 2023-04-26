const db = require('../config/connection');
const { User, Product, Order, Address } = require('../models');

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
            firstName: 'MaSandra',
            lastName: 'Schembor',
            email: 'mewing123@gmail.com',
            password: 'password1',
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
        },
        {
            firstName: 'Jenny',
            lastName: 'Harrington',
            email: 'JennyBaker@gmail.com',
            password: '12345',
            biography: 'I enjoy sight seeing and traveling to tropical destinations.',
            phone: '234-109-5786',
            memberships: [
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
        },
        {
            firstName: 'Claire',
            lastName: 'James',
            email: 'claire456@gmail.com',
            password: 'password2',
            biography: 'I love Farmers Markets and love that I can preorder my products before going to a Farmers Market',
            phone: '123-456-7890',
            memberships: [
            ],  
            orders: [
                orders[0]._id
            ],
            vendorStatus: "false"
        },
        {
            firstName: 'Zhihao',
            lastName: 'Chang',
            email: 'zhihaobuying@gmail.com',
            password: 'password234',
            biography: 'I supoort my local CSAs!',
            phone: '321-654-6789',
            memberships: [
            ],  
            orders: [
                orders[2]._id
            ],
            vendorStatus: "false"
        },
    ], { ordered: true } );

    // Add MaSandra to Jenny's membership array since she ordered from MaSandra
    users[1].memberships.push(users[0]._id)
    await users[1].save()
    // Add MaSandra to Claire's membership array since she ordered from MaSandra
    users[2].memberships.push(users[0]._id)
    await users[2].save()
    // Add Jenny to Zhihao's membership array since he ordered from Jenny
    users[3].memberships.push(users[1]._id)
    await users[3].save()

    // PUSH buyer and seller names to respective orders
    // Order [0]
    orders[0].buyerName.push(users[2]._id)
    orders[0].sellerName.push(users[0]._id)
    await orders[0].save()
    //Order [1]
    orders[1].buyerName.push(users[1]._id)
    orders[1].sellerName.push(users[0]._id)
    await orders[1].save()
    //Order [2]
    orders[2].buyerName.push(users[3]._id)
    orders[2].sellerName.push(users[1]._id)
    await orders[2].save()

    console.log('users seeded');

    await Address.deleteMany();
    const addresses = await Address.insertMany([
        {
            street: '9945 Falls Rd',
            city: 'Potomac',
            state: 'MD',
            zipcode: '20854',
        },
        {
            street: '8270 Greensboro Dr Suite #120',
            city: 'McLean',
            state: 'Virginia',
            zipcode: '22102',
        },
        {
            street: '1381 Beverly Rd',
            city: 'McLean',
            state: 'Virginia',
            zipcode: '22101',
        },
        {
            street: '5601 River Rd',
            city: 'Bethesda',
            state: 'Maryland',
            zipcode: '20816',
        },
        {
            street: '5700 Bou Ave',
            city: 'Rockville',
            state: 'Maryland',
            zipcode: '20852',
        },
        {
            street: '3001 Connecticut Ave NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20008',
        }
    ])

    // Add addresses in order
    users[0].address.push(addresses[0]._id)
    users[0].vendorAddress.push(addresses[1]._id)
    await users[0].save()

    users[1].address.push(addresses[2]._id)
    users[1].vendorAddress.push(addresses[3]._id)
    await users[1].save()

    users[2].address.push(addresses[4]._id)
    await users[2].save()

    users[3].address.push(addresses[5]._id)
    await users[3].save()

    console.log('addresses seeded');

    console.log('SEEDING done!');
    process.exit(0);
});
