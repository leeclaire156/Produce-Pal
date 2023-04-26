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
        },
        {
            productId: 521,
            productName: 'Grapes',
            productType: false,
            productPrice: 8.99,
            productCategory: 'Fruits',
            productInventory: 10,
            productUnits: 'lbs',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'Seedless Green Grapes 3lbs'
        },
        {
            productId: 522,
            productName: 'Honeycrisp Apple',
            productType: false,
            productPrice: 1.89,
            productCategory: 'Fruits',
            productInventory: 50,
            productUnits: 'ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'Organic Honeycrisp Apple'
        },
        {
            productId: 523,
            productName: 'Bananas',
            productType: false,
            productPrice: 1.69,
            productCategory: 'Fruits',
            productInventory: 24,
            productUnits: 'ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'One Bunch of Organic Bananas'
        },
        {
            productId: 524,
            productName: 'Honey',
            productType: false,
            productPrice: 16.79,
            productCategory: 'Sweetener',
            productInventory: 8,
            productUnits: 'ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: '16oz of Pure Raw Unfiltered Honey'
        },
        {
            productId: 525,
            productName: 'Sourdough Bread',
            productType: false,
            productPrice: 4.69,
            productCategory: 'Baked',
            productInventory: 34,
            productUnits: 'ea.',
            productAllergens: 'Gluten, Dairy, Eggs',
            productAvailability: true,
            productDescription: '24oz Loaf of Sourdough Bread'
        },
        {
            productId: 526,
            productName: 'Blueberry Jam',
            productType: false,
            productPrice: 5.79,
            productCategory: 'Fruits',
            productInventory: 17,
            productUnits: 'ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: '16oz Blueberry Preserves'
        },
        {
            productId: 527,
            productName: 'Eggs',
            productType: false,
            productPrice: 3.79,
            productCategory: 'Egg',
            productInventory: 35,
            productUnits: 'Ea.',
            productAllergens: 'Eggs',
            productAvailability: true,
            productDescription: 'One Dozen Large Cage-Free White Eggs'
        },
        {
            productId: 528,
            productName: 'Rosemary',
            productType: false,
            productPrice: 1.99,
            productCategory: 'Herb',
            productInventory: 10,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: '.5oz Fresh Organic Rosemary'
        },
        {
            productId: 529,
            productName: 'Goat Cheese',
            productType: false,
            productPrice: 5.99,
            productCategory: 'Dairy',
            productInventory: 32,
            productUnits: 'Ea.',
            productAllergens: 'Dairy',
            productAvailability: true,
            productDescription: '4oz Organic Plain Goat Cheese Log'
        },
        {
            productId: 530,
            productName: 'Maple Syrup',
            productType: false,
            productPrice: 9.69,
            productCategory: 'Sweetener',
            productInventory: 7,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: '12oz Dark Amber Grade A Organic Maple Syrup'
        },
        {
            productId: 532,
            productName: 'Pickles',
            productType: false,
            productPrice: 5.99,
            productCategory: 'Vegetable',
            productInventory: 34,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: '32oz Kosher Half Sour Extra Crunchy Pickles'
        },
        {
            productId: 533,
            productName: 'Sauerkraut',
            productType: false,
            productPrice: 4.51,
            productCategory: 'Vegetable',
            productInventory: 48,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'Old Fashioned Sauerkraut 24oz'
        },
        {
            productId: 534,
            productName: 'Sugar Snap Peas',
            productType: false,
            productPrice: 3.95,
            productCategory: 'Vegetable',
            productInventory: 22,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: '8oz Stringless Sugar Snap Peas'
        },
        {
            productId: 535,
            productName: 'Mushrooms',
            productType: false,
            productPrice: 5.38,
            productCategory: 'Vegetable',
            productInventory: 60,
            productUnits: 'lbs',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'One Pound of Sliced Baby Bella Mushrooms'
        },
        {
            productId: 536,
            productName: 'Onion',
            productType: false,
            productPrice: 2.69,
            productCategory: 'Vegetable',
            productInventory: 23,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: '2lb Bag of Vidalia Onions'
        },
        {
            productId: 537,
            productName: 'Tomato',
            productType: false,
            productPrice: 1.99,
            productCategory: 'Fruits',
            productInventory: 84,
            productUnits: 'lbs',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'One Pound of Fresh Roma Tomatoes'
        },
        {
            productId: 538,
            productName: 'Basil',
            productType: false,
            productPrice: 3.79,
            productCategory: 'Herb',
            productInventory: 18,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: '3oz of Fresh Organic Basil'
        },
        {
            productId: 539,
            productName: 'Beet',
            productType: false,
            productPrice: 2.28,
            productCategory: 'Vegetable',
            productInventory: 35,
            productUnits: 'lbs',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'One Pound of Fresh Red Beets'
        },
        {
            productId: 540,
            productName: 'Eggpolant',
            productType: false,
            productPrice: 2.29,
            productCategory: 'Vegetable',
            productInventory: 68,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'One Large Organic Eggplant'
        },
        {
            productId: 541,
            productName: 'Sweet Potato',
            productType: false,
            productPrice: 3.39,
            productCategory: 'Vegetable',
            productInventory: 27,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: '3lb Bag of Sweet Potatoes'
        },
        {
            productId: 542,
            productName: 'Spinach',
            productType: false,
            productPrice: 2.49,
            productCategory: 'Vegetable',
            productInventory: 34,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: '5oz of Organic Baby Spinach'
        },
        {
            productId: 543,
            productName: 'Bell Pepper',
            productType: false,
            productPrice: 1.49,
            productCategory: 'Vegetable',
            productInventory: 72,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'One Oragnic Green Bell Pepper'
        },
        {
            productId: 544,
            productName: 'Okra',
            productType: false,
            productPrice: 1.69,
            productCategory: 'Vegetable',
            productInventory: 18,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: '12oz of Cut Okra'
        },
        {
            productId: 545,
            productName: 'Swiss Chard',
            productType: false,
            productPrice: 4.29,
            productCategory: 'Vegetable',
            productInventory: 26,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'One Bunch of Rainbow Chard'
        },
        {
            productId: 546,
            productName: 'Kale',
            productType: false,
            productPrice: 5.99,
            productCategory: 'Vegetable',
            productInventory: 42,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: '12oz of Organic Chopped Kale'
        },
        {
            productId: 547,
            productName: 'Squash',
            productType: false,
            productPrice: 4.39,
            productCategory: 'Vegetable',
            productInventory: 55,
            productUnits: 'Ea.',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'One Organic Butternut Squash'
        },
        
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
        },
        {
            orderId: 0005,
            products: [ 
                products[5]._id
            ],
            orderType: 'Pending'
        },
        {
            orderId: 0023,
            products: [ 
                products[6]._id,
                products[6]._id,
                products[6]._id,
                products[7]._id,
                products[9]._id,
                products[10]._id,
                products[15]._id,
                products[15]._id,
                products[16]._id,
                products[17]._id,
                products[18]._id,
                products[18]._id,
                products[19]._id

            ],
            orderType: 'Pending'
        },
        {
            orderId: 0023,
            products: [ 
                products[7]._id,
                products[9]._id,
                products[10]._id,
                products[15]._id,
                products[15]._id,
                products[17]._id,
                products[18]._id,
                products[18]._id,
                products[19]._id

            ],
            orderType: 'Pending'
        },
        {
            orderId: 0024,
            products: [
                products[8]._id
            ],
            orderType: 'Paid'
        },
        {
            orderId: 0025,
            products: [
                products[11]._id,
                products[11]._id,
                products[11]._id,
                products[11]._id,
                products[13]._id,
                products[13]._id
            ],
            orderType: 'Paid'
        },
        {
            orderId: 0026,
            products: [
                products[12]._id,
                products[12]._id,
                products[12]._id,
                products[21]._id
            ],
            orderType: 'Paid'
        },
        {
            orderId: 0027,
            products: [
                products[27]._id,
                products[27]._id,
                products[27]._id,
                products[28]._id
            ],
            orderType: 'Paid'
        },
        {
            orderId: 0331,
            products: [
                products[25]._id,
                products[25]._id,
                products[26]._id,
                products[26]._id
            ],
            orderType: 'Paid'
        },
        {
            orderId: 0025,
            products: [
                products[22]._id,
                products[22]._id,
                products[22]._id,
                products[22]._id,
                products[24]._id,
                products[24]._id
            ],
            orderType: 'Paid'
        },
        {
            orderId: 0023,
            products: [ 
                products[20]._id,
                products[20]._id,
                products[20]._id,
                products[20]._id,
                products[23]._id,
                products[23]._id,
                products[23]._id,
                products[23]._id,
                products[23]._id

            ],
            orderType: 'Pending'
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
                orders[1]._id,
                orders[5]._id,
                orders[6]._id,
                orders[8]._id,
                orders[10]._id,
                orders[12]._id
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
                orders[0]._id,
                orders[3]._id,
                orders[4]._id,
                orders[6]._id,
                orders[9]._id,
                orders[11]._id
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
        {
            firstName: 'Quins Produce',
            lastName: 'Vendor',
            email: 'quinelson@mail.com',
            password: 'password1',
            biography: 'I like fishing and learning new things.',
            phone: '703-855-2126',
            sales: [
                orders[3]._id
            ],
            vendorStatus: true,
            vendorName: 'Quins Vinyard',
            vendorDescription: 'We aim to be your one stop shop for organic produce in the DMV.',
            products: [
                products[5]._id
            ],
            pickupLocation: 'Cherrydale Farmers Market',
            vendorTelephone: '703-555-1234',
        },
        {
            firstName: 'Ralph',
            lastName: 'Thompson',
            email: 'rthompson123@gmail.com',
            password: 'password1',
            biography: 'I am looking forward to meeting other farmers on ProducePal!',
            phone: '571-223-2222',
            sales: [
                orders[4]._id,
                orders[5]._id,
                orders[6]._id
            ],
            vendorStatus: true,
            vendorName: 'Sunny Acres Farms',
            vendorDescription: 'Sunny Acres Orchards has been in our family for 4 generations. We hope that through providing quality produce to our community, we can make the world a better place.',
            products: [
                //apple/banana/bread/jam/pickle/skraut/peas/shroom/onion
                products[6]._id,
                products[7]._id,
                products[9]._id,
                products[10]._id,
                products[15]._id,
                products[16]._id,
                products[17]._id,
                products[18]._id,
                products[19]._id
            ],
            pickupLocation: 'Mosaic Farmers Market',
            vendorTelephone: '202-675-9012',
        },
        {
            firstName: 'Miguel',
            lastName: 'Martinez',
            email: 'mmartinez24@gmail.com',
            password: 'password1',
            biography: 'I love to play baseball and try new foods.',
            phone: '202-322-4000',
            sales: [
                orders[12]._id
            ],
            vendorStatus: true,
            vendorName: 'Green Meadows Farms',
            vendorDescription: 'Here at Green Meadow Farms, we want to give back to our community by providing quality produce to local businesses.',
            products: [
                products[20]._id,
                products[23]._id
            ],
            pickupLocation: 'Mosaic Farmers Market',
            vendorTelephone: '202-675-9012',
        },
        {
            firstName: 'Adam',
            lastName: 'Anderson',
            email: 'aanderson46@gmail.com',
            password: 'password1',
            biography: 'I like to spend my freetime with my family and explore the outdoors',
            phone: '540-222-2232',
            sales: [
                orders[11]._id
            ],
            vendorStatus: true,
            vendorName: 'Cider Mill Fields',
            vendorDescription: 'Here at Cider Mill Fields, we have converted a civil war era industrial structure into a sustainable modern homestead, we hope to share our local produce with you!',
            products: [
                products[22]._id,
                products[24]._id
            ],
            pickupLocation: 'Mosaic Farmers Market',
            vendorTelephone: '202-675-9012',
        },
        {
            firstName: 'Aveesh',
            lastName: 'Patel',
            email: 'apatel@gmail.com',
            password: 'password1',
            biography: 'I love to restore classic cars and spend time with my partner.',
            phone: '202-444-4424',
            sales: [
                orders[10]._id
            ],
            vendorStatus: true,
            vendorName: 'Organic Oasis',
            vendorDescription: 'Here at Organic Oasis, we aim to provide the best quality produce to our neighbors.',
            products: [
                //bell peppers spinach
                products[25]._id,
                products[26]._id
            ],
            pickupLocation: 'Mosaic Farmers Market',
            vendorTelephone: '202-675-9012',
        },
        {
            firstName: 'Andrew',
            lastName: 'Williams',
            email: 'awilliams42223@gmail.com',
            password: 'password1',
            biography: 'I was born and raised in Vancouver and I am looing to share my love of the outdoors with my new commmunity here in the DMV',
            phone: '804-222-9002',
            sales: [
                orders[6]._id
            ],
            vendorStatus: true,
            vendorName: 'Honeybee Haven Co-Op',
            vendorDescription: 'We are a local Apiary that also sells a variety of other products. Reach out on social media to schedule a tour of our property and taste our local honey.',
            products: [
                //honey syrup
                products[8]._id,
                products[14]._id
            ],
            pickupLocation: 'Mosaic Farmers Market',
            vendorTelephone: '202-675-9012',
        },
        {
            firstName: 'Joe',
            lastName: 'Turner',
            email: 'jturner22@gmail.com',
            password: 'password1',
            biography: 'In my free time I like to ride my ATV and sip on mountain dew, and I also enjoy saltwater fishing',
            phone: '703-999-9779',
            sales: [
                orders[9]._id
            ],
            vendorStatus: true,
            vendorName: 'Applewood Orchard Homestead',
            vendorDescription: 'Here at Applewood Orchard Homestead our main goal is to achieve total sustainability. In addition to farming produce, we also stockpile canned foods and bulk NATO ammunition on our property.',
            products: [
                //swiss chard & okra
                products[27]._id,
                products[28]._id
            ],
            pickupLocation: 'Mosaic Farmers Market',
            vendorTelephone: '202-675-9012',
        },
        {
            firstName: 'River',
            lastName: 'Song',
            email: 'rsong420@gmail.com',
            password: 'password1',
            biography: 'For 8 months of the year my girlfriend of 12 years and I follow jam bands on tour and exclusively wear ethically sourced hempfiber based tie dye outerwear.',
            phone: '386-019-4824',
            sales: [
                orders[8]._id
            ],
            vendorStatus: true,
            vendorName: 'Herbaceous Hills Exotic Herb Garden',
            vendorDescription: 'Namaste. During a yoga retreat in the jungles of rural Ecuador, I determined that my purpose in life is to farm herbs to save mankind.',
            products: [
                //rosemary and basil
                products[12]._id,
                products[21]._id
            ],
            pickupLocation: 'Mosaic Farmers Market',
            vendorTelephone: '202-675-9012',
        },
        {
            firstName: 'Travis',
            lastName: 'Cooper',
            email: 'tcoop123@gmail.com',
            password: 'password1',
            biography: 'I spend most of my freetime volunteering with sheltered animals',
            phone: '202-999-0029',
            sales: [
                orders[7]._id
            ],
            vendorStatus: true,
            vendorName: 'Dairy Delight Creamery',
            vendorDescription: 'We aim to serve our community the best variety of local dairy products.',
            products: [
                //goat cheese and eggs
                products[11]._id,
                products[13]._id
            ],
            pickupLocation: 'Mosaic Farmers Market',
            vendorTelephone: '202-675-9012',
        }

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
