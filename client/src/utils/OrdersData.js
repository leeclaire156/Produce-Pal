const orders = [
    {
        _id: "1",
        orderId: "ORD1234",
        purchaseDate: 1650475200, // Unix timestamp need to be converted
        orderType: "pending",
        buyerName: {
            _id: 1,
            firstName: "John",
            lastName: "Doe",
            userImage: "https://placehold.co/600x600"
        },
        sellerName: {
            _id: 100,
            vendorName: "ABC Corp",
            vendorImage: "https://placehold.co/600x600",
            pickupAddress: {
                _id: 1000,
                city: "Anytown",
                street: "123 Main St",
                state: "CA",
                zipcode: "12345"
            },
            vendorTelephone: "555-123-4567",
            email: "abc_corp@example.com"
        },
        products: [
            {
                _id: "1",
                productId: "FRM1234",
                productName: "Organic Carrots",
                productDescription:
                    "These delicious carrots are grown on our family-owned farm without the use of pesticides.",
                productImage: "https://placehold.co/600x600",
                productPrice: 1.99,
                productType: "Vegetable",
                productUnits: "lb",
                productCategory: "Organic"
            },
            {
                _id: "2",
                productId: "FRM5678",
                productName: "Grass-fed Beef",
                productDescription:
                    "Our grass-fed beef is raised without hormones or antibiotics on our family-owned farm.",
                productImage: "https://placehold.co/600x600",
                productPrice: 10.99,
                productType: "Meat",
                productUnits: "lb",
                productCategory: "Grass-fed"
            }
        ]
    },

    {
        _id: "2",
        orderId: "ORD5678",
        purchaseDate: 1650388800,
        orderType: "paid",
        buyerName: {
            _id: 2,
            firstName: "Jane",
            lastName: "Smith",
            userImage: "https://placehold.co/600x600"
        },
        sellerName: {
            _id: 200,
            vendorName: "XYZ Inc",
            vendorImage: "https://placehold.co/600x600",
            pickupAddress: {
                _id: 2000,
                city: "Anytown",
                street: "456 Elm St",
                state: "CA",
                zipcode: "12345"
            },
            vendorTelephone: "555-987-6543",
            email: "xyz_inc@example.com"
        },
        products: [
            {
                _id: "3",
                productId: "FRM9101",
                productName: "Free-range Eggs",
                productDescription:
                    "Our free-range chickens produce the freshest, most delicious eggs around!",
                productImage: "https://placehold.co/600x600",
                productPrice: 3.99,
                productType: "Eggs",
                productUnits: "dozen",
                productCategory: "Free-range"
            },
            {
                _id: "4",
                productId: "FRM2345",
                productName: "Organic Apples",
                productDescription:
                    "Our family-owned farm produces the most delicious pesticide- free apples!",
                productImage: "https://placehold.co/600x600",
                productPrice: 2.99,
                productType: "Fruit",
                productUnits: "lb",
                productCategory: "Organic"
            }
        ]
    },

    {
        _id: "3",
        orderId: "ORD91011",
        purchaseDate: 1650302400,
        orderType: "ready",
        buyerName: {
            _id: 5,
            firstName: "Bob",
            lastName: "Johnson",
            userImage: "https://placehold.co/600x600"
        },
        sellerName: {
            _id: 300,
            vendorName: "123 Corp",
            vendorImage: "https://placehold.co/600x600",
            pickupAddress: {
                _id: 3000,
                city: "Anytown",
                street: "789 Oak St",
                state: "CA",
                zipcode: "12345"
            },
            vendorTelephone: "555-555-5555",
            email: "123_corp@example.com"
        },
        products: [
            {
                _id: "5",
                productId: "FRM6789",
                productName: "Raw Honey",
                productDescription:
                    "Our raw honey is harvested from our own beehives and is packed with nutrients!",
                productImage: "https://placehold.co/600x600",
                productPrice: 5.99,
                productType: "Honey",
                productUnits: "16 oz",
                productCategory: "Raw"
            },
            {
                _id: "6",
                productId: "FRM1011",
                productName: "Organic Chicken",
                productDescription:
                    "Our organic chickens are raised on a vegetarian diet without antibiotics or hormones.",
                productImage: "https://placehold.co/600x600",
                productPrice: 8.99,
                productType: "Meat",
                productUnits: "lb",
                productCategory: "Organic"
            },
            {
                _id: "7",
                productId: "FRM1213",
                productName: "Organic Spinach",
                productDescription:
                    "Our organic spinach is picked fresh from our family-owned farm and is packed with nutrients!",
                productImage: "https://placehold.co/600x600",
                productPrice: 4.99,
                productType: "Vegetable",
                productUnits: "lb",
                productCategory: "Organic"
            }
        ]
    },

    {
        _id: 4,
        orderId: "ORDER004",
        purchaseDate: 1646141800,
        orderType: "pending",
        buyerName: {
            _id: 3,
            firstName: "Bob",
            lastName: "Smith",
            userImage: "https://placehold.co/600x600",
        },
        sellerName: {
            _id: 2,
            vendorName: "Organic Farms",
            vendorImage: "https://placehold.co/600x600",
            pickupAddress: {
                _id: 2,
                city: "Los Angeles",
                street: "456 Oak St",
                state: "CA",
                zipcode: "90001",
            },
            vendorTelephone: "(555) 555-5555",
            email: "organicfarms@example.com",
        },
        products: [
            {
                _id: 7,
                productId: "PRODUCT007",
                productName: "Organic Strawberries",
                productDescription: "Sweet organic strawberries from our farm.",
                productImage: "https://placehold.co/600x600",
                productPrice: 4.99,
                productType: "fruit",
                productUnits: "1 lb",
                productCategory: "organic",
            },
            {
                _id: 8,
                productId: "PRODUCT008",
                productName: "Fresh Cheese",
                productDescription: "Delicious cheese made from our milk.",
                productImage: "https://placehold.co/600x600",
                productPrice: 6.99,
                productType: "dairy",
                productUnits: "8 oz",
                productCategory: "organic",
            },
        ],
    },

    {
        _id: 5,
        orderId: "ORDER005",
        purchaseDate: 1646314600,
        orderType: "paid",
        buyerName: {
            _id: 3,
            firstName: "Bob",
            lastName: "Smith",
            userImage: "https://placehold.co/600x600",
        },
        sellerName: {
            _id: 3,
            vendorName: "The Fresh Market",
            vendorImage: "https://placehold.co/600x600",
            pickupAddress: {
                _id: 3,
                city: "Chicago",
                street: "789 Maple St",
                state: "IL",
                zipcode: "60601",
            },
            vendorTelephone: "(555) 555-5555",
            email: "freshmarket@example.com",
        },
        products: [
            {
                _id: 9,
                productId: "PRODUCT009",
                productName: "Organic Blueberries",
                productDescription: "Juicy organic blueberries from our farm.",
                productImage: "https://placehold.co/600x600",
                productPrice: 3.99,
                productType: "fruit",
                productUnits: "1 lb",
                productCategory: "organic",
            },
            {
                _id: 10,
                productId: "PRODUCT010",
                productName: "Fresh Bread",
                productDescription: "Warm, fresh bread from our bakery.",
                productImage: "https://placehold.co/600x600",
                productPrice: 4.99,
                productType: "bakery",
                productUnits: "1 loaf",
                productCategory: "organic",
            },
        ],
    },

    {
        _id: 6,
        orderId: "ORDER006",
        purchaseDate: 1646986200,
        orderType: "ready",
        buyerName: {
            _id: 4,
            firstName: "Jane",
            lastName: "Doe",
            userImage: "https://placehold.co/600x600",
        },
        sellerName: {
            _id: 3,
            vendorName: "The Fresh Market",
            vendorImage: "https://placehold.co/600x600",
            pickupAddress: {
                _id: 3,
                city: "Chicago",
                street: "789 Maple St",
                state: "IL",
                zipcode: "60601",
            },
            vendorTelephone: "(555) 555-5555",
            email: "freshmarket@example.com",
        },
        products: [
            {
                _id: 11,
                productId: "PRODUCT011",
                productName: "Organic Avocados",
                productDescription: "Fresh organic avocados from our farm.",
                productImage: "https://placehold.co/600x600",
                productPrice: 1.99,
                productType: "fruit",
                productUnits: "1 lb",
                productCategory: "organic",
            },
            {
                _id: 12,
                productId: "PRODUCT012",
                productName: "Farm-Raised Chicken",
                productDescription: "Juicy farm-raised chicken from our farm.",
                productImage: "https://placehold.co/600x600",
                productPrice: 8.99,
                productType: "meat",
                productUnits: "1 lb",
                productCategory: "farm-raised",
            },
        ],
    },

];

export default orders;