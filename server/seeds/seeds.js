const db = require('../config/connection');
const { User, Product, Order, Address } = require('../models');

db.once('open', async () => {

    await Product.deleteMany();
    const products = await Product.insertMany([
        {
            productId: '12',
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
            productId: '1234',
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
            productId: '901',
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
            productId: '567',
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
            productId: '568',
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
            productId: '521',
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
            productId: '522',
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
            productId: '523',
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
            productId: '524',
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
            productId: '525',
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
            productId: '526',
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
            productId: '527',
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
            productId: '528',
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
            productId: '529',
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
            productId: '530',
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
            productId: '532',
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
            productId: '533',
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
            productId: '534',
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
            productId: '535',
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
            productId: '536',
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
            productId: '537',
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
            productId: '538',
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
            productId: '539',
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
            productId: '540',
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
            productId: '541',
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
            productId: '542',
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
            productId: '543',
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
            productId: '544',
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
            productId: '545',
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
            productId: '546',
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
            productId: '547',
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
        {
            productId: '548',
            productName: 'Sharebox of Apples',
            productType: true,
            productPrice: 11.99,
            productCategory: 'Weekly',
            productInventory: 1,
            productUnits: 'each',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'Sharebox of Organic Honey Crisp Apples'
        },
        {
            productId: '549',
            productName: 'Sharebox of Pears',
            productType: true,
            productPrice: 14.99,
            productCategory: 'Weekly',
            productInventory: 1,
            productUnits: 'each',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'Sharebox of Organic Pears'
        },
        {
            productId: '550',
            productName: 'Sharebox of Oranges',
            productType: true,
            productPrice: 12.99,
            productCategory: 'Weekly',
            productInventory: 1,
            productUnits: 'each',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'Sharebox of Organic Oranges'
        },
        {
            productId: '551',
            productName: 'Sharebox of Bananas',
            productType: true,
            productPrice: 16.99,
            productCategory: 'Weekly',
            productInventory: 1,
            productUnits: 'each',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'Sharebox of Organic Bananas'
        },
        {
            productId: '552',
            productName: 'Sharebox of Organic Blackberries',
            productType: true,
            productPrice: 19.99,
            productCategory: 'Weekly',
            productInventory: 1,
            productUnits: 'each',
            productAllergens: 'None',
            productAvailability: true,
            productDescription: 'Sharebox of Organic Blackberries.'
        },
        
    ])
    console.log('products seeded');

    await Order.deleteMany();
    const orders = await Order.insertMany([
        {
            orderId: '0001',
            products: [
                products[0]._id, 
                products[1]._id
            ],
            orderType: 'Pending'
        },
        {
            orderId: '0002',
            products: [
                products[1]._id,
                products[2]._id
            ],
            orderType: 'Paid'
        },
        {
            orderId: '383',
            products: [
                products[3]._id,
                products[4]._id
            ],
            orderType: 'Ready'
        },
        {
            orderId: '0005',
            products: [ 
                products[5]._id
            ],
            orderType: 'Pending'
        },
        {
            orderId: '0023',
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
            orderId: '0023',
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
            orderId: '0024',
            products: [
                products[8]._id
            ],
            orderType: 'Paid'
        },
        {
            orderId: '0025',
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
            orderId: '0026',
            products: [
                products[12]._id,
                products[12]._id,
                products[12]._id,
                products[21]._id
            ],
            orderType: 'Paid'
        },
        {
            orderId: '0027',
            products: [
                products[27]._id,
                products[27]._id,
                products[27]._id,
                products[28]._id
            ],
            orderType: 'Paid'
        },
        {
            orderId: '0331',
            products: [
                products[25]._id,
                products[25]._id,
                products[26]._id,
                products[26]._id
            ],
            orderType: 'Paid'
        },
        {
            orderId: '0025',
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
            orderId: '0023',
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
        },
        {
            orderId: '0023',
            products: [ 
                products[10]._id,
                products[10]._id,
                products[15]._id,
                products[15]._id
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
            userImage: 'https://www.freeimages.com/photo/tractor-pouring-grain-1931090',
            address: [],
            vendorAddress: [],
            sales: [
                orders[0]._id, 
                orders[1]._id
            ],
            vendorStatus: true,
            vendorName: 'The CoOp',
            vendorDescription: 'We have single produce items and we work with other farms to compile great products.',
            products: [
                products[0]._id, 
                products[1]._id, 
                products[2]._id
            ],
            vendorImage:'https://www.freeimages.com/photo/middle-eastern-market-1637274',
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
            userImage: 'https://www.freeimages.com/photo/men-with-red-peppers-2262753',
            sales: [
                orders[2]._id, 
            ],
            orders: [
                orders[1]._id,
                orders[5]._id,
                orders[7]._id,
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
            vendorImage:'https://www.freeimages.com/photo/baker-with-cupcakes-1882795',
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
            userImage: 'https://www.freeimages.com/photo/tractor-pouring-grain-1993884',
            orders: [
                orders[0]._id,
                orders[3]._id,
                orders[4]._id,
                orders[6]._id,
                orders[9]._id,
                orders[11]._id,
                orders[13]._id
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
            userImage: 'https://www.freeimages.com/photo/men-in-warehouse-with-plant-2263267',
            orders: [
                orders[2]._id
            ],
            vendorStatus: "false"
        },
        {
            firstName: 'Quin',
            lastName: 'Elson',
            email: 'quinelson@mail.com',
            password: 'password1',
            biography: 'I like fishing and learning new things.',
            phone: '703-855-2126',
            userImage: 'https://www.freeimages.com/photo/woman-working-on-tea-plantation-2386122',
            sales: [
                orders[3]._id
            ],
            vendorStatus: true,
            vendorName: 'Quins Vinyard',
            vendorDescription: 'We aim to be your one stop shop for organic produce in the DMV.',
            products: [
                products[5]._id
            ],
            vendorImage:'https://www.freeimages.com/photo/napa-valley-1624853',
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
            userImage: 'https://www.freeimages.com/photo/farmer-holding-a-chicken-2425461',
            sales: [
                orders[4]._id,
                orders[5]._id,
                orders[13]._id
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
            vendorImage:'https://www.freeimages.com/photo/cumbrian-farm-1207254',
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
            userImage: 'https://www.freeimages.com/photo/farmer-holding-wheelbarrow-2386648',
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
            vendorImage:'https://www.freeimages.com/photo/guadalajara-1619501',
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
            userImage: 'https://www.freeimages.com/photo/farmer-1429094',
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
            vendorImage:'https://www.freeimages.com/photo/woman-holding-out-an-apple-1754118',
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
            userImage: 'https://www.freeimages.com/photo/farmer-with-head-of-lettuce-2058883',
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
            vendorImage:'https://www.freeimages.com/photo/morning-call-1637322',
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
            userImage: 'https://www.freeimages.com/photo/farmer-massaging-pig-1748964',
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
            vendorImage:'https://www.freeimages.com/photo/honey-bee-garden-1236370',
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
            userImage: 'https://www.freeimages.com/photo/man-with-plants-2327365',
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
            vendorImage:'https://www.freeimages.com/photo/honestead-1226496',
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
            userImage: 'https://www.freeimages.com/photo/peasant-couple-drinking-beer-on-hay-bales-2098262',
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
            vendorImage:'https://www.freeimages.com/photo/vertical-plant-1330326',
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
            userImage: 'https://www.freeimages.com/photo/farmer-with-plants-1777837',
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
            vendorImage:'https://www.freeimages.com/photo/cows-with-bells-1332989',
            pickupLocation: 'Mosaic Farmers Market',
            vendorTelephone: '202-675-9012',
        }

    ], { ordered: true } );

    // // Add MaSandra to Jenny's membership array since she ordered from MaSandra
    // users[1].memberships.push(users[0]._id)
    // await users[1].save()
    // // Add MaSandra to Claire's membership array since she ordered from MaSandra
    // users[2].memberships.push(users[0]._id)
    // await users[2].save()
    // // Add Jenny to Zhihao's membership array since he ordered from Jenny
    // users[3].memberships.push(users[1]._id)
    // await users[3].save()

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
    //Order [3]
    orders[3].buyerName.push(users[2]._id)
    orders[3].sellerName.push(users[4]._id)
    await orders[3].save()
    //Order [4]
    orders[4].buyerName.push(users[2]._id)
    orders[4].sellerName.push(users[5]._id)
    await orders[4].save()
    //Order [5]
    orders[5].buyerName.push(users[1]._id)
    orders[5].sellerName.push(users[5]._id)
    await orders[5].save()
    //Order [6]
    orders[6].buyerName.push(users[2]._id)
    orders[6].sellerName.push(users[9]._id)
    await orders[6].save()
    //Order [7]
    orders[7].buyerName.push(users[1]._id)
    orders[7].sellerName.push(users[12]._id)
    await orders[7].save()
    //Order [8]
    orders[8].buyerName.push(users[1]._id)
    orders[8].sellerName.push(users[11]._id)
    await orders[8].save()
    //Order [9]
    orders[9].buyerName.push(users[2]._id)
    orders[9].sellerName.push(users[10]._id)
    await orders[9].save()
    //Order [10]
    orders[10].buyerName.push(users[1]._id)
    orders[10].sellerName.push(users[8]._id)
    await orders[10].save()
    //Order [11]
    orders[11].buyerName.push(users[2]._id)
    orders[11].sellerName.push(users[7]._id)
    await orders[11].save()
    //Order [12]
    orders[12].buyerName.push(users[1]._id)
    orders[12].sellerName.push(users[6]._id)
    await orders[12].save()
    //Order [13]
    orders[13].buyerName.push(users[2]._id)
    orders[13].sellerName.push(users[5]._id)
    await orders[13].save()





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
        },
        {
            street: '1924 Pennsylvania Ave NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20006',
        },
        {
            street: '2900 Clarendon Blvd',
            city: 'Arlington',
            state: 'Virgina',
            zipcode: '22201',
        },
        {
            street: '2021 14th St NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20009',
        },
        {
            street: '675 15th St NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20005',
        },
        {
            street: '480 7th St NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20004',
        },
        {
            street: '1822 1st St NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20001',
        },
        {
            street: '1601 14th St NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20009',
        },
        {
            street: '750 15th St NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20005',
        },
        {
            street: '601 Massachusetts Ave NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20001',
        },
        {
            street: '1201 24th St NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20037',
        },
        {
            street: '3050 K St NW Suite 101',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20007',
        },
        {
            street: '1063 Wisconsin Ave NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20007',
        },
        {
            street: '7006 Bethesda Ave',
            city: 'Bethesda',
            state: 'Maryland',
            zipcode: '20814',
        },
        {
            street: '3236 M St NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20007',
        },
        {
            street: '309 Middle St',
            city: 'Washington',
            state: 'Virginia',
            zipcode: '22747',
        },
        {
            street: '750 15th St NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20005',
        },
        {
            street: '633 D St NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20004',
        },
        {
            street: '6029 Leesburg Pike',
            city: 'Falls Church',
            state: 'Virginia',
            zipcode: '22014',
        },
        {
            street: '1234 H St NE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20002',
        },
        //next 5 addresses are markets (pickup addresses) [25,6,7,8,9]
        {
            street: '717 8th St SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        {
            street: '20th St NW',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20036',
        },
        {
            street: '301 Takoma Ave',
            city: 'Takoma Park',
            state: 'Maryland',
            zipcode: '20912',
        },
        {
            street: '233 N. Courthouse Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22201',
        },
        {
            street: '225 7th St SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        //next 12 are vendor addresses for hybrid accounts
        {
            street: '1310 Pennsylvania Ave SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        {
            street: '325 Pennsylvania Ave SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        {
            street: '729 8th St SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        {
            street: '417 A St SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        {
            street: '1001 E St SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        {
            street: '1363 E St SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        {
            street: '501 2nd St SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        {
            street: '800 C St SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        {
            street: '222 7th St SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        {
            street: '1111 4th St SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        {
            street: '1010 G St SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        {
            street: '1433 D St SE',
            city: 'Washington',
            state: 'District of Columbia',
            zipcode: '20003',
        },
        
    ])

    // Add addresses in chronological order of users
    users[0].address.push(addresses[0]._id)
    users[0].vendorAddress.push(addresses[1]._id)
    users[0].pickupAddress.push(addresses[25]._id)
    await users[0].save()

    users[1].address.push(addresses[2]._id)
    users[1].vendorAddress.push(addresses[3]._id)
    await users[1].save()

    users[2].address.push(addresses[4]._id)
    await users[2].save()

    users[3].address.push(addresses[5]._id)
    await users[3].save()

    users[4].address.push(addresses[6]._id)
    users[4].vendorAddress.push(addresses[30]._id)
    users[0].pickupAddress.push(addresses[25]._id)
    await users[4].save()

    users[5].address.push(addresses[7]._id)
    users[5].vendorAddress.push(addresses[31]._id)
    users[0].pickupAddress.push(addresses[25]._id)
    await users[5].save()
    
    users[6].address.push(addresses[8]._id)
    users[6].vendorAddress.push(addresses[32]._id)
    users[0].pickupAddress.push(addresses[26]._id)
    await users[6].save()
    
    users[7].address.push(addresses[9]._id)
    users[7].vendorAddress.push(addresses[33]._id)
    users[0].pickupAddress.push(addresses[26]._id)
    await users[7].save()
    
    users[8].address.push(addresses[10]._id)
    users[8].vendorAddress.push(addresses[34]._id)
    users[0].pickupAddress.push(addresses[27]._id)
    await users[8].save()
    
    users[9].address.push(addresses[11]._id)
    users[9].vendorAddress.push(addresses[35]._id)
    users[0].pickupAddress.push(addresses[27]._id)
    await users[9].save()
    
    users[10].address.push(addresses[12]._id)
    users[10].vendorAddress.push(addresses[36]._id)
    users[0].pickupAddress.push(addresses[28]._id)
    await users[10].save()
    
    users[11].address.push(addresses[12]._id)
    users[11].vendorAddress.push(addresses[37]._id)
    users[0].pickupAddress.push(addresses[28]._id)
    await users[11].save()
    
    users[12].address.push(addresses[13]._id)
    users[12].vendorAddress.push(addresses[38]._id)
    users[12].pickupAddress.push(addresses[29]._id)
    await users[12].save()


    console.log('addresses seeded');

    console.log('SEEDING done!');
    process.exit(0);
});
